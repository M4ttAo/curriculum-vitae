---
layout: post
title: "02 - The Warehouse"
date: 2026-03-14
permalink: /blog/02-the-warehouse/
description: "Designing an automated Google Drive warehouse for LatinHub flyers."
cover: /assets/images/automations/02-the-warehouse/cover.png
icon: "🏬"
tags:
  - Google Drive
  - AWS Lambda
  - Python
  - automation
---

## The Architecture of Chaos

When we launched, we weren't thinking about an "ecosystem"—we just needed a place to upload images. We created a single main folder called **"Parties"**, organized by month and date.

The entire workflow—from creating folders to uploading and renaming files—was manual, tedious, and prone to human error. It worked for three clubs, but it was a nightmare for 200.

### **The Challenge**

As the project grew, the "manual way" hit a wall. I was facing three main bottlenecks:

- **Manual Folder Management:** Creating hundreds of sub-folders for every date of the year was a waste of time.
- **The "Naming" Nightmare:** For the automation to work, every filename **MUST** perfectly match the **Short Name (Column M)** in our spreadsheet. Expecting a human to remember 200+ unique slugs without a typo was impossible.
- **The Scalability Limit:** We couldn't share a single "upload" folder with external Club Managers (SMMs). It would have been a security and organizational disaster.

## Inbound vs. Outbound

To fix this, I redesigned the storage logic from the ground up, splitting the workflow into two distinct environments: **Inbound** and **Outbound**.

### **The Inbound (AutoUpload)**

This is the "Entry Point." I created a dedicated folder for each club.

- **Custom Logic:** Using a script, I automatically generated a folder tree inside each club's directory (Month > Specific Dates).
- **Precision:** If a club is only open on Wednesdays, the script *only* creates Wednesday folders for them. This keeps the UI clean for the users.

### **The Outbound (Parties)**

This is the "Production Line." This folder is organized by date and is where the final, ready-to-post flyers live.

- No one touches this folder manually. It is populated solely by my sync scripts.

### **The Logic & The Sync**

The goal was simple: **me, Kevin, or SMMs should only worry about uploading a file.** The system should handle the rest. This dual-folder structure allows us to:

- **Isolate the Inputs:** Each club has its own "private" space. No one can accidentally delete or overwrite another club's flyer.
- **Enforce Standards:** By separating the raw upload (Inbound) from the production-ready file (Outbound), we ensure that only correctly processed and renamed files ever reach the final posting stage.
- **Decouple Content from Metadata:** The system identifies the club based on *where* the file was uploaded, not what the file is called.

### **The Win**

This architecture gave us the freedom to scale. We could finally share a **unique, dedicated link** with each club's SMM. They upload a file, and the system handles the naming, sorting, and database syncing.

**Zero manual clicks. Zero naming errors. Total control.**

## Setting up the Shelves

Once the architectural logic was defined, I needed a way to build these thousands of folders automatically.

### **The Evolution of the Build**

1. **The Prototype (Apps Script):** Initially, I used Google Apps Script. However, I quickly hit the **300-second execution limit**. As the number of clubs grew, the script timed out before finishing the job.
2. **The Manual Control (Local Python):** To bypass the timeout and to have a manual control of the process, I moved the logic to a local Python script on my MacBook, synced via the Google Drive Desktop app. This gave me manual control and speed but lacked true automation.
3. **The Scalable Solution (AWS Lambda):** Finally, I migrated everything to **AWS Lambda**. It was the perfect choice: it has a Free Tier, it's available 24/7, and it potentially doesn’t have execution limits.

### **The Logic**

I developed a Python script on AWS Lambda that triggers every three months to perform a "Warehouse Cleanup & Build":

- **Cleanup:** It automatically identifies and deletes expired month folders in both **Inbound** and **Outbound** directories to keep the storage lean.
- **The Build:** It references a dedicated **"Schedule Sheet"** in our spreadsheet. For every club (Short Name), the script checks their specific opening days.
- *Example:* If a club only opens on Fridays, the script only generates Friday folders for the next quarter.
- **Holiday Intelligence:** If the calendar detects a public holiday or a special event date, the script automatically generates folders also for those dates, ensuring the SMMs always have a place to upload special event flyers and i don’t need to manually create them.

### **The Win**

By moving this to AWS Lambda, I transformed a task that used to take hours of manual clicking into a **"Set and Forget"** system. The infrastructure now prepares itself months in advance, adapting dynamically to holidays and changing club schedules without me ever opening a laptop.

## The Librarian

This Python script, running on **AWS Lambda**, is the "Heart" of the Google Drive ecosystem. It must work with 100% reliability; a single bug here could lead to a missing post or, even worse, the wrong flyer being published to thousands of followers.

### **The Execution Strategy**

The script triggers every day at **7:00 PM** and takes approximately **6 minutes** to complete a full sweep. It doesn't just look at "today"; it scans a **rolling 5-day window** (today + the next 4 days) to ensure everything is synced in advance.

### **The Intelligent Sync Logic**

The script performs a deep, multi-step validation for every club in the database:

1. **Dynamic Filtering:** It identifies the target dates and matches them against each club’s internal folder structure. If a club doesn't have a folder for those specific dates, the script skips it to save resources.
2. **Format Validation:** To prevent system crashes, the engine only processes supported image formats. Any videos or unsupported files are ignored.
3. **Data Cross-Referencing:** It verifies that the folder name matches the **Short Name** in Google Sheets before any file movement occurs.
4. **The "Smart Sync" Protocol:** This is where the script decides which file is the "Source of Truth":
- **The Update:** If an image already exists in the *Outbound* folder but the version in *Inbound* is **newer**, the script deletes the old one and replaces it with the latest version.
- **The Deletion:** If an image exists in *Outbound* but has been removed from *Inbound*, the script cleans up the *Outbound* folder to prevent "ghost posts."
- **The Optimization:** If the *Outbound* image is already up-to-date, the script skips the copy process to save execution time.

### **The Transformation**

When a file is cleared for sync, it is copied to the final Outbound directory and **renamed on the fly** using the standardized `[ShortName].format` format.

### **The Win**

This logic ensures that the **Outbound** folder is always a perfect, clean reflection of what needs to be posted. By implementing "Newer vs. Older" file comparison, we gave SMMs the freedom to update a flyer at the last minute without breaking the automation.

[Next Post →](/blog/03-the-utilities/) 

[← Preivous Post](/blog/01-the-brainturning-google-sheets-into-a-database/) 
