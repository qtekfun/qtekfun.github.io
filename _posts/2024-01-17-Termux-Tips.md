---
layout: post
title:  "Termux Tips"
categories: Config
---

To start working fast after installing Termux, the command I always run is:

```
pkg install root-repo x11-repo vim git openssh -y && pkg upgrade -y && termux-setup-storage && termux-change-repo
```