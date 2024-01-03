# Ping

This marvelous command has a lot of interesting options that I´ve never discovered before. Let´s write down some
of them:

* `ping google.com` the normal usage.
* `ping -t google.com` infinite pings. The normal behavior it´s only 4 pings.
* `ping -n 7 google.com` define the number of pings. 7 in this example.
* `ping -l 65500 google.com` the default echo byte size is 32. If you want to modify that, use `-l` with a value
between 0 and 65500.
* `ping -l 65500 -f google.com` the `-f` avoids data fragmentation if passing through a router or a switch.

[HOME](../README.md)