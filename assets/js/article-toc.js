(function () {
  function slugify(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/[\s-]+/g, "-");
  }

  function setActiveLink(links, id) {
    links.forEach(function (link) {
      var isActive = link.getAttribute("href") === "#" + id;

      link.classList.toggle("is-active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function buildTableOfContents() {
    var layout = document.querySelector(".post-reading-layout");
    var content = layout && layout.querySelector(".e-content");
    var toc = layout && layout.querySelector(".post-toc");
    var list = layout && layout.querySelector(".post-toc-list");

    if (!layout || !content || !toc || !list) {
      return;
    }

    var headings = Array.from(content.querySelectorAll("h2, h3"));

    if (headings.length === 0) {
      return;
    }

    var usedIds = new Set();
    var links = [];

    headings.forEach(function (heading) {
      var baseId = heading.id || slugify(heading.textContent) || "section";
      var id = baseId;
      var suffix = 2;

      while (usedIds.has(id)) {
        id = baseId + "-" + suffix;
        suffix += 1;
      }

      heading.id = id;
      usedIds.add(id);

      var item = document.createElement("li");
      item.className = "post-toc-item post-toc-item--" + heading.tagName.toLowerCase();

      var link = document.createElement("a");
      link.href = "#" + id;
      link.textContent = heading.textContent;

      item.appendChild(link);
      list.appendChild(item);
      links.push(link);
    });

    layout.classList.add("has-toc");
    toc.hidden = false;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveLink(links, entry.target.id);
          }
        });
      },
      {
        rootMargin: "-18% 0px -68% 0px",
        threshold: 0,
      }
    );

    headings.forEach(function (heading) {
      observer.observe(heading);
    });

    setActiveLink(links, headings[0].id);
  }

  document.addEventListener("DOMContentLoaded", buildTableOfContents);
})();
