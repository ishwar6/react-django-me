"""
URL configuration for portfolio project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from web_portal.views import PortfolioView, BlogCommentsCreateView, BlogsGetView, ProjectsGetView,ContactMeCreateView
from web_portal.sitemaps import BlogSitemap, ProjectsSitemap

from django.contrib.sitemaps.views import sitemap

sitemaps = {
    'blogs': BlogSitemap,
    'projects': ProjectsSitemap,
}


urlpatterns = [
    path('api/admin/', admin.site.urls),
    path('api/home', PortfolioView.as_view(), name='home-page'),
    path('api/projects/<slug:slug>/', ProjectsGetView.as_view(), name='projects'),
    path('api/projects/', ProjectsGetView.as_view(), name='projects'),
    path('api/contact-me/', ContactMeCreateView.as_view(), name='contact-me'),
    path('api/blogs/', BlogsGetView.as_view(), name='my-blogs'),
    path('api/blogs/<slug:slug>/', BlogsGetView.as_view(), name='my-blogs'),
    path('api/blog-comments/<slug:slug>/', BlogCommentsCreateView.as_view(), name='blog-comments-create'),
    path('api/blog-comments/', BlogCommentsCreateView.as_view(), name='blog-comments-create'),
    path('api/sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),
]




if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)