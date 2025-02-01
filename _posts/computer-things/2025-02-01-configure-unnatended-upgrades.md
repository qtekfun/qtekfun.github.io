---
title: "Automatiza las Actualizaciones con Unattended-Upgrades"
layout: post
date: 2025-02-01
categories: computer-things
---

¡Hola a todos los entusiastas de la virtualización y la administración de sistemas! En esta ocasión, vamos a configurar nuestro servidor para que se mantenga actualizado automáticamente usando **unattended-upgrades**. Además, configuraremos **Postfix** para recibir notificaciones de cada actualización. ¡Vamos allá!

---

## Paso 1: Instalación de Unattended-Upgrades
Primero, necesitamos instalar `unattended-upgrades` y `apt-listchanges` para gestionar las actualizaciones automáticas y los cambios de paquetes. Ejecuta:

```bash
sudo apt update && sudo apt install unattended-upgrades apt-listchanges -y
```

Activa y arranca el servicio:

```bash
sudo systemctl start unattended-upgrades
sudo systemctl enable unattended-upgrades
```

---

## Paso 2: Configuración de Unattended-Upgrades
Editamos el archivo de configuración principal para incluir los repositorios de Proxmox:

```bash
sudo vim /etc/apt/apt.conf.d/50unattended-upgrades
```

Asegúrate de agregar:

```json
Unattended-Upgrade::Allowed-Origins {
        "${distro_id}:${distro_codename}";
        "${distro_id}:${distro_codename}-security";
        // Extended Security Maintenance; doesn't necessarily exist for
        // every release and this system may not have it installed, but if
        // available, the policy for updates is such that unattended-upgrades
        // should also install from here by default.
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
Unattended-Upgrade::Mail "YOURMAILHERE"
Unattended-Upgrade::MailReport "on-change";
Unattended-Upgrade::Remove-Unused-Kernel-Packages "true";
Unattended-Upgrade::Remove-New-Unused-Dependencies "true";
Unattended-Upgrade::Remove-Unused-Dependencies "true";
Unattended-Upgrade::Automatic-Reboot "true";
Unattended-Upgrade::Automatic-Reboot-Time "02:00";
```


Si hablamos de un servidor Proxmox, necesitaremos además:

```json
Unattended-Upgrade::Origins-Pattern {
    "o=Debian,n=${distro_codename},l=Debian-Security";
    "o=Proxmox,n=${distro_codename},l=Proxmox VE No-Subscription";
};
```

Para Proxmox Enterprise, usa `Proxmox VE Enterprise` en lugar de `No-Subscription`.

Configura la frecuencia de actualizaciones:

```bash
sudo vim /etc/apt/apt.conf.d/20auto-upgrades
```

Añade:

```bash
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Download-Upgradeable-Packages "1";
APT::Periodic::AutocleanInterval "7";
APT::Periodic::Unattended-Upgrade "1";
```

---

## Paso 3: Configurar Postfix para Notificaciones de Correo
Instalamos `postfix` y `mailutils` para manejar el correo saliente:

```bash
sudo apt install -y postfix mailutils
```

Configuramos el archivo principal:

```bash
sudo vim /etc/postfix/main.cf
```

Añade o edita las siguientes líneas para configurar tu servidor SMTP:

```bash
inet_protocols = ipv4

# google mail configuration
relayhost = smtp.tuservidor.com:587
smtp_use_tls = yes
smtp_sasl_auth_enable = yes
smtp_sasl_security_options =
smtp_sasl_password_maps = hash:/etc/postfix/sasl_passwd
smtp_tls_CAfile = /etc/ssl/certs/Entrust_Root_Certification_Authority.pem
smtp_tls_session_cache_database = btree:/var/lib/postfix/smtp_tls_session_cache
smtp_tls_session_cache_timeout = 3600s
smtp_header_checks = pcre:/etc/postfix/smtp_header_checks
```

Edita el archivo de contraseñas:

```bash
sudo vim /etc/postfix/sasl_passwd
```

Y añade:

```bash
[smtp.tuservidor.com]:587 usuario:tupassword
```

Asegúrate de proteger este archivo y aplicarlo:

```bash
sudo chmod 600 /etc/postfix/sasl_passwd
sudo postmap /etc/postfix/sasl_passwd
sudo systemctl restart postfix
```

---

## Paso 4: ¡Prueba y Ajusta!
Prueba tu configuración con:

```bash
echo "Prueba de correo desde Proxmox" | mail -s "Test Postfix" tu@email.com
```

Y fuerza una actualización manual para verificar:

```bash
sudo unattended-upgrades -d
```

¡Y listo! Ahora tu servidor debería mantenerse al día con las últimas actualizaciones y notificarte por correo.
¡Seguridad y tranquilidad!
