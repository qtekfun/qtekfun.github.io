---
layout: post
title:  "Zsh: install and configure like a pro"
categories: software-development
---

Today, I want to start learning Zsh. How to install it, how to configure it and the tricky things. So, let's go.

## How to install Zsh?

To install it you will need to run

``` bash
sudo apt install git curl zsh
```

Then you will want to put it as your main shell. To do that just run:

``` bash
chsh -s $(which zsh)
```

and then logout or open a new shell session.

The first time you will have a "welcome tutorial". It is very intuitive. Just follow the steps and you will be
done.

## How to install Oh My Zsh?

I come from Windows Powershell with the [Oh My Posh](/_posts/software-development/2024-03-12-Oh-My-Posh.md)
terminal so I need the same for Zsh. Then I found "Oh My Zsh" so I'm good to go.

### Zsh installation

As easy as run this line:

``` zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

### Zsh theme

By default Zsh has a basic theme. You can have a look at
[here](https://github.com/robbyrussell/oh-my-zsh/wiki/Themes) for a full list of themes. Just as an eample, I will
take honukai.

To install it go to the folder `$ZSH_CUSTOM/themes/` and there run:

``` zsh
wget https://raw.githubusercontent.com/oskarkrawczyk/honukai-iterm/master/honukai.zsh-theme
```

Then you will need to select this theme in the `~/.zshrc` file replacing the line `ZSH_THEME="robbyrussell"` by
`ZSH_THEME="honukai"`

### Zsh plugins

Last but not least, you will want some extra plugins. You will want to add the following in the `.zshrc` file:

``` zsh
plugins=(git common-aliases colored-man-pages zsh-autosuggestions zsh-syntax-highlighting)
```

And install the missing ones:

``` zsh
git clone https://github.com/zsh-users/zsh-autosuggestions.git $ZSH_CUSTOM/plugins/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-autosuggestions.git $ZSH_CUSTOM/plugins/zsh-autosuggestions
```

Some of the alias are gotten from [here](https://www.asanzdiego.com/2018/04/instalar-y-configurar-zsh-y-ohmyzsh-en-ubuntu.html)

## Zsh tricks

### Zsh Aliases

To use the aliases you will need to append them also in the `.zshrc` file with the same sintax than bash:

``` zsh
alias repo="cd ~/repo"
```

### Add ssh-agent

To configure ssh-agent to run it if it´s not already running, just append this piece of code at the end of the
`.zshrc` file:

``` zsh
# Ssh agent
SHORT_HOST="${HOSTNAME/.*/}"
ssh_env_cache="$HOME/.ssh/environment-$SHORT_HOST"

# Oh-my-zsh compatible bash ssh-agent start script
function _start_agent() {
    if [[ -f "$ssh_env_cache" ]]; then
        . "$ssh_env_cache" > /dev/null
    fi

    if [[ -S "$SSH_AUTH_SOCK" ]]; then
      return 0
    fi

    echo "Starting ssh-agent ..."
    ssh-agent -s | sed '/^echo/d' > "$ssh_env_cache"
    chmod 600 "$ssh_env_cache"
    . "$ssh_env_cache" > /dev/null
    ssh-add -t 1d
}
_start_agent

# Ssh agent
SHORT_HOST="${HOSTNAME/.*/}"
ssh_env_cache="$HOME/.ssh/environment-$SHORT_HOST"

# Oh-my-zsh compatible bash ssh-agent start script
function _start_agent() {
    if [[ -f "$ssh_env_cache" ]]; then
        . "$ssh_env_cache" > /dev/null
    fi

    if [[ -S "$SSH_AUTH_SOCK" ]]; then
      return 0
    fi

    echo "Starting ssh-agent ..."
    ssh-agent -s | sed '/^echo/d' > "$ssh_env_cache"
    chmod 600 "$ssh_env_cache"
    . "$ssh_env_cache" > /dev/null
    ssh-add -t 1d
}
_start_agent

unset ssh_env_cache
unset -f _start_agent
```

It comes from
[here](https://serverfault.com/questions/672346/straight-forward-way-to-run-ssh-agent-and-ssh-add-on-login-via-ssh)
with a little of tunning in my side.
