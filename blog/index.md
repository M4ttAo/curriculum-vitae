---
layout: page
title: "Blog"
permalink: /blog/
---

<div class="post-timeline">
{% assign previous_year = "" %}
{% for post in site.posts %}
  {% assign post_year = post.date | date: "%Y" %}
  {% if post_year != previous_year %}
    <h2 class="timeline-year">{{ post_year }}</h2>
    {% assign previous_year = post_year %}
  {% endif %}

  <article class="timeline-item">
    <div class="timeline-date">
      <time datetime="{{ post.date | date_to_xmlschema }}">
        {{ post.date | date: "%b" }}
        <strong>{{ post.date | date: "%-d" }}</strong>
        <span>{{ post.date | date: "%Y" }}</span>
      </time>
    </div>

    <div class="timeline-card{% unless post.cover %} timeline-card--text{% endunless %}">
      {% if post.cover %}
        <a class="timeline-card-image"
           href="{{ post.url | relative_url }}"
           tabindex="-1"
           aria-hidden="true">
          <img src="{{ post.cover | relative_url }}" alt="">
        </a>
      {% endif %}

      <div class="timeline-card-body">
        {% if post.icon %}
          <span class="timeline-card-icon" aria-hidden="true">{{ post.icon }}</span>
        {% endif %}

        <h2>
          <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        </h2>

        {% if post.description %}
          <p>{{ post.description | strip_html | truncate: 150 }}</p>
        {% endif %}

        {% if post.tags %}
          <p class="tag-list">
            {% for tag in post.tags %}
              {% include tag-badge.html tag=tag %}
            {% endfor %}
          </p>
        {% endif %}
      </div>
    </div>
  </article>
{% endfor %}
</div>
