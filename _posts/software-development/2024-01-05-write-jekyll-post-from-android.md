---
layout: post
title:  "Write a Jekyll post from Android"
categories: software-development
---

If you are like me, that your phone is the center of your life, working from your phone is very important for you.
But you also want to share with everyone all the things you have learned today. To do that, you've created a Jekyll
site as a Github Page and now you want to publish from Android.

Some time ago I made a post about coding from Android in Spanish. At that point, my english level was worse, my web
was in [Hugo](https://gohugo.io/), which is faster and better than [Jekyll](https://jekyllrb.com/) but harder to
maintain. So, now as I moved to Jekyll, I would like to explain how to do it.

As this post is fully written from my smartphone, I would like to explain you how to do it.

## Prerequisites

I expect you already have your site up and running.

## Installing local stuff

### 1. Droidify

First of all, you need to install Termux. I normally install it from [Droidify](https://github.com/Droid-ify/client/releases).

Once you have Droidify, you will need to install Termux from it.

### 2. Configuring Termux

When opening Termux first time, you will have to update local packages at least. To do that, run `pkg upgrade` and
answer "y" to all the questions. I made a post here about [Termux Tips](/_posts/2024-01-17-Termux-Tips.md) that
does that in one command only.

You will also need to have access to the storage from termux to use your Android's text editor. To grant that you need to run `termux-setup-storage`.

After that, we need some basic programs:

* Git: to commit our posts.
* Ssh: to clone our repo and manage ssh credentials to github.
* Vim: basic text editor. Not mandatory but useful.
* Jekyll: to preview locally the post before pushing to the web.

To install all of them, we just need to run:

``` bash
pkg install git vim openssh ruby
gem install jekyll
```

### 3. Get your web

To download your webpage, you will need to clone your source code from our own repo.

You will want to clone it under a path like:

`~/storage/shared/repo`

In this way, you could use one code editor like [Squircle CE](https://github.com/massivemadness/Squircle-CE) to
create your new posts. If you don´t like it, you also have [A-Code](https://github.com/deadlyjack/Acode).

### 4. Create the post:

You will create the markdown as usually in a Jekyll site. To test it you have to run:

* Only the first time `bundle install` to get all needed gems.
* Each time you want to create a local server `bundle exec jekyll serve`. At this point you can find in your Android's web browser your local site in `http://127.0.0.1:4000`

### 5. Commit your post

Now that you have reviewed your post, from the termux console, you just push it to your remote repo and wait for Github actions to deploy them.

Happy publishing!
