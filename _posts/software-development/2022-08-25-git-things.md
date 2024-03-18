---
layout: post
title:  "Git Things: all the things you need to know"
categories: software-development
---

The idea of this post is to have all the how-tos things about git in one post.

## Add a remote for an existing project

This is one of the things I've never remember. The instructions are:

* Create at least one commit in the local project
      ``` bash
      git add .
      git commit -am "init"
      ```

* Configure remote repo (You can use also ssh url):
      `git remote add origin https://github.com/[user]/[project_name].git`

* Configure remote url:
      `git config remote.origin.url https://[user]@github.com/[user]/[project_name]`

* Do the initial push to github:
      `git push -u origin master`

* Set tracking info - master:
    `git branch --set-upstream-to origin/master`

> tip:
>      before do this, the remote repo should at least contain 1 commit,
>      you can do this by push once, or create a file remotely (e.g. README.md).

Now you can check the project on github, to see is it ok.

source [1](https://stackoverflow.com/questions/27645794/how-to-set-a-local-git-project-to-remote)