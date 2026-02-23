---
layout: post
title: "How to Limit Battery Charging on a Dell XPS 9300 with Fedora Linux"
categories: computer-things
---

If you use your Dell XPS 9300 plugged into an external monitor or dock most of the day, keeping the battery constantly charged at 100% will degrade its lifespan over time. The standard Linux advice is to write a limit to `/sys/class/power_supply/BAT0/charge_control_end_threshold`.

However, if you're on Fedora with a Dell XPS, you might notice the hardware completely ignores this kernel-level setting. Here is how to actually fix it by talking directly to the Dell BIOS.

## The Problem

Dell laptops handle power management through their proprietary SMBIOS extensions rather than standard ACPI battery thresholds. Even if the system files report an 80% limit, the firmware will keep charging the battery to 100%.

## The Solution: `smbios-battery-ctl`

To set a real hardware-level charge limit, we need to use Dell's native SMBIOS utilities. They are available in the official Fedora repositories.

### 1. Install the Required Tools

You will need the base library and the Python utilities that provide the command-line interface. Open your terminal and run:

```bash
sudo dnf install libsmbios smbios-utils-python
```

### 2. Set the Custom Charge Interval

Dell uses "charging modes". To stop the battery from charging to 100%, we need to switch the mode to `custom` and define a charging interval.

For a desk-bound setup, starting the charge at 75% and stopping at 80% is ideal. Run the following:

```bash
sudo smbios-battery-ctl --set-charging-mode custom
sudo smbios-battery-ctl --set-custom-charge-interval 75 80
```

Because this command writes directly to the BIOS NVRAM, **this setting is fully persistent**. It will survive reboots, OS updates, and even works while the laptop is powered off.

You can verify your current configuration at any time with:

```bash
sudo smbios-battery-ctl --get-charging-cfg
```

## Bonus: Quick Bash Aliases

Manually typing these commands every time you need to travel and want a full battery is tedious. Add these aliases to your `~/.bashrc` (or `~/.zshrc`) to easily toggle between "Desk" and "Travel" modes:

```bash
# Dell XPS Battery Management
alias bat-desk='sudo smbios-battery-ctl --set-charging-mode custom && sudo smbios-battery-ctl --set-custom-charge-interval 75 80 && echo "🔋 Desk mode: 80% limit active"'
alias bat-travel='sudo smbios-battery-ctl --set-charging-mode standard && echo "⚡ Travel mode: 100% standard charge active"'
alias bat-status='sudo smbios-battery-ctl --get-charging-cfg'
```

Now, just run `bat-desk` to preserve your battery health while docked, and run `bat-travel` the night before a trip so you wake up to a 100% charge.
