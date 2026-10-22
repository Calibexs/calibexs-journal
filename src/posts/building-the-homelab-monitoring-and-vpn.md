---
title: "building the homelab: monitoring and vpn networking"
description: "getting grafana, prometheus, haproxy, and vpn routing working across my homelab."
date: 2026-10-19
tags: post
---

# building the homelab: monitoring and vpn networking

last night was mostly about getting my homelab to work together properly instead of having a bunch of devices and services that could not communicate reliably.

my current setup includes a debian mini pc named **mini1**, two raspberry pis named **blackpi** and **legopi**, and my existing ovh vps. the vps acts as a remote access hub, while mini1 handles several services inside my local network.

## monitoring

one of the biggest things i worked on was getting **prometheus and grafana** running properly on mini1.

prometheus collects metrics from my devices, and grafana gives me a dashboard to actually see what is happening across the network.

i also worked with node exporter and a custom metric called `calibexs_device_online` to track whether devices are responding.

after troubleshooting the configuration, i verified that prometheus was returning device information through its api.

i also confirmed that haproxy was running and enabled on mini1. this lets me access grafana through my vpn at `10.8.0.2:3000` instead of depending on the local network address.

## vpn networking

the other big challenge was getting traffic to move correctly between my different vpn networks.

my setup uses both **wireguard and ikev2**, with my vps acting as the central connection point.

i spent time investigating linux routing, iptables, docker networking, and the `DOCKER-USER` firewall chain.

one of the problems was that connecting to the vpn did not necessarily mean i could reach every internal service. the firewall still needed to allow the right traffic between the networks.

i checked the rules, reviewed packet counters, and worked through the routing until the connections i needed were working.

## next

this was one of those projects where most of the work happened in the terminal, but the end result made the entire setup more useful.

i now have a working monitoring environment and better connectivity between my vps and local devices.

the next thing i want to improve is remote ssh access to all three devices, especially from my phone without exposing additional ports to the internet.
