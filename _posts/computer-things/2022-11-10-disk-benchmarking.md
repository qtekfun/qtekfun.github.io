---
layout: post
title:  "Disk benchmarking in Linux"
categories: computer-things
---

This is a short post. Today I´ve bought a case for converting a nvme m.2 ssd disk into an external usb disk. This
box seems to be Gigabit connection and although I don´t know the specs for the disk, I would like to test the
setup. So googling I´ve found how to benchmark it and I want to write it down.

## Hdparam: easy becnhmark for ssd under linux

I didn´t know this app but it´s already included in Ubuntu 22.10. To use it is `sudo hdparm -Tt /dev/sda` and it
will output this:

![hdparam](/assets/Linux/hdparm.webp)

## Using Disks

If you prefer GUI than console, please discover the power of the console. But in the meanwhile, you can open
*Disks*. To get it working you only have to select the disk you want to benchmark, click on the three dots and
select *Benchmark*.

![Benchmark discos](/assets/Linux/Benchmark-Disks.webp)

If you let stay stock params, and then execute it, you will have something like:

![Resultado Benhmark](/assets/Linux/Result-becnhmark.webp)

With that, I think you´re ready to rock. Happy benchmarking!
