
from django.contrib.sitemaps import Sitemap
from .models import MyBlogSection, Projects
import logging

logger = logging.getLogger(__name__)
class BlogSitemap(Sitemap):
    changefreq = 'daily'
    priority = 0.9

    def items(self):
        return MyBlogSection.objects.all()

    def lastmod(self, obj):
        return obj.updated_at
    

class ProjectsSitemap(Sitemap):
    changefreq = 'daily'
    priority = 0.9

    def items(self):
        return Projects.objects.all()

    def lastmod(self, obj):
        return obj.updated_at