---
title: calibexs is starting to feel real
description: a lot has changed since the last update. the sites are cleaner, the infrastructure is more organized, and almost every public calibexs project is now on github.
date: 2026-08-28
---

it's only been a couple days since the last big vps update, but somehow i've already changed enough stuff that it deserves another post.

the biggest difference is that calibexs is starting to feel less like a bunch of random things i put on a server and more like an actual collection of projects.

## cleaning everything up

a lot of this started with cleaning up calibexs.com.

i completely removed the old urbex stuff from the site and repository. it was something i didn't really want associated with the site anymore, so instead of just hiding the links, i went through everything and made sure it was actually gone.

after that i spent a lot of time cleaning up the frontend itself.

i removed unused stylesheets, got rid of duplicate particle code, fixed some contrast issues, cleaned up pages, and worked on making the site lighter without changing the overall calibexs look.

the homepage ended up scoring around 98-99 for performance, 100 for accessibility, and 100 for seo in lighthouse, which is probably way more time than i expected to spend chasing a website score, but it was worth it.

the only weird best practices issues still showing locally are mostly from cloudflare injecting its own scripts, and i'm not turning off security features just to make lighthouse say 100.

## finally fixing the seo

i also went through the main site and journal and fixed a bunch of stuff that i had ignored before.

pages now have better titles and descriptions, canonical urls, open graph previews for when links are sent through messages, better favicon/meta information, and structured data where it makes sense.

the 404 page was also fixed so search engines know it is actually a 404 page and shouldn't index it.

i switched the social preview image to a png too because link previews were being inconsistent before.

it's a bunch of small stuff, but now sending a calibexs link actually looks like it belongs to a real site instead of just showing a random url.

## the status page got bigger too

the public status page has kept growing with the rest of the server.

it now keeps track of the main website, status page, calibexs os, radio, the vpn services, tools, drop, images, minecraft, the vps itself, and some of the other services running behind everything.

i also cleaned up the status script so it only exposes information that is actually useful publicly. no private ips, internal ports, usernames, software versions, or server paths need to be on a public dashboard.

minecraft is still the service that likes to randomly make the entire dashboard say degraded lol.

## wireguard and ikev2

the vpn setup is also in a much better place now.

wireguard is still running through the vps and is what i plan to use for the homelab connection once the home server is actually set up.

the problem is that my college network really does not like wireguard. even trying wireguard over port 443 didn't fix it.

so i also set up ikev2 with strongswan.

that actually works on the college network, which means i basically ended up with two vpn options now: wireguard for the stuff where i control the network and ikev2 for devices or networks that block it.

it's a little redundant, but it's useful redundancy.

## calibexs os and radio

calibexs os has also become one of my favorite random projects on the server.

it's basically a fake little web operating system inside the calibexs theme, and it now ties into calibexs radio too.

radio got its own spotify backend so it can pull the currently playing track and related information instead of just being a static page.

the backend runs separately from the frontend and keeps the actual spotify credentials and session data private.

that separation ended up becoming important again later when i decided to start publishing everything.

## tools, drop, and images

i also finished cleaning up some of the smaller calibexs services.

calibexs tools is a collection of browser utilities for networking, cidr/subnet calculations, encoding, hashing, password generation, and other random things i use.

calibexs drop is the temporary file sharing service. files get their own random download links and the application keeps the file metadata in its own database.

calibexs images works similarly but is specifically for image hosting. it validates uploaded images, gives them their own links, and also has a public gallery.

both drop and images keep their actual uploaded content and databases separate from the application source.

that became really important for the next part.

## putting calibexs on github

today i finally went through almost every public calibexs project and put it on github.

instead of making one giant repository for everything, each project has its own repo now.

the public projects include:

- [calibexs.com](https://github.com/Calibexs/calibexs-public-site)
- [calibexs journal](https://github.com/Calibexs/calibexs-journal)
- [calibexs status](https://github.com/Calibexs/calibexs-status)
- [calibexs os](https://github.com/Calibexs/calibexs-os)
- [calibexs radio](https://github.com/Calibexs/calibexs-radio)
- [calibexs tools](https://github.com/Calibexs/calibexs-tools)
- [calibexs drop](https://github.com/Calibexs/calibexs-drop)
- [calibexs images](https://github.com/Calibexs/calibexs-img)

the important part was making the code public without accidentally making the server public with it.

radio has real spotify credentials and token/session data.

drop has a live database containing uploaded file information and download tokens.

images has its own database and the actual images people upload.

none of that belongs on github.

for projects like those, i made separate sanitized public copies containing only the source code, docker files, dependency files, and documentation.

i also added gitignore rules for databases, runtime data, uploads, environment files, keys, certificates, backups, and other things that should never end up in a commit.

the actual code-server instance and anything else that is meant for administration or internal use is staying private.

public code does not need to mean public infrastructure.

## where everything is at now

looking at it now, it's kind of crazy how much this has grown.

there's the main site, the journal, the status dashboard, os, radio, tools, file hosting, image hosting, wireguard, ikev2, minecraft, backups, monitoring, docker services, cloudflare in front of everything, and now proper github repositories for basically everything that should be public.

there's still a lot i want to build, especially once i get the home server and start connecting the homelab through the vps.

but compared to where this started, calibexs finally feels like an actual platform instead of a domain i bought and started throwing random projects onto.

and knowing me i'll probably add something else tomorrow.
