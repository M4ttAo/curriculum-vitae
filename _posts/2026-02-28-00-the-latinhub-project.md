---
layout: post
title: "00 - The LatinHub Project"
date: 2026-02-28
permalink: /blog/00-the-latinhub-project/
description: "How LatinHub became a fully autonomous, zero-cost infrastructure for Salsa and Bachata events across Italy."
cover: /assets/images/automations/00-the-latinhub-project/cover.png
icon: "💻"
tags:
  - LatinHub
  - automation
  - Google Sheets
  - Google Drive
  - Make.com
---

## What is LatinHub?

[LatinHub](https://instagram.it/latinhub.it) is a personal project where Social Media Marketing meets Software Engineering. It started as a community-driven Instagram page, Telegram channel, and WhatsApp groups that aggregates Salsa and Bachata events across Italy. We provide a daily lineup of every open club, ensuring dancers always know where to go.

What began as a simple "source of truth" for the community has evolved into a **fully autonomous digital infrastructure**. Today, thousands of people rely on a system that runs entirely on code, 24/7.

## **The Key Results** 🚀

- **99.9% Automation:** Reduced daily management from a 4-hour "second job" to a 30-minute maintenance task twice a year.
- **Zero-Cost Infrastructure:** Built a professional-grade pipeline using Free Tier services (AWS, Google, Make).
- **100% Reliability:** Achieved perfect uptime across Instagram, Telegram, and WhatsApp with zero missed posts in the last year.
- **Infinite Scalability:** The architecture can manage 50+ cities simultaneously without increasing manual workload.

## When it started

It was **January 2023**. My friend Kevin and I were looking for a party during the Christmas holidays. After 40 minutes of jumping from one club's page to another without finding a single clear piece of info, we simply gave up.

That frustration sparked an idea: *"What if we create a page that collects all these parties in one place?"*

The project evolved rapidly—first as a website, then an app—but we got stuck on the data privacy and security implications. Managing all the personal data those platforms would require became our true bottleneck, so we gave up. On **May 29th**, I went back to Kevin with a simpler approach: *"Let’s just start with an Instagram page. We’ll collect one flyer for every club and post it."* [LatinHub](https://instagram.com/latinhub.it) was born, and our [first post](https://www.instagram.com/p/Cs5uA8fNoWu/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==) went live on June 1st!

## The Challenges

The idea was simple, but the execution was a logistical nightmare. To keep the page updated daily, we had to:

- **Scout** every club to find their opening days and download their flyers.
- **Store** all daily flyers in a shared drive for mutual access.
- **Draft** standardized captions to keep the feed organized.
- **Set reminders** to ensure we never missed a posting window.
- **Manual Broadcasting**: Copy-pasting updates to Telegram and WhatsApp.

Doing this every single day felt like a second full-time job. Naturally, we missed some posts, and the "manual" weight was becoming unsustainable. While Kevin focused on PR and club relations, I went down the rabbit hole of **process automation**. My mission: make it smooth, simple, and hands-off.

## Infrastructure

It took a year and a half to transition from a 100% manual process to a **fully automated ecosystem**. I spent countless hours testing tools, hitting API limits, and failing. My biggest constraint? **The budget had to be €0.**

Today, the system runs like a Swiss watch. Here is the tech stack behind LatinHub:

### **Google Sheets: The Brain** 🧠

It’s our main [database](/blog/01-the-brainturning-google-sheets-into-a-database/) and command center. It handles:

- **Club Directory**: Locations, contact info, and recurring event schedules.
- **Caption Generation**: Formulas that automatically compile the standardized caption to be used under our daily posts.
- **Tag Management**: A dedicated library of specific Instagram handles to be tagged *on the photo* of each corresponding club.

🙈

**A quick disclaimer...** I work in tech and I usually cringe when people use Excel as a database. Repeat after me: ***Excel is not a database!*** But for us, it was free, accessible, and incredibly fast to iterate on. Three years later, it’s still our "DB," and it works perfectly.

### **Google Drive: The Warehouse** 🏬

Our storage is split into two main structures:

1. **Inbound**: Folders where club SMMs upload their *daily flyers*.
2. **Outbound**: A processed "month/day" tree where the system pulls the final *images* for posting.

### **The Automation Engine** 💻

- **Google Apps Script**: Custom Javascript to handle logic and data cleaning within Google Sheets.
- **AWS Lambda**: Python scripts that run daily to sync files between club folders and our main distribution folder. It also auto-generates the folder structure for the upcoming month.
- **AWS S3**: Used to host images temporarily, providing public URLs for the posting engine.
- **Make.com**: The conductor. Every day at 8:00 PM, it checks the schedule, fetches images from Drive, uploads them to S3, and triggers the Instagram API to publish. Finally, it send a message on our Telegram Channel using Telegram bot.
- **Telegram Bot**: Our control center. It sends us logs and confirms when a post is successful.
- **iPhone Shortcuts**: Every morning at 10:30 AM, a shortcut pulls the daily lineup from Google Sheets and send it to our WhatsApp Community.

## The Results

Automation didn’t just save us time; it saved the project. During the first few weeks, the hype was sky-high. We were excited about the idea, the positive feedback from people was amazing, and everything felt easy.

But when the initial "honeymoon phase" faded, the sheer weight of running the page manually became overwhelming. Without automation, we were constantly stressed, asking ourselves: *"Did I save all the images?"*, *"Is everything synchronized?"*, or *"Did that club finally post their flyer?"*.

Automation was our lifesaver. It allowed us to shift from "managing" to "growing".

- **Efficiency:** We reduced daily management time by **99.9%**. The system now runs entirely on its own; we only need a 30 minutes manual task twice a year.
- **Reliability:** We achieved **100% uptime** in daily communications across all platforms. No more missed posts or forgotten updates.
- **Scalability:** The infrastructure is now so robust that we could potentially manage **50+ cities simultaneously** without adding a single minute of manual work.

## Lessons Learned

I’ll be honest: when I started this project, automation wasn't even on my radar. Once I realized we needed it, the only solutions I found were expensive, "all-in-one" products that we simply couldn't afford.

But I didn’t give up. I started automating one small task at a time, slowly connecting the dots. What began as a few scripts ended up becoming my personal **Swiss Clock**.

It runs so smoothly now that, sometimes, I actually forget it’s still out there, posting every single day without me lifting a finger.

## Do you wanna see the result?

[Next Post →](/blog/01-the-brainturning-google-sheets-into-a-database/) 
