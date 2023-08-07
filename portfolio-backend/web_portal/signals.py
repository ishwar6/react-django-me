from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.dispatch import Signal
from .utils import generate_unique_slug_value
from .models import Projects, MyBlogSection
# Define the custom signal
migration_applied_signal = Signal()

@receiver(post_migrate)
def migration_applied_callback(sender, **kwargs):
    if sender.name == 'web_portal':
        project_queryset = Projects.objects.all()
        for obj in project_queryset:
            if not obj.slug:
                obj.slug = generate_unique_slug_value(obj.name)
                obj.save()
        
        
        blog_queryset = Projects.objects.all()
        for obj in blog_queryset:
            if not obj.slug:
                obj.slug = generate_unique_slug_value(obj.name)
                obj.save()


        migration_applied_signal.send(sender=sender)
