---
layout: post
title:  "How to by pass Kobo e-reader configuration without using an account?"
categories: random-stuff
---

If you are here you love privacy and you want to use an e-reader without link it to an account. Kobo e-readers are
perfect for that and here I will show you how to do it with the new Kobo Libra Colour.

> Important things:
> You're going to lose the process of your readings
> You're going to lose your notes
> You're not going to be able of sync notes with the cloud

With that in mind, let´s go

## Bypass Kobo Configuration

To do that you can use a freshly e-reader or one already configured.

The steps are:

1. Connect the e-reader to the laptop
1. Delete the file `.kobo/KoboReader.sqlite`. This is only present if you´re logged in. If you have it, delete it.
![.kobo/KoboReader.sqlite](/assets/random-stuff/bypass-kobo/koboreader-sqlite.png)
1. Disconnect it from pc.
1. Restart Kobo e-reader. It will go again to the configuration menu.
1. Connect it to pc.
1. Navigate to `.kobo/Kobo/Kobo ereader.config` and open the file with notepad
![.kobo/Kobo/Kobo ereader.config](/assets/random-stuff/bypass-kobo/koboreader-conf.png)
1. Under the header `[ApplicationPreferences]` append in a new line `SideloadedMode=true` as in the picture:
![SideloadedMode=true](/assets/random-stuff/bypass-kobo/koboreader-conf-sideloaded.png)
1. With that in place, save the file and eject the e-reader from the pc. If it starts importing your books or if
   you're in the main screen, you're ready to go. Otherwise, restart the e-reader and you will be done.

And that´s all. If you have any doubts, reach me in my rrss. Credits goes to [this tutorial](https://www.reddit.com/r/kobo/comments/mt2f30/how_to_bypass_account_setup/) where I got the main
instructions. I've just extend them for me and put some nice pics.
