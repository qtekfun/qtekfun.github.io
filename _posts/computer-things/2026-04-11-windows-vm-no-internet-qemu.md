---
layout: post
title: "Why Your Windows VM Has No Internet (And How to Fix It)"
date: 2026-04-11
categories: [homelab, linux]
tags: [qemu, kvm, libvirt, fedora, networking, firewalld, nftables]
---

You have a Windows 11 virtual machine running on Linux with QEMU/KVM. Windows boots up, it has an IP address, the network adapter shows as connected — but there is no internet. The browser does not load, ping does not respond. Nothing.

What is going on?

---

## First, a bit of context: how networking works in a VM

When you create a virtual machine, it does not have direct access to your physical network card. Instead, Linux creates a private virtual network — a mini-internet internal to the host — and then acts as a middleman so that private network can talk to the outside world.

This middleman is called **NAT** (Network Address Translation), and it works exactly like your home router: it translates the private IPs from inside into your real public IP going out, and back again on the way in.

In QEMU/KVM, this virtual network is called `default` and uses the `192.168.122.x` range. The virtual router acting as middleman is an interface called `virbr0`.

The journey of a network packet from the VM to the internet looks like this:

``` shell
Windows VM (192.168.122.5)
       ↓
   virbr0  ← Linux virtual bridge
       ↓
  FORWARD  ← kernel decides whether to allow the packet through
       ↓
  MASQUERADE ← replaces the private IP with the real host IP
       ↓
  wlp0s20f3 ← your actual WiFi card
       ↓
    Internet
```

The reply takes the exact reverse path. If any single step fails, the VM loses internet.

---

## What was broken and why

In this case there were **two simultaneous problems**, most likely caused by a Fedora update that desynchronised `firewalld` (the firewall manager) and `libvirt` (the VM manager).

### Problem 1: traffic could not cross the firewall

Linux has a firewall that decides which packets it will forward between network interfaces. This firewall had a rule allowing traffic from the VM out to the internet, but it was in the wrong position — it arrived too late, after other rules (Docker's) had already processed the packet.

More critically, the most important rule was missing entirely: the one that allows **replies to come back**. The packet left towards 8.8.8.8, Google replied, but that reply arrived at the Linux host and vanished. The firewall did not know it had to return it to the VM.

### Problem 2: the `libvirt` firewalld zone was misconfigured

`firewalld` organises rules into "zones". The `libvirt` zone — responsible for managing VM traffic — had its rule chains completely empty. Libvirt had not inserted its rules correctly on startup.

---

## How it was diagnosed

The diagnosis followed the packet step by step using `tcpdump`, a tool that lets you listen to traffic on any network interface:

1. **Does the VM have an IP?** Yes — DHCP worked, it had `192.168.122.5`.
2. **Can the VM talk to its gateway?** Yes — ARP and ping to `192.168.122.1` worked fine.
3. **Does the packet reach `virbr0`?** Yes — it was visible entering the bridge.
4. **Does the packet leave through WiFi?** Yes — after adding the correct rules, it was visible leaving with the host's real IP.
5. **Does the reply come back to the VM?** No — the packet arrived from the internet but never made it back to `virbr0`.

That last point was the key. The `conntrack` tool confirmed that Linux knew the reply from 8.8.8.8 should go to `192.168.122.5`, but the firewall was dropping it before it got there.

---

## How it was fixed

The fix was two firewall rules:

**Rule 1:** Allow traffic from the VM to go out to the internet.

``` shell
sudo iptables -I FORWARD 2 -i virbr0 -o wlp0s20f3 -j ACCEPT
```

**Rule 2:** Allow replies from the internet to come back to the VM.

``` shell
sudo iptables -I FORWARD 1 -i wlp0s20f3 -o virbr0 -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
```

The second rule uses `conntrack` (connection tracking) — the system that keeps a record of open connections — to identify that an incoming packet is a reply to something the VM requested, and let it through.

---

## Why did it work before and stop working?

Libvirt generates these rules automatically on startup. But on Fedora, `firewalld` and `libvirt` need to coordinate so that rules are inserted in the right order. A system update desynced that coordination, libvirt's rules ended up empty or misplaced, and the result was a VM with correctly configured networking but no internet access.

It is one of those frustrating failures where everything *looks* right but there is a broken link somewhere in the middle of the chain.

---

## Preventing it from happening again

If this comes back after future updates, the first place to check is:

```bash
sudo firewall-cmd --list-all --zone=libvirt
```

The `filter_FWD_libvirt_allow` chains must contain rules. If they are empty, restart libvirtd and recreate the virtual network:

```bash
sudo systemctl restart libvirtd
sudo virsh net-destroy default
sudo virsh net-start default
```

If that still does not help, the two iptables rules above are your immediate workaround.
