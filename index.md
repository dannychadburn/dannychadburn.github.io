---
layout: default
title: 'Tidy Swan | Content, Copy and Much More'
published: true
---


# Content, just the way you like it

This is a pretty ace introduction.

## Specialist in microcopy

Good copywriting is good. Here is my page about it.

> Copy Right Now - Need copy in a hurry? Yeah, I can do that

## I also do creative stuff, structure and data

Links to those pages are here, here and here.

> Beers for Ideas - You buy me beer, I'll send you a great idea. Seems like, a fair trade don't you think?

<div>
  <ul class="posts noList">
    {% for post in paginator.posts %}
      <li>
        <span class="date">{{ post.date | date: '%B %d, %Y' }}</span>
        <h3><a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a></h3>
        <p>{% if post.description %}{{ post.description }}{% else %}{{ post.excerpt | strip_html }}{% endif %}</p>
      </li>
    {% endfor %}
  </ul>
  <!-- Pagination links -->
  <div class="pagination">
    {% if paginator.previous_page %}
      <a href="{{ paginator.previous_page_path | prepend: site.baseurl }}" class="previous button__outline">Newer Posts</a> 
    {% endif %}
    {% if paginator.next_page %}
      <a href="{{ paginator.next_page_path | prepend: site.baseurl }}" class="next button__outline">Older Posts</a>
    {% endif %}
  </div>
</div>