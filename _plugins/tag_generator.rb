module Jekyll
  class TagPageGenerator < Generator
    safe true
    priority :low

    def generate(site)
      tags = site.tags.keys

      (site.data['projects'] || []).each do |project|
        (project['tags'] || []).each do |tag|
          tags << tag unless tags.include?(tag)
        end
      end

      (site.data['skills'] || []).each do |group|
        (group['items'] || []).each do |item|
          tags << item unless tags.include?(item)
        end
      end

      return if tags.empty?

      dir = (site.config['tag_dir'] || 'blog/tag').sub(%r{^/+}, '')

      tag_urls = {}
      used_slugs = {}

      tags.each do |tag|
        base_slug = Jekyll::Utils.slugify(tag)
        slug = base_slug
        suffix = 2

        while used_slugs.key?(slug)
          slug = "#{base_slug}-#{suffix}"
          suffix += 1
        end

        used_slugs[slug] = true
        tag_urls[tag] = "/#{dir}/#{slug}/"

        site.pages << TagPage.new(
          site,
          site.source,
          File.join(dir, slug),
          tag
        )
      end

      site.config['tag_urls'] = tag_urls
    end
  end

  class TagPage < Page
    def initialize(site, base, dir, tag)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'

      self.process(@name)
      self.read_yaml(
        File.join(base, '_layouts'),
        'tag.html'
      )

      self.data['tag'] = tag
      self.data['title'] = tag
    end
  end
end
