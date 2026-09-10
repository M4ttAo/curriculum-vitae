---
layout: default
title: "Matteo Cavalli"
---

<section class="home-hero">
  <p class="home-kicker">COLLABORATION // AUTOMATION // ENGINEERING</p>
  <h1>Matteo Cavalli</h1>
  <p class="home-title">Collaboration and Automation Engineer</p>
  <p class="home-lede">I design systems, automate repetitive work and make complicated infrastructure easier to operate.</p>
</section>

<section class="home-section" aria-labelledby="selected-areas">
  <div class="home-section-heading">
    <h2 id="selected-areas">Selected areas</h2>
    <span class="home-section-line" aria-hidden="true"></span>
  </div>
  <p class="home-tags">
    {% for skill in site.data.profile.featured_skills %}
      {% include tag-badge.html tag=skill %}
    {% endfor %}
  </p>
</section>

<section class="home-section" aria-labelledby="latest-posts">
  <div class="home-section-heading">
    <h2 id="latest-posts">Latest posts</h2>
    <a href="{{ '/blog/' | relative_url }}">all posts &rarr;</a>
  </div>
  <div class="home-list">
    {% for post in site.posts limit: 3 %}
      <article class="home-list-item">
        <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %-d, %Y" }}</time>
        <div>
          <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
          {% if post.description %}
            <p>{{ post.description | strip_html | truncate: 150 }}</p>
          {% endif %}
        </div>
      </article>
    {% endfor %}
  </div>
</section>

<section class="home-section" aria-labelledby="selected-work">
  <div class="home-section-heading">
    <h2 id="selected-work">Selected work</h2>
    <a href="{{ '/cv/' | relative_url }}">full CV &rarr;</a>
  </div>
  <div class="home-list">
    {% for project in site.data.projects limit: 3 %}
      <article class="home-list-item home-list-item--project">
        <span class="home-list-index">{{ forloop.index | prepend: '00' | slice: -2, 2 }}</span>
        <div>
          <h3>{{ project.title }}</h3>
          {% if project.description %}
            <p>{{ project.description | strip_html | strip_newlines | truncate: 180 }}</p>
          {% endif %}
        </div>
      </article>
    {% endfor %}
  </div>
</section>

<section class="home-section home-about" aria-labelledby="about-blogger">
  <div class="home-section-heading">
    <h2 id="about-blogger">About the blogger</h2>
    <span class="home-section-line" aria-hidden="true"></span>
  </div>
  <p>Most of my personal projects start with one question: <em>why am I still doing this manually?</em></p>
  <p>I write about the systems, automations and experiments that help me reduce friction and make useful things run quietly in the background.</p>
  <a href="{{ '/about/' | relative_url }}">more about me &rarr;</a>
</section>
