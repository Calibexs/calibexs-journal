---
title: "building a better image viewer"
description: "a small upgrade to calibexs img that makes hosted images feel like part of the site instead of raw files."
date: 2026-10-06
tags: post
author: "Musse Dawit"
---

# building a better image viewer

*by [Musse Dawit](https://mussedawit.com/)*

today i gave **img.calibexs.com** a small upgrade that ended up making a pretty big difference.

before, clicking an image in the gallery would just open the raw image directly in the browser.

it worked, but it did not really feel like part of calibexs.

you would basically go from the gallery to a plain browser window with the image sitting by itself.

## the new viewer

instead of building a completely separate page for every uploaded image, i made one lightweight reusable viewer.

when someone clicks an image from the gallery now, it opens inside a simple calibexs-styled interface.

the viewer includes:

- the full image
- image dimensions
- a direct image link
- a copy-link button
- a download button
- a quick way back to the gallery

the important part is that the original direct image URL still exists.

that means the images can still be embedded, downloaded, or shared directly without forcing people through the viewer.

the viewer is just a nicer way to browse them from the gallery.

## keeping it lightweight

i did not want every uploaded image generating another full html page.

instead, the viewer uses a single page and loads whichever image was selected.

that keeps the setup simple while still making the site feel much more complete.

something like:

**gallery → viewer → direct image**

instead of:

**gallery → random raw browser image**

## future uploads

the gallery is loaded dynamically, so there was one extra problem.

the first version of the viewer integration only updated images that already existed when the page loaded.

new uploads could appear afterward without getting the viewer behavior.

i fixed that by making the gallery watch for newly added image links and automatically connect them to the viewer too.

so future uploads should work the same way without needing any additional setup.

## image format support

while working on img, i also improved upload support for photos coming from phones.

the service can now handle normal jpeg, png, and webp images along with heic/heif photos and convert formats when needed so they display normally on the web.

that should make uploading directly from an iphone a lot less annoying.

## small changes matter

this was not a huge new project.

the image hosting service already worked.

this was mostly about making something functional feel finished.

the gallery, viewer, direct links, and mobile experience now feel like parts of the same service instead of separate pieces.

that is basically what i have been doing with calibexs lately:

less adding random stuff,

more making the things that already exist actually feel good to use.
