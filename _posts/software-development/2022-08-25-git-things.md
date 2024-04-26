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

## Supercharge `git add` and `git commit`

There are two special versions of this commands that are very interesting.

`git add -p <file>` will let us to add only a partial change in that file rather than the full file.

`git commit --amend` will let us include more changes into the existing commit. This will modify the hash of the
commit but also if you have pushed to the remote, you will need to `git push --force` which sometimes is blocked by
the repo owners. Use it with care.

## `git log` vs `git blame`

Both commands are very powerfull and each of them has a different usage and different goal to reach. Let's see some
common usages:

### `git blame`

It's used on a file. It give us the commit info which include each line into the file in the repo.

The basic usage is `git blame <file>`. Expect from this command a list of lines from the file alongisde the
metadata.

The most common options are:

* `-L`: this restrict the output lines, eg. `git blame -L 13,25 <file>`. This will show us only lines in the range
  13 to 25.

* `-e`: this will replace author username by the email address `git blame -e <file>`

* `-w`: this is a powerful option which ignores whitespaces: `git blame -w <file>`

* `-C`: this option detects lines that were moved or copied from other files and report the original author of the
  lines rather than the author who copied or moved them: `git blame -C <file>`

### `git log`

`git log` shows the list of the changes in the repo. But there are some options that could make git log more
powerful also.

* `-n`: limits the number of changes to list. I've normally use an
  [alias](../software-development/2024-01-04-git-aliases.md) which is `git last` to get last commit info that
  basically it is `git log -n 1`

* `-S`: this is a recently discovered option that searches in the source code of each commit the text you pass to
  the -S parameter. eg: `git log -S "Hello World"` this will return each commit that in their code has a "Hello
  World" text.

## Merge Request vs Pull Request

This is a stupid tricky question that some people ask me in the past. In short they are the same depending on the
context that you´re talking about.

A merge request occurs when you develop something in one branch and you want to merge it to another branch,
generally `master` or `main`. This is also used in Gitlab.

A pull request is more or less the same but in the Github or Bitbucket world.

And until now, this is the most interesting commands I want to share with you.
