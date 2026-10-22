---
title: "locking things down"
description: "securing my infrastructure, expanding tools, cleaning up the website, and getting serious about security monitoring."
date: 2026-10-22
tags: post
---

# locking things down

today was one of those days where i started working on a few small things and somehow ended up making changes across almost my entire infrastructure.

the biggest focus was security. i've spent a lot of time building services and connecting everything together, but i wanted to make sure those services were actually protected.

## securing the admin services

i already had Cloudflare Access protecting my private dashboards, but i realized something important: someone could potentially bypass Cloudflare and connect directly to my VPS.

i set up origin-side JWT verification using a local Python service and Nginx's `auth_request` functionality.

i extended that protection across five services:

- admin.calibexs.com
- monitor.calibexs.com
- code.calibexs.com
- drop-admin.calibexs.com
- img-admin.calibexs.com

all five returned HTTP 401 when accessed directly without authentication, while continuing to work normally through Cloudflare Access.

## creating a security baseline

i built a Python utility called `calibexs-security` to record and compare security settings on my VPS.

it checks SSH configuration, UFW rules, listening ports, Nginx configuration hashes, Docker ports, service health, Fail2ban, and origin authentication.

the initial comparison showed no unexpected changes.

the one remaining warning is that SSH password authentication is enabled. i'll address that after verifying key-based access from my devices.

i also configured a daily systemd timer to keep checking for changes.

## making the website more secure

a security scan identified weaknesses in the Content Security Policy on calibexs.com.

the biggest issue was unrestricted inline JavaScript.

i tested a stricter policy in report-only mode, moved the homepage's live-status JavaScript into an external file, and audited all 25 HTML files for inline JavaScript.

after dealing with Cloudflare Rocket Loader and checking the browser, i removed `'unsafe-inline'` from the enforced JavaScript policy.

i also added `base-uri 'self'` and `object-src 'none'`.

everything still works, including the original website design.

## more tools and a cleaner dashboard

i expanded tools.calibexs.com to 18 utilities.

the newest additions include an IPv6 address expander, HTTP security header inspector, and text diff checker.

i also improved the Admin Dashboard with cleaner navigation and quick-access links.

the website, journal, and network pages received improvements to their layout, navigation, and organization.

i briefly experimented with a completely different homepage design but decided to restore the original dark purple aesthetic.

## what's next

i still want to finish hardening SSH, test backup restoration, improve monitoring across my VPS and homelab, and review the security policies on my other subdomains.

today wasn't really about adding another major service.

it was about taking the things i've already built and making them more secure and reliable.

building everything is fun, but maintaining and protecting it is just as important.

that's what calibexs is becoming: a place where i can build things, break things, fix them, and document everything along the way.
