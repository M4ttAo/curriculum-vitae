---
layout: post
title: "03 - The Utilities for the Engine"
date: 2026-03-21
permalink: /blog/03-the-utilities/
description: "The AWS S3, Telegram and Google Sheets utilities supporting LatinHub's automation engine."
cover: /assets/images/automations/03-the-utilities/cover.png
icon: "⚒️"
tags:
  - AWS S3
  - Telegram Bot
  - Make.com
  - automation
---

## AWS S3

As explained in **[The Warehouse](/blog/02-the-warehouse/)** chapter, all our flyers live in Google Drive. However, I hit a major technical roadblock: even with a sharable link for every image, that URL is not supported by Instagram APIs to create posts.

To automate the posting, I needed a hosting solution that was:

- **Compatible** with Instagram APIs
- **Cost-Effective** providing a Free Tier.
- **Integrable:** Perfectly compatible Make.com.

### **The Search for the Perfect Host**

I experimented with three different image-hosting services, but they all had the same problem: as soon as the project scaled, I hit their **Free Tier limits** within days.

That’s when I turned to **AWS S3**. Just like Lambda, S3 offers a generous Free Tier that provided exactly what I needed: a professional-grade environment to host my "Production".

### **The "Buffer" Strategy**

I created a dedicated S3 Bucket to act as a **temporary relay station**:

1. **The Upload:** When [make.com](http://make.com) start the process, it downloads the images and upload them to **AWS S3**.
2. **The Direct Link:** S3 generates a unique, direct URL (e.g., `https://my-bucket.s3.amazonaws.com/club_date.jpg`) that Instagram’s API supports.
3. **The Lifecycle Rule:** To stay within the Free Tier and avoid paying for storage I don't need, I implemented a **Lifecycle Policy**. Every image in the bucket is **automatically deleted after 3 days**.

### **The Win**

By using AWS S3 as a middleware, I eliminated all "Media Upload" errors. The transition from a private Google Drive to a public-ready Instagram post is now seamless, fast, and—most importantly—completely free.

## Telegram Bot

Originally, I had a Telegram channel where I manually posted daily. It was time-consuming and prone to delays. To scale the operation, I built a custom **Telegram Bot** that acts as the "Voice" and the "Remote Control" of the entire ecosystem.

I integrated the bot into two distinct workflows:

### **1. The Public Notifier**

Instead of me manually typing updates, the **Automation Engine (Make.com)** now uses the Bot API to broadcast messages automatically.

- **The Flow:** Immediately after a successful Instagram post, the Bot sends a confirmation to the Telegram channel with the flyer and the event details.
- **The Result:** The community stays updated in real-time, and I have visual confirmation that the automation worked perfectly.

### **2. The Private Command Center (DevOps & Manual Overrides)**

I created a private, encrypted chat between myself and the Bot to manage the backend without opening a laptop.

- **Real-time Logging:** If Make.com encounters an error (e.g., a missing file or an API timeout), the Bot sends me a "Critical Alert" instantly.
- **Custom Commands:** I programmed specific **Slash Commands** (e.g., `/post_now [ClubName]`) that trigger Webhooks in Make.com.
- **The Benefit:** This gives me the power to force a manual post directly from my phone while I'm on the move.

### **The Win**

By centralizing logs and triggers into Telegram, I transformed a complex cloud infrastructure into a conversational interface. I don't need to monitor AWS CloudWatch or Make.com dashboards all day—**the system tells me when it needs attention.**

## [Make.com](http://Make.com) logic

To keep the automation efficient and avoid wasting "operation tokens" in the **Make.com Free Tier**, I centralized all the logic inside Google Sheets.

Instead of making the AI or the automation "think," I prepared three specialized sheets that do the heavy lifting: **DaysOpenings**, **Make**, and **Tags**.

### **1. DaysOpenings Sheet**

This sheet acts as a real-time map of all events across different cities.

- **The Logic:** Using Excel formulas, it filters the master "Clubs" list by city and opening days.
- **The Output:** If a club is marked with a **"Yes"** for a specific day, the sheet automatically generates a clean, formatted list:

```text
- Club Name — [Google Maps Link]
- Club Name — [Google Maps Link]
```

- **The Result:** For every city and every day, we have a ready-to-use list of active parties.

### **2. Make Sheet**

This is the "Control Room" that Make.com consults before taking any action. It manages three key functions:

- **The AutoPost Trigger:** A smart cell that identifies which cities have active parties for tomorrow. Make.com reads this cell to know exactly which posts need to be created.
- **The Link History (Today/Tomorrow):** When Make.com publishes a post, it writes the Instagram URL into the "Tomorrow" row. Every night at 1:00 AM, a Google AppScript automatically moves that link to the "Today" row. This ensures our links are always up to date.
- **The Message Builder:** This cell automatically assembles the final message for **Telegram and WhatsApp** using a standardized template:

```text
[City]

Date in italian | Date in English

Info: [Instagram Link]

[List of Clubs & Google Maps Links]
```

### **3. Tags Sheet**

A simple but vital “database”. For every club (using the **Short Name**), this sheet stores a comma-separated list of Instagram tags.

- **Why?** When the "Automation Engine" creates the post, it looks up this sheet to automatically tag the right instagram pages in the photo.

[02 - The Warehouse 🏬](/blog/02-the-warehouse/) ← Previous Post

Next Post → [04 - The Automation Engine 💻](/blog/04-the-automation-engine/)
