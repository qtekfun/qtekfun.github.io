---
layout: post
title:  "How to include a new disk in an existing Ubuntu Server?"
categories: computer-things
---

I'm playing around with proxmox and after cloning one template I'm always including a new disk to manage all data. To do that, this is the process:

## Create the directory to mount

That's pretty easy with:

``` bash
mkdir /home/user/disk
```

## Identify the disk

Let's identify the disk:

``` bash
sudo fdisk -l
```

In my case:

``` bash
Disk /dev/sda: 1.46 TiB, 1610612736000 bytes, 3145728000 sectors
Disk model: QEMU HARDDISK
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
```

Note that we want the identifier `/dev/sda`

## Create partition table

As no partitions are listed, we need to create a partition table. To do that:

``` bash
sudo fdisk /dev/sda
```

It says that the disk has no partition table:

``` bash
Welcome to fdisk (util-linux 2.37.2).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

Device does not contain a recognized partition table.
Created a new DOS disklabel with disk identifier 0x4816b5aa.
```

Now we use `g` to create a GPT partition

``` bash
Command (m for help): g
Created a new GPT disklabel (GUID: 31AD9BF2-3239-FE4D-BF91-C85B5C7A80AA).
```

At this point we're going to create a new partition selecting `n` and then selecting the default for:
* partition number
* first sector
* last sector (if we want to use full space)

``` bash
Command (m for help): n
Partition number (1-128, default 1): 1
First sector (2048-3145727966, default 2048):
Last sector, +/-sectors or +/-size{K,M,G,T,P} (2048-3145727966, default 3145727966):

Created a new partition 1 of type 'Linux filesystem' and of size 1.5 TiB.
```

Last but not least, use `w`to write the paritions table to the disk

``` bash
Command (m for help): w
The partition table has been altered.
Calling ioctl() to re-read partition table.
Syncing disks.
```

## Create the FS

That's easy also with the command

``` bash
sudo mkfs.ext4 /dev/sda1
```

## Let's mount it

``` bash
sudo mount /dev/sda1 /home/user/disk
```

## Automount on startup

Just append the following line to your `/etc/fstab`

``` bash
/dev/sda1 /home/note/media ext4 defaults 0 1
```
