---
layout: page
title: "Blog"
permalink: /blog/
---

<ul class="post-list">
{% for post in site.posts %}
  <li>
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    <span class="meta">{{ post.date | date: "%-d %B %Y" }}</span>

    {% if post.tags %}
      <span class="tag-list">
        {% for tag in post.tags %}
          {% include tag-badge.html tag=tag %}
        {% endfor %}
      </span>
    {% endif %}
  </li>
{% endfor %}
</ul>
