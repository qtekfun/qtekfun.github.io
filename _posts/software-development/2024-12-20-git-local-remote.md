---
layout: post
title:  "Git: Create a remote repo in your local machine"
categories: software-development
---

Today, a colleague explain me the behaviour of having a remote local repository and to not forget about it (and to
remember where I have it write down) I'm creating this post.

## Why to use a local remote repository?

That is very useful when you are playing with scripts for rollout some changes in a very big number of branches. For
that, you can fully test your scripts to your local remote.

## How to proceed?

The initial steps are:

``` shell
git clone --mirror <url> <remote_local>
cd <remote_local>
git remote -v
  origin <url> (fetch)
  origin <url> (push)
```

But you don't want to mess up thing in production, so to avoid break the real remote, my colleague suggested me:

``` shell
git remote remove origin
```

In that way you will not be able to push to the remote by mistake.

Then, it's time to local clone things. For doing that, the best way it's the normal one:

``` shell
git clone <local path in machine> <destination>
cd <destination>
git remote -v
  origin <local path in machine> (fetch)
  origin <local path in machine> (push)
```

## LFS, always in the middle

But we can go further and you could have LFS objects in your repos. How I should manage that? Well, you need to download
all of them tou your local remote. To do that:

``` shell
cd <remote_local>
git lfs fetch --all
```

And after some time, everything should be ready to go.

I hope this helps someone.
