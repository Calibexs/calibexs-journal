---
title: "securing remote ssh access to my homelab"
description: "using termius, ssh jump hosts, and mdns to remotely manage my raspberry pis."
date: 2026-10-20
tags: post
---

# securing remote ssh access to my homelab

today i focused on making it easier to remotely access the devices in my homelab.

i already had my debian mini pc, **mini1**, accessible through my vpn at `10.8.0.2`, but i wanted to be able to connect to both raspberry pis from my phone without opening their ssh ports to the public internet.

## fixing hostname resolution

the first problem was getting mini1 to recognize the hostnames of my raspberry pis.

i tried connecting to **blackpi** and **legopi** directly, but the names were not resolving.

after testing the connections, i found that both devices worked using their `.local` hostnames:

- `blackpi.local`
- `legopi.local`

these addresses use **multicast dns (mdns)**, which lets devices discover each other on the local network without requiring manually configured dns records.

once i used the correct hostnames, ssh connections from mini1 worked.

## termius and ssh jump hosts

next, i configured **termius** on my phone to use mini1 as an ssh jump host.

instead of connecting directly to each raspberry pi over the internet, my connection now follows this path:

**iphone → vpn → mini1 → raspberry pi**

the first attempt did not work.

termius successfully authenticated with mini1 and started forwarding the ssh connection, but the connection to blackpi failed.

after checking the connection logs, i realized termius was trying to reach `blackpi` instead of `blackpi.local`.

i changed the hostname, connected again, and everything worked.

i then configured the same setup for legopi.

## final setup

i can now remotely access all three devices through termius:

- **mini1** connects directly through my vpn.
- **blackpi** connects through mini1 as a jump host.
- **legopi** connects through mini1 as a jump host.

neither raspberry pi needs its own public ssh port.

this also means i can manage the devices from my phone without having to remember their local ip addresses.

## next

today gave me more hands-on experience with ssh jump hosts, port forwarding, mdns, and troubleshooting remote connections.

it was a relatively small change compared to setting up the monitoring and vpn infrastructure, but it made the entire homelab much easier to use.

i want to keep building on this setup and eventually give each device a more defined role in the calibexs network.
