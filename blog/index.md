---
layout: page
title: "Notes"
permalink: /blog/
---

<header class="blog-intro">
  <p class="blog-kicker">PERSONAL ENGINEERING JOURNAL // POSTS ONLINE</p>
  <p class="blog-lede">Posts from the systems I build, the workflows I automate and the manual tasks I keep refusing to do twice.</p>
  <div class="blog-stats" aria-label="Blog statistics">
    <span><strong>{{ site.posts.size }}</strong> posts</span>
    <span><strong>{{ site.time | date: "%Y" }}</strong> current signal</span>
    <span><strong>01</strong> operator</span>
  </div>
</header>

<section class="blog-archive" aria-labelledby="recent-posts">
  <div class="blog-section-heading">
    <p class="blog-kicker">ARCHIVE // RECENT POSTS</p>
    <span class="blog-section-line" aria-hidden="true"></span>
  </div>

  <div class="post-timeline" id="recent-posts">
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
        {{ post.date | date: "%b %-d, %Y" }}
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
</section>
