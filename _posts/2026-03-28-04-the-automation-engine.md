---
layout: post
title: "04 - The Automation Engine"
date: 2026-03-28
permalink: /blog/04-the-automation-engine/
description: "How Make.com turns LatinHub's scheduled flyers into automated Instagram and Telegram posts."
cover: /assets/images/automations/04-the-automation-engine/cover.png
icon: "💻"
tags:
  - Make.com
  - Instagram Automation
  - Telegram Bot
  - AWS S3
---

## The Automation Engine

This is the final and more complex automation. We have the **Brain** (Google Sheets) and the **Warehouse** (Google Drive) perfectly synced. Now, we need the **“Engine”** to pick up the processed flyer and publish it to Instagram.

For this task i chose **Make.com**.

🤖

**The choice**

Before choosing [make.com](http://make.com) i tried also Zapier, but there are limitations on the free tier that were less restrictive in Make.

### The Engine

This is the final stage of the pipeline. [Make.com](http://Make.com) is responsible for taking all the prepared assets and publishing them to Instagram.

The system is designed to be **smart**: if there are no parties scheduled for a specific day, the engine stays dormant to save resources. If there is at least one event, it springs into action.

**The Execution Logic** The scenario triggers every day at **8:00 PM** and follows a rigorous, multi-step workflow:

- **System Check & Logging:** The engine starts by sending a "Status: Starting" message to my private chat using the **Telegram Bot**.
- **Environment Setup:** It initializes all necessary variables, formatting dates (Italian/English) and generating the dynamic caption based on our pre-defined templates.
- **The Trigger Gate:** It reads the "Autopost Cell" in the **Google Sheet**. If no cities are listed, the process stops. If cities are present, it moves to the media phase.
- **Media Processing:** While the Instagram app allows up to 20 images in a single post, the **Graph API is strictly limited to 10**.
- **The Solution:** The engine counts the images in the folder. If are less than 10, it creates a single post. If no, it automatically splits the content into "Part 1" and "Part 2" to ensure no flyer is left out.
- **Format Conversion:** Instagram APIs are extremely picky—they require **JPG** format. The engine automatically converts any image to JPG on the fly.
- **AWS S3 Handshake:** The converted images are uploaded to the **AWS S3 Bucket**. The engine retrieves the direct links, which are then used for the final API call.
- **The Final Post:** It assembles the array of photos, applies the correct **Instagram Tags** (fetched from the Tags sheet), and hits the Instagram API.

**Closing the Loop** Once the post is live:

1. **Data Integrity:** Make.com captures the **Instagram Post URL** and writes it back into the "Tomorrow Link" row in Google Sheets.
2. **Multi-Channel Broadcast:** Finally, it takes the pre-built message from the sheet and broadcasts it to the **Telegram Channel** via the Bot, providing the community with the "Info Link" to the new post.

### The Result

A standardized page, that automatically publish all the parties without manual intervention.

[03 - The Utilities for the Engine ⚒️](/blog/03-the-utilities/) ← Previous Post

Next Post → [05 - Whatsapp Automation 💬](/blog/05-whatsapp-automation/)
