from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.dispatch import Signal
from .utils import generate_unique_slug_value
from .models import Projects, MyBlogSection
import logging

logger = logging.getLogger(__name__)

# Define the custom signal
migration_applied_signal = Signal()

@receiver(post_migrate)
def migration_applied_callback(sender, **kwargs):
    if sender.name == 'web_portal':
        project_queryset = Projects.objects.filter(slug__isnull = True)
        for obj in project_queryset:
            obj.slug = generate_unique_slug_value(obj.name)
            obj.save()
        
        
        blog_queryset = MyBlogSection.objects.filter(slug__isnull = True)
        for obj in blog_queryset:
            obj.slug = generate_unique_slug_value(obj.name)
            obj.save()


        migration_applied_signal.send(sender=sender)
