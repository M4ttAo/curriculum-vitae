---
layout: post
title: "Tailscale LXC: A Secure Route Back Home"
date: 2026-10-11
permalink: /blog/home-lab-tailscale-lxc/
description: "How I use a lightweight Debian LXC container to connect securely to my home network from anywhere."
cover: /assets/images/automations/home-lab/tailscale-lxc/cover.png
tags:
  - DevOps
---

## A route back home

I installed Tailscale for a reason that goes back to the beginning of my home lab project: protecting my devices from ads and telemetry, even when I am away from home.

Tailscale runs directly on Debian inside its own LXC container. It creates a private network between my trusted devices and gives me a secure way to reach my home network without exposing internal services directly to the public internet.

I mainly use it for three things: resolving DNS through Pi-hole, accessing private services at home and routing internet traffic through my home connection when I need to.

## DNS resolution through Pi-hole

In Tailscale, I configured a DNS override that points to my home Pi-hole. This means that my iPhone uses the same DNS resolver whether it is connected through 5G or an external Wi-Fi network.

As a result, the device keeps the same ad and telemetry filtering I use at home. The filtering is no longer limited to my home Wi-Fi: it follows the device wherever it connects.

## Private access to my home network

I also configured the Tailscale node to advertise my home network. This allows me to access devices and services that are only available at home, such as Home Assistant, while I am away.

The services do not need to be exposed directly to the public internet. Traffic destined for my home devices is routed through the private Tailscale network, while other internet traffic continues to use the network I am currently connected to.

This is different from opening ports on my router or publishing every service externally. I can reach the tools I need without making them publicly accessible.

## Using the home connection as an exit node

When I need it, I can enable the exit-node functionality on the Tailscale server. This lets my device route its internet traffic through my home connection, as if it were connected to my home network.

I do not use the exit node all the time. It is available for situations where I need my traffic to leave the internet through my personal home connection instead of the network I am visiting.

## Why use a dedicated LXC?

The Proxmox host should have one main job: running and managing the virtual machines and containers.

Installing applications directly on the host would mix infrastructure management with application management. It might work, but it would make upgrades, backups and troubleshooting less predictable.

With Tailscale isolated in its own LXC, I can manage the Proxmox host and the network service as two separate layers. If I need to rebuild the Tailscale environment, I do not need to modify the Proxmox installation or the other services in my home lab.

## The configuration

The Tailscale LXC uses Debian and has the following resources:

| Resource | Configuration |
| --- | --- |
| CPU | 1 core |
| Memory | 128 MB + 128 MB swap |
| Storage | 8 GB |

After a few weeks of activity, memory usage is still around 35 MB. Tailscale needs very few resources, so this small LXC is more than enough for the job.

## What I learned

The Tailscale LXC gives me a simple and reliable route back to my home network. It keeps remote access, DNS filtering and the optional exit node in one lightweight service, without adding unnecessary workload to the Proxmox host.

Need help setting up your own Tailscale network? Or do you simply want to talk about this topic? Send me an email at [myhomelabpost@mattao.net](mailto:myhomelabpost@mattao.net) 😉
