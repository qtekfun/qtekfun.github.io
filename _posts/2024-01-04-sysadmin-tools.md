---
layout: post
title:  "Sysadmin tools"
---

Some resume of the things I´ve never use in my daily basis.

## Ping

This marvelous command has a lot of interesting options that I´ve never discovered before. Let´s write down some
of them:

* `ping google.com` the normal usage.
* `ping -t google.com` infinite pings. The normal behavior it´s only 4 pings.
* `ping -n 7 google.com` define the number of pings. 7 in this example.
* `ping -l 65500 google.com` the default echo byte size is 32. If you want to modify that, use `-l` with a value
between 0 and 65500.
* `ping -l 65500 -f google.com` the `-f` avoids data fragmentation if passing through a router or a switch.

## Traceroute/Tracert

In windows: `tracert`
In unix/mac: `traceroute`

To ignore IP resolution: `tracert -d google.com`. Eg:

`4     5 ms     6 ms     5 ms  212.221.93.249`

vs

`  4     5 ms     5 ms     6 ms  ae5.cr3-mad5.ip4.gtt.net [212.221.93.249]`

It´s "layer 3" command.

## Nslookup

* Fordward Lookup: `nslookup qtekfun.github.io`
* Reverse Lookup: `nslookup 185.199.108.153`


## Angry IP Scanner

WIP
