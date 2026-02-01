---
layout: post
title:  "Ansible everywhere: use Ansible from your smartphone"
categories: devops
---

Life happens everywhere no matters where you are. And in all that places, your smartphone is always with you so let's
have Ansible with us everywhere.

## How to get Ansible on Android?

### Pre-requirements:

For that we need Termux in first place. For installing it, only F-Droid's version is valid. so:

1. Install F-Droid or F-Droid client. I've prefer Droidify so let's go for it. Download it from
   [here](https://github.com/Droid-ify/client)
1. Once installed, dowload from it [Termux](https://f-droid.org/en/packages/com.termux/)
1. Now I've recomend to configure some things in it using [this](../software-development/2024-01-17-Termux-Tips.md)

### Install Ansible

For installing Ansible, first things are install dependencies:

``` shell
pkg update && pkg upgrade -y
pkg install binutils python rust libffi openssl clang make git build-essential -y
export ANDROID_API_LEVEL=24
export LDFLAGS="-L${PREFIX}/lib"
export CPPFLAGS="-I${PREFIX}/include"
pkg install python-pip -y
pip install cryptography
pip install ansible
```

That will take a while. Relax and let it finish. Once it's done, you can verify if Ansible is installed by running:

``` shell
ansible --version
```

#### Extra tip

If you plan to update Ansible or any other Rust packages, It's recomended to export this.

``` shell
echo "export ANDROID_API_LEVEL=24" >> ~/.bashrc
```

## Test Ansible on Android

Now that we have Ansible correctly installed, let's play with it. The easiest test is to ping a server. For doing that:

1. Create an `inventory.yml` and fulfill it with:

    ``` yaml
    all:
    hosts:
      my_server:
        ansible_host: <ip>
        ansible_user: <user>
    ```

1. Generate ssh-key in case you don´t have one:

    ``` shell
    ssh-keygen -t ed25519 -C "your_email@example.com"
    ```

1. Install your public ssh-key in the server:

    ``` shell
    ssh-copy-id tu_usuario@IP_DEL_SERVIDOR
    ```

1. To verify if the ssh-key is correctkly installed, just try:

    ``` shell
    ssh <user>@<ip>
    ```

1. Try to ping using ansible running:

    ``` shell
    ansible -i inventory.yml all -m ping
    ```

    You should receive an answer like:

    ``` shell
    my_server | SUCCESS => {
        "changed": false,
        "ping": "pong"
    }
    ```

And with that, you're ready to go. Happy day!