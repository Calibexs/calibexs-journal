---
title: "automating the boring parts"
description: "building a daily github sync for seven repositories and working through the bugs along the way."
date: 2026-10-22
tags: post
---

# automating the boring parts

i spent a lot of today improving the security and reliability of calibexs, and one of the last things i wanted to tackle was keeping my github repositories updated.

i've been making changes directly on my vps, which is convenient because i can immediately see the results on the live website. the problem is that those changes don't automatically end up on github.

i wanted to fix that.

## seven repositories, one workflow

i already had separate github repositories for most of my public projects, including the main website, journal, tools, status page, calibexs os, image service, and drop service.

instead of combining everything into one repository, i decided to keep them separate and build a script that checks each project for changes.

the goal was simple: if a live source file is different from what's on github, commit and push the update. otherwise, leave everything alone.

## making it safe

because these repositories are public, i didn't want the script blindly uploading everything from my server.

i added file filtering to exclude backups, environment files, runtime data, credentials, and other files that shouldn't be published.

i also installed gitleaks to scan candidate files for potential secrets before pushing.

another important decision was to perform the actual git operations in temporary checkouts. that way, the synchronization process doesn't need to modify the live website's working files.

## fixing the bugs

getting everything to work took more troubleshooting than i expected.

first, some commits failed because of trailing whitespace in html files and extra blank lines in my journal templates.

after fixing those, i managed to push the website and journal successfully.

then i found a more interesting bug: my script was comparing changes against old local git commits instead of checking the current files against github.

i changed it to compare file hashes directly.

that introduced another problem when i incorrectly handled git's null-delimited output, causing the script to think dozens of unchanged files had been modified.

once i corrected that, every repository finally reported no outstanding approved changes.

## running automatically

i set up a systemd service and timer to perform the synchronization every day at 4:30 am server time.

the script only creates commits when approved source files have actually changed, and it refuses to force-push over unexpected remote changes.

i tested the service manually and confirmed that it completed successfully.

there are still some limitations, like handling deleted files and generated journal pages, but the core workflow is working.

## why it matters

this wasn't the most visually exciting project i've worked on, but it's one of those improvements that makes everything else easier.

now i can spend more time building things and less time remembering to push every little change to github.

it's another small step toward making calibexs feel less like a collection of unrelated experiments and more like a system that can maintain itself.

there's still plenty left to automate.
