---
title: "making img actually fast"
description: "reworking image delivery on img.calibexs.com with thumbnails, better LCP handling, and automatic optimization for future uploads."
date: 2026-10-06
tags: post
author: "Musse Dawit"
---

# making img actually fast

*by [Musse Dawit](https://mussedawit.com/)*

today i finally optimized **img.calibexs.com** properly.

the site itself was working fine, but pagespeed made one problem very obvious:

the gallery was loading full-resolution images even though they were only being displayed as small cards.

one of the images was several thousand pixels wide and multiple megabytes, but the browser was shrinking it down to a tiny gallery preview.

that is a massive waste.

## thumbnails

the fix was to add a real thumbnail system.

now every image keeps its original full-resolution file, but the gallery uses a separate lightweight webp thumbnail.

the flow is basically:

**upload → original image + optimized thumbnail**

the gallery loads the thumbnail.

the viewer and direct image link still use the original.

that means i get the best of both:

- fast gallery loading
- full-quality originals
- smaller bandwidth usage
- no quality loss where it actually matters

the thumbnails are generated around 640px wide and compressed as webp, which is more than enough for the gallery cards.

## existing images too

i did not want the optimization to only apply to future uploads.

i generated thumbnails for everything that was already in the gallery too.

so the improvement applied across the entire service immediately instead of slowly becoming useful over time.

## lighthouse difference

the before-and-after was pretty dramatic.

pagespeed originally estimated roughly:

**8.8 MB of unnecessary image transfer**

after switching the gallery to thumbnails, that dropped to around:

**31 KB**

that was easily the biggest performance improvement i made today.

## fixing lcp

after fixing image size, lighthouse pointed out one more thing.

the first gallery image was becoming the largest contentful paint element, but it was still marked:

`loading="lazy"`

which is exactly what you do not want for the image the browser needs first.

so i changed the behavior automatically:

the newest image, which is always first in the gallery, now gets:

`loading="eager"`

and:

`fetchpriority="high"`

everything after that stays lazy-loaded.

that means future uploads automatically become the high-priority lcp image when they move to the top of the gallery.

no manual changes needed.

## accessibility cleanup

while i was in there, i also fixed the missing language attribute on the page.

the document now explicitly uses:

`<html lang="en">`

small change, but it cleared another accessibility warning and makes the page easier for screen readers to interpret correctly.

## the result

after all of that, the current lighthouse scores are:

**mobile**

- performance: 98
- accessibility: 100
- best practices: 100
- seo: 100

**desktop**

- performance: 100
- accessibility: 100
- best practices: 100
- seo: 100

at that point, i am calling it done.

the bigger lesson from this one was that performance problems are not always about javascript or server power.

sometimes the browser is just downloading a 5 MB image to display a 250px thumbnail.

fix the obvious waste first.

