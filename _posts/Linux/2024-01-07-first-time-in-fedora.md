---
layout: post
title:  "First time in Fedora"
categories: Linux
---

I've just started using Fedora. I was always an Ubuntu user (or variations like Lubuntu or Kubuntu). So Iǘe recently discovered lots of things that could help you if you're starting running Fedora or one of its spins.

## Improve `dnf`

One of the first things you need to do is to configure Fedora dnf package manager. To do that just open `sudo vim /etc/dnf/dnf.conf` and then append:

``` bash
# Added by me
fastestmirror=True
max_parallel_downloads=10
defaultyes=True
keepcache=True

```

Just after that, rebuild dnf cache with:

``` bash
sudo dnf clean all
sudo dnf update
```

## Enable RPM fussion

Then you need to enable [RPM Fussion](https://rpmfusion.org/). To do that just execute:

``` bash
sudo dnf install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
sudo dnf config-manager --enable fedora-cisco-openh264
sudo dnf groupupdate core
sudo dnf install appstream-data
sudo dnf install akmod-nvidia xorg-x11-drv-nvidia-cuda
```

## Install missing codecs

Another interesting thing is to enable the missing media codecs:

``` bash
sudo dnf groupupdate multimedia --setop="install_weak_deps=False" --exclude=PackageKit-gstreamer-plugin
sudo dnf groupupdate sound-and-video

```

## Install vscode

And then install the best code editor: VS Code. Again, just run:

``` bash
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo sh -c 'echo -e "[code]\nname=Visual Studio Code\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\nenabled=1\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/yum.repos.d/vscode.repo'
dnf check-update
sudo dnf install code

```

## Change machine name

Fedora always name the laptop **fedora** after installing it. To rename ir, just run:

``` bash
sudo hostnamectl set-hostname <computer name>
```