---
layout: base.njk
title: major vps update
description: A major calibexs VPS update covering self-hosted services, monitoring, backups, Cloudflare, Docker, developer tools, file sharing, and image hosting.
date: 2026-08-26
tags: post
---
# major vps update

today ended up being a pretty big update for calibexs.com and my VPS.

i originally started working on a few small things, but it turned into adding multiple new services, improving monitoring, cleaning up backups, and making everything feel more connected to the main site.

## code server

one of the biggest additions was `code.calibexs.com`.

i now have a private browser-based development environment running directly from my VPS. it lets me work on my websites and projects from a browser without needing to be on my main computer.

the site is protected behind Cloudflare Access, so it isn't publicly accessible.

## tools

i also created `tools.calibexs.com`.

this is a public collection of small networking and developer tools that i can use whenever i need them.

right now it includes things like:

- DNS lookup
- IPv4 subnet calculator
- SHA-256 hashing
- Base64 encoding and decoding
- UUID generation
- password generation
- timestamp conversion

i wanted this to be something simple that i could keep expanding whenever i think of another useful tool.

## drop

another new project is `drop.calibexs.com`.

this is my own temporary file sharing service.

the upload and management side is private, while the generated download links can be shared publicly. files can automatically expire after a certain amount of time, which makes it useful for quickly sending something without keeping it hosted forever.

## image hosting

i also built `img.calibexs.com`.

this gives me my own image hosting system with a public gallery and private upload management.

uploaded images get their own random public links, while uploading and deleting images stays protected behind Cloudflare Access.

the image host currently supports JPG, PNG, and WebP files.

## monitoring and status

i updated `status.calibexs.com` to monitor the new services too.

the status page can now show the health of:

- calibexs.com
- WireGuard
- IKEv2
- code server
- tools
- drop
- image hosting
- Minecraft
- VPS services

the checks run automatically, so the page stays updated without me manually changing anything.

i also have a private monitoring setup that gives me more detailed information about the VPS while keeping the public status page limited to information that is safe to show.

## backups

i made some more improvements to my backup setup too.

important configuration and website files are backed up locally and to encrypted Cloudflare R2 storage.

for the image host, i decided not to back up the actual uploaded images because i don't want them eventually using a huge amount of backup storage. the application configuration and database can still be backed up separately.

## search and sitemap updates

i checked the site's `sitemap.xml` and `robots.txt` setup and confirmed they are publicly accessible.

the sitemap generator is now scheduled to update automatically, so new journal posts and pages can be added without me manually regenerating it every time.

i also added the new projects to the projects section of the main website.

## small fixes

there were a few smaller changes too.

all of the new sites now use the same calibexs favicon so they feel like part of the same project.

i also discovered that one of my cron jobs had created over 30,000 local mail messages because part of the build output wasn't being redirected correctly. i fixed the cron command and cleared the old mailbox.

## overall

this was probably one of the biggest single updates i've made to the VPS so far.

what started as a basic personal website is slowly turning into an actual collection of self-hosted services that i use regularly.

everything is still built around the same idea: keeping it simple, keeping it useful, and learning more about Linux, networking, Docker, Cloudflare, and web hosting while i build it.
