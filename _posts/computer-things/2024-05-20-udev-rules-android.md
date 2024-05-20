---
layout: post
title:  "How to install udev rules in Ubuntu?"
categories: computer-things
---

This is my guide on how to configure `udev rules` in linux.

## What are udev rules?

I'm not the best to explain how linux works but there is an [article](https://opensource.com/article/18/11/udev)
which explains it better than me. Let's short up that udev rules are needed in order to your computer recognice and
manage the connected devices to it.

By default, if your connect one phone, take as an example, my Pixel 6a, it is recognized by Ubuntu:

![lsusb](/assets/computer-things/2024-05-20-udev-rules-android/lsusb.png)

but if you want to use `adb` for example:

![missing udev rules](/assets/computer-things/2024-05-20-udev-rules-android/missing_udev_rules.png)

So now that we see the problem, let's tell Ubuntu (in this case) that there is my Pixel 6a.

## Writing the correct udev rule

I've always end reaching a [Stack Overflow
post](https://stackoverflow.com/questions/43771918/how-do-i-set-up-udev-rules-for-debugging-a-physical-android-device-with-android)
where there is an small and intuitive guide for doing it. This post is to have it by hand but also to deeply
understand the process.

1. Get the vendor and product ID. That's no so complicated. In the screenshot above, I've alreday run `lsusb`
   command which give us the information weŕe looking for in the line:

    ``` bash
    Bus 003 Device 008: ID 18d1:4ee7 Google Inc. Nexus/Pixel Device (charging + debug)
    ```

1. Our udev rule is the following:

    ``` bash
    # Pixel adb
    SUBSYSTEM=="usb", ATTR{idVendor}=="18d1", ATTR{idProduct}=="4ee7", MODE="0600", OWNER="yourusername"
    # Pixel fastboot
    SUBSYSTEM=="usb", ATTR{idVendor}=="18d1", ATTR{idProduct}=="4ee0", MODE="0600", OWNER="yourusername"
    ```

    here you have:

    * 18d1: which is the first part in the previous line, meaning Google.
    * 4ee7: which is the id of the product but I think this is the same for most of the latests Pixels.
    * "yourusername" here you will need to replace with ... guess it ... your username between brackets.

1. Now that we have the udev rule we need to append it in the file `/etc/udev/rules.d/51-android.rules`. If not
   created before, this will be a new file.

   > Open it as root

1. Last but not least, we need to reload that rules. To do it, as easy as run:

    ``` bash
    sudo udevadm control --reload-rules
    ```

1. After that, disconnect and connect the device again to the pc and the magic has occurred.

    ![adb works now](/assets/computer-things/2024-05-20-udev-rules-android/adb_working.png)

With that in place, you're ready to do whatever you need. Happy flashing!
