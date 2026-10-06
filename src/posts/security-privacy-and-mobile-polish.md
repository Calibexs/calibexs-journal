---
title: "security, privacy, and way too much mobile css"
description: "privacy pages, email authentication, security headers, social previews, and a very stubborn mobile button."
date: 2026-10-06
tags: post
author: "Musse Dawit"
---

# security, privacy, and way too much mobile css

*by [Musse Dawit](https://mussedawit.com/)*

today was mostly a cleanup day.

instead of building another new project, i went through **calibexs.com**, **mussedawit.com**, and some of the public calibexs services and started fixing all of the smaller things that are easy to ignore when you are focused on getting something working in the first place.

## privacy

both main sites now have dedicated privacy pages.

for **mussedawit.com**, the policy is pretty simple because the site is mostly a personal portfolio. it explains basic request logging, cloudflare, external links, email contact, and the fact that the site is not running advertising or behavioral tracking.

calibexs needed a little more explanation because some of the services actually process user-submitted content. the privacy page now covers server logs, temporary services, uploaded content, abuse prevention, and cloudflare without exposing anything about the private backend.

i also created a proper public contact address:

**contact@calibexs.com**

that address is now used across both sites instead of publishing my personal email everywhere.

## email authentication

i checked the mail configuration for calibexs too.

the custom domain mail is handled through icloud and currently has:

- SPF
- DKIM
- DMARC
- custom MX records

all three authentication checks passed when sending a real message.

gmail still threw the first test message into spam, but that seems to be more of a new-sender reputation problem than a configuration problem. the domain is authenticated correctly, so now it mostly needs normal sending history.

## security cleanup

i also audited the public-facing security headers across the sites.

mussedawit.com already had a pretty strict setup, including CSP, HSTS, frame protection, referrer policy, and permissions restrictions.

drop and img were missing a few protections, so i added things like:

- HSTS
- frame protection
- permissions policy
- content security policy

i also checked the public pages for cookies and basic csrf/xss indicators.

the static sites are not setting cookies at all, so i decided against adding one of those giant cookie consent banners that nobody wants to click through.

## security.txt

calibexs already had a proper security.txt file, and i added one to mussedawit.com as well.

both sites now point security reports toward:

**security@calibexs.com**

small detail, but it makes the whole setup feel more complete.

## social previews

mussedawit.com finally has a proper large social preview image too.

the page now includes the full open graph / twitter metadata so sharing the site should show an actual branded preview instead of just a title and some random text.

i also resized and compressed the image so it is not shipping a giant file every time somebody previews a link.

## backup cleanup

after making this many edits, i realized the public web directories had accumulated a ridiculous number of `.bak` files.

they were useful while changing things, but backups do not belong sitting inside the public webroot.

i moved them into `/var/backups` and cleaned the live directories back down to the files that are actually supposed to be served.

## the button

and then there was the button.

the **← calibexs.com** button on some of the subdomains decided that mobile browsers were optional.

it overlapped the page.

then it moved too far down.

then it disappeared.

then it ended up in the wrong place again.

after way too many css changes, i stopped trying to force the original floating button to behave and created a separate mobile version that just lives in the normal document flow.

that worked immediately.

sometimes the correct fix is apparently to stop arguing with the first fix.

## chrome ios

there was one last issue where scrolling felt slightly sticky on chrome for ios even though safari was perfectly smooth.

part of it came from mobile viewport sizing, and another part was the fixed particle background being repainted while chrome's browser controls collapsed and expanded.

switching the mobile hero sizing to stable viewport units and changing how the particles behave specifically in chrome made it considerably smoother.

there is probably still another tiny chrome-specific edge case somewhere.

i have decided that it can live.

## where things are now

the goal lately has been less about adding more stuff and more about making everything i already built feel intentional.

calibexs now has better security headers, privacy documentation, authenticated domain email, cleaner public directories, stronger identity links, better mobile behavior, and more consistent branding across its services.

mussedawit.com is getting the same treatment.

none of these changes are as exciting as launching something completely new, but this is the kind of work that turns a collection of projects into something that actually feels maintained.

and after fighting one mobile button for way longer than i would like to admit, i am absolutely done touching css for tonight.
