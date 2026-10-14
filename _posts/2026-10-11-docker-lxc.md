---
layout: post
title: "The Docker LXC: The Workhorse of My Home Lab"
date: 2026-10-11
permalink: /blog/home-lab-docker-lxc/
description: "How I use a dedicated Debian LXC container to run Docker workloads in my home lab."
cover: /assets/images/automations/home-lab/docker-lxc/cover.png
tags:
  - DevOps
  - Docker
  - Docker Compose
  - Automation
---

## The working container

In the overview of [my home lab](https://blog.mattao.net/blog/home-lab/), I mentioned that one of my Debian LXC containers is dedicated to Docker. I called it `Docker` because, at the beginning, I expected it to be my only container. Since I never expected the home lab to grow this much, the name stayed, even though it now hosts several of my working services.

Each service runs in its own Docker container, so I can start, stop and upgrade them independently.

This distinction is worth making clear: the Docker LXC is the lightweight virtualized environment managed by Proxmox, while the services inside it are Docker containers managed by Docker Compose.

## What runs inside it

The Docker LXC currently hosts:

- **Pi-hole:** my personal ad blocker.
- **Caddy:** the proxy for my home lab. I can open `pulse.mattao.home`, and Caddy sends the request to the correct host and port, so I do not have to remember every service address.
- **IT-Tools:** a web page with a collection of useful tools for IT work. Because it runs locally, it is still available when my internet connection is down. That one is definitely for the geeks.

For each service, I try to keep the setup in a Docker Compose file. This makes the configuration easier to understand and means that rebuilding a service does not require me to remember every command I ran months earlier.

The main advantage is that updating a service only takes three commands when a new release is published:

```bash
docker compose pull
docker compose down
docker compose up -d
```
With these commands, the service is usually updated in less than thirty seconds. The containers are briefly stopped during the process, but Docker Compose starts them again with the new images immediately afterwards.

This is a simplified example of the Compose file I use for Pi-hole. The actual file also contains the values and settings specific to my network.

```yaml
services:
  pihole:
    container_name: pihole
    image: pihole/pihole:latest

    ports:
      - "53:53/tcp"
      - "53:53/udp"
      - "8080:80/tcp"
      - "8443:443/tcp"

    environment:
      TZ: "Europe/Rome"
      FTLCONF_webserver_api_password: "PASSWORD"
      FTLCONF_dns_listeningMode: "ALL"
      FTLCONF_dns_upstreams: "9.9.9.9;149.112.112.112"

    volumes:
      - "./etc-pihole:/etc/pihole"

    networks:
      - proxy

    restart: unless-stopped
networks:
  proxy:
    external: true
```

## Why not install everything on Proxmox?

The Proxmox host should have one main job: running and managing the virtual machines and containers.

Installing applications directly on the host would mix infrastructure management with application management. It might work, but it would make upgrades, backups and troubleshooting less predictable.

With the Docker workload isolated in its own LXC, I can manage the host and the applications as two different layers. If a container breaks, I do not need to modify the Proxmox installation. If I need to rebuild the Docker environment, the rest of the home lab remains separate.


## The configuration

The Docker LXC uses Debian and has the following resources:

| Resource | Configuration |
| --- | --- |
| CPU | 2 cores |
| Memory | 512 MB + 256 MB swap |
| Storage | 32GB |

After a few weeks of activity, memory usage is still around 150 MB, so I have plenty of room to grow and add more services.

## What I learned

The Docker LXC became the workhorse of my home lab because it gives me a practical middle ground. I get the flexibility of Docker without putting application workloads directly on the Proxmox host, and I keep the services grouped in a place that is easy to back up and rebuild.

It is not the only way to design a home lab, but it fits the way I like to work: separate the pieces, keep the configuration readable and make future changes less painful.

Need help setting up your own Docker environment? Or do you simply want to talk about this topic? Send me an email at [myhomelabpost@mattao.net](mailto:myhomelabpost@mattao.net) 😉
