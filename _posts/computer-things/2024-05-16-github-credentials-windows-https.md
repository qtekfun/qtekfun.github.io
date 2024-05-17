---
layout: post
title:  "How to delete Github credentials for https in Windows?"
categories: computer-things
---

Sometimes you forget how you do things and that's what happened to me regarding the github credentials when using
https connections. I normally use ssh connections so this is the exception. When you are using this in Windows, git
normally pop up something like this:

![Connect To Github](/assets/computer-things/2024-05-16-github-credentials-windows-https/ConnectToGithub.jpg)

And after you have connected in your browser it works and that's all. But, what about if you want to remove the
credential? Here we are, let's see how it works.

## Delete Github credentials from Windows

1. You need to search in Windows Startup Menu `Credential Manager`
![Credential Manager](/assets/computer-things/2024-05-16-github-credentials-windows-https/CredentialManager.jpg)

1. Once you are there, search for `Windows Credentials`
![Windows Credentials](/assets/computer-things/2024-05-16-github-credentials-windows-https/WindowsCredentials.jpg)

1. And then you will have in the list of `Generic Credentials` your searched credential
![Credential](/assets/computer-things/2024-05-16-github-credentials-windows-https/Credential.jpg)
From there you can `Edit` it or `Delete` it.

And that´s all for today. Happy coding!
