---
layout: post
title: "Surface Go Sleep Trouble: Type Cover Not Waking Up"
categories: computer-things
---

If you are using a **Surface Go (1st Gen)** in 2026, you've probably noticed that Linux runs beautifully on it, except for one annoying bug: the Type Cover (keyboard and touchpad) often stays dead after the tablet wakes up from sleep.

Instead of unplugging and replugging the keyboard every time, here is the definitive fix using a systemd resume hook.

## Step 1: Understanding the issue

The problem is that the `intel_lpss_pci` bus, which manages the connection to the Type Cover, doesn't always "wake up" correctly. This leaves the input drivers in a frozen state. To fix this, we need to force the kernel to reload the modules automatically upon resume.

## Step 2: Create the Fix Script

We will create a script that triggers every time the system resumes from suspension. Run the following command in your terminal:

```bash
sudo nano /usr/lib/systemd/system-sleep/surface-touchpad-fix
```

## Step 3: Add the Automation Code

Paste the code below into the editor. This script identifies the "post-sleep" state and power-cycles the specific drivers for the Surface Go:

```bash
#!/bin/sh
# Fix for Surface Go Type Cover after suspend
# Target: Surface Go 1st Gen - Feb 2026 Update

case $1/$2 in
  post/*)
    # 1. Unload the modules to reset the connection
    modprobe -r surface_hid
    modprobe -r hid_multitouch
    modprobe -r intel_lpss_pci
    
    # 2. Brief pause for the hardware bus to settle
    sleep 1
    
    # 3. Reload the modules in the correct sequence
    modprobe intel_lpss_pci
    modprobe hid_multitouch
    modprobe surface_hid
    ;;
esac
```

## Step 4: Set Execution Permissions

For the system to be able to run this script, it needs execution rights. Execute this command:

```bash
sudo chmod +x /usr/lib/systemd/system-sleep/surface-touchpad-fix
```

## Step 5: Verification

Close your Surface Go lid, wait a few seconds, and open it again. Your Type Cover and touchpad should now be active immediately without any physical intervention.

> **Note:** This fix is specifically tested on Fedora with the linux-surface kernel, but it should work on any major distribution running on original Surface Go hardware.
