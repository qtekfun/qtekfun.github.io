---
title: "Automate Updates with Unattended-Upgrades"
layout: post
date: 2025-02-01
categories: devops
---

Hello to all virtualization and system administration enthusiasts! This time, we will configure our server to stay automatically updated using **unattended-upgrades**. Additionally, we will set up **Postfix** to receive notifications for each update. Let's get started!

---

## Step 1: Installing Unattended-Upgrades
First, we need to install `unattended-upgrades` and `apt-listchanges` to manage automatic updates and package changes. Run:

```bash
sudo apt update && sudo apt install unattended-upgrades apt-listchanges -y
```

Enable and start the service:

```bash
sudo systemctl start unattended-upgrades
sudo systemctl enable unattended-upgrades
```

---

## Step 2: Configuring Unattended-Upgrades
Edit the main configuration file to include Proxmox repositories:

```bash
sudo vim /etc/apt/apt.conf.d/50unattended-upgrades
```

Make sure to add:

```json
Unattended-Upgrade::Allowed-Origins {
        "${distro_id}:${distro_codename}";
        "${distro_id}:${distro_codename}-security";
        "${distro_id}ESMApps:${distro_codename}-apps-security";
        "${distro_id}ESM:${distro_codename}-infra-security";
        "${distro_id}:${distro_codename}-updates";
        "${distro_id}:${distro_codename}-proposed";
        "${distro_id}:${distro_codename}-backports";
        "Docker:${distro_codename}";
        "Netdata:${distro_codename}";
};
Unattended-Upgrade::DevRelease "auto";
Unattended-Upgrade::AutoFixInterruptedDpkg "true";
Unattended-Upgrade::MinimalSteps "true";
Unattended-Upgrade::Mail "YOURMAILHERE";
Unattended-Upgrade::MailReport "on-change";
Unattended-Upgrade::Remove-Unused-Kernel-Packages "true";
Unattended-Upgrade::Remove-New-Unused-Dependencies "true";
Unattended-Upgrade::Remove-Unused-Dependencies "true";
Unattended-Upgrade::Automatic-Reboot "true";
Unattended-Upgrade::Automatic-Reboot-Time "02:00";
```

For a Proxmox server, additionally include:

```json
Unattended-Upgrade::Origins-Pattern {
    "o=Debian,n=${distro_codename},l=Debian-Security";
    "o=Proxmox,n=${distro_codename},l=Proxmox VE No-Subscription";
};
```

For Proxmox Enterprise, use `Proxmox VE Enterprise` instead of `No-Subscription`.

Set the update frequency:

```bash
sudo vim /etc/apt/apt.conf.d/20auto-upgrades
```

Add:

```bash
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Download-Upgradeable-Packages "1";
APT::Periodic::AutocleanInterval "7";
APT::Periodic::Unattended-Upgrade "1";
```

---

## Step 3: Configure Postfix for Email Notifications
Install `postfix` and `mailutils` to handle outgoing email:

```bash
sudo apt install -y postfix mailutils
```

Edit the main configuration file:

```bash
sudo vim /etc/postfix/main.cf
```

Add or edit the following lines to configure your SMTP server:

```bash
inet_protocols = ipv4

# Mail config
relayhost = smtp.yourserver.com:587
smtp_use_tls = yes
smtp_sasl_auth_enable = yes
smtp_sasl_security_options =
smtp_sasl_password_maps = hash:/etc/postfix/sasl_passwd
smtp_tls_CAfile = /etc/ssl/certs/Entrust_Root_Certification_Authority.pem
smtp_tls_session_cache_database = btree:/var/lib/postfix/smtp_tls_session_cache
smtp_tls_session_cache_timeout = 3600s
smtp_header_checks = pcre:/etc/postfix/smtp_header_checks
```

Edit the password file:

```bash
sudo vim /etc/postfix/sasl_passwd
```

And add:

```bash
[smtp.yourserver.com]:587 user:yourpassword
```

Ensure the file is protected and applied:

```bash
sudo chmod 600 /etc/postfix/sasl_passwd
sudo postmap /etc/postfix/sasl_passwd
sudo systemctl restart postfix
```

---

## Step 4: Test and Adjust!
Test your configuration with:

```bash
echo "Test email from Server" | mail -s "Test Postfix" your@email.com
```

And manually trigger an update to verify:

```bash
sudo unattended-upgrades -d
```

And that's it! Your server should now stay up-to-date with the latest updates and notify you via email.
Security and peace of mind!

