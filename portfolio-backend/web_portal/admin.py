from django.contrib import admin
from django import forms
from django.core.exceptions import ValidationError
import re
from PIL import Image
from django.core.validators import URLValidator
import logging

logger = logging.getLogger(__name__)
# Register your models here.
from .models import (Projects, ProjectSubheading, MyBlogSubheading, MyBlogSection, Projects, HomeSection, Navbar, Skill, Services, 
                     ServiceSections, SkillSection, AboutSection, ProjectDescription, EducationSection, ExperienceSection, 
                     ContactMe, BlogComments, YouTubeLinks, SocialMediaLinks, BlogDescription, HireMeSection, YouTube, MetaDetails)


admin.site.register(MetaDetails)

class SkillSectionInline(admin.TabularInline):
    """
        Inline Admin for SkillSection model.

        This inline admin allows adding and editing SkillSection objects within the SkillAdmin page.

        Model:
            SkillSection

        Fields:
            All fields from the SkillSection model are displayed in a tabular format.

        Example:
            Admin page for SkillAdmin with inline editing of SkillSection objects.
    """
    model = SkillSection
    extra = 1

class SkillAdmin(admin.ModelAdmin):
    """
        Admin for Skill model.

        This admin allows managing Skill objects and includes an inline admin for SkillSection objects.

        Model:
            Skill

        Inline:
            SkillSectionInline

        Example:
            Admin page for managing Skill objects with inline editing of SkillSection objects.
    """
    inlines = [SkillSectionInline]
    list_display = ('id', "description",)

admin.site.register(Skill, SkillAdmin)

class ServiceSectionsForm(forms.ModelForm):
    class Meta:
        model = ServiceSections
        fields = '__all__'

    def clean_file(self):
        file = self.cleaned_data.get('file', False)
        if file:
            ext = file.name.split('.')[-1].lower()
            if ext not in ['jpg', 'jpeg']:
                raise forms.ValidationError("Only JPG and JPEG files are allowed.")
            
            # Validate aspect ratio
            img = Image.open(file)
            width, height = img.size

            aspect_ratio = width / height
            min_valid_aspect_ratio = 1 - 0.01
            max_valid_aspect_ratio = 1 + 0.01

            if not (min_valid_aspect_ratio <= aspect_ratio <= max_valid_aspect_ratio):
                raise forms.ValidationError("Invalid aspect ratio. Please upload an image with a 1:1 aspect ratio.")
        return file

class ServiceSectionsInline(admin.TabularInline):
    """
        Inline Admin for ServiceSections model.

        This inline admin allows adding and editing ServiceSections objects within the ServiceAdmin page.

        Model:
            ServiceSections

        Fields:
            All fields from the ServiceSections model are displayed in a tabular format.

        Example:
            Admin page for ServiceAdmin with inline editing of ServiceSections objects.
    """
    model = ServiceSections
    extra = 1

class ServiceAdmin(admin.ModelAdmin):
    inlines = [ServiceSectionsInline]
    list_display = ('id', "description",)
    form = ServiceSectionsForm 


admin.site.register(Services, ServiceAdmin)



class YouTubeLinkForm(forms.ModelForm):
    class Meta:
        model = YouTubeLinks
        fields = '__all__'

    def clean_link(self):
        link = self.cleaned_data.get('link')
        if link:
            # Regular expression to match valid YouTube links
            youtube_pattern = re.compile(r'^https://www.youtube.com/embed/[a-zA-Z0-9_-]{11}$')
            if not youtube_pattern.match(link):
                raise ValidationError("Please enter a valid YouTube link.")
        return link
    
class YouTubeForm(forms.ModelForm):
    class Meta:
        model = YouTube
        fields = '__all__'
    
    def clean_youtube_channel_link(self):
        link = self.cleaned_data.get('youtube_channel_link')
        if link:
            # Regular expression to match valid YouTube channel links
            youtube_pattern = re.compile(r'^https?://(www\.)?youtube\.com/channel/.+$|^https?://(www\.)?youtube\.com/user/.+$')
            if not youtube_pattern.match(link):
                raise ValidationError("Please enter a valid YouTube channel link.")
        return link

class YouTubeLinksInline(admin.TabularInline):
    model = YouTubeLinks
    form = YouTubeLinkForm
    extra = 1
    
class YouTubeLinksAdmin(admin.ModelAdmin):
    inlines = [YouTubeLinksInline]
    form = YouTubeForm
    list_display = ('id', "description", "youtube_channel_link",)

admin.site.register(YouTube, YouTubeLinksAdmin)






class HomeSectionForm(forms.ModelForm):
    class Meta:
        model = HomeSection
        fields = '__all__'

    def clean_file(self):
        file = self.cleaned_data.get('file', False)
        if file:
            ext = file.name.split('.')[-1].lower()
            if ext not in ['jpg', 'jpeg']:
                raise forms.ValidationError("Only JPG and JPEG files are allowed.")
            # Validate aspect ratio
            img = Image.open(file)
            width, height = img.size

            aspect_ratio = width / height
            min_valid_aspect_ratio = 3 / 2 - 0.01
            max_valid_aspect_ratio = 3 / 2 + 0.01

            if not (min_valid_aspect_ratio <= aspect_ratio <= max_valid_aspect_ratio):
                raise forms.ValidationError("Invalid aspect ratio. Please upload an image with a 3:2 aspect ratio.")
        return file

class HomeSectionAdmin(admin.ModelAdmin):
    form = HomeSectionForm
    list_display = ('id', "greeting_text", "main_text", "sub_text", "file", "is_button_available", "button_text",)

admin.site.register(HomeSection, HomeSectionAdmin)



class AboutSectionForm(forms.ModelForm):
    class Meta:
        model = AboutSection
        fields = '__all__'

    def clean_file(self):
        file = self.cleaned_data.get('file', False)
        if file:
            ext = file.name.split('.')[-1].lower()
            if ext not in ['jpg', 'jpeg']:
                raise forms.ValidationError("Only JPG and JPEG files are allowed.")
            # Validate aspect ratio
            img = Image.open(file)
            width, height = img.size

            aspect_ratio = width / height
            min_valid_aspect_ratio = 4 / 5 - 0.01
            max_valid_aspect_ratio = 4 / 5 + 0.01

            if not (min_valid_aspect_ratio <= aspect_ratio <= max_valid_aspect_ratio):
                raise forms.ValidationError("Invalid aspect ratio. Please upload an image with a 4:5 aspect ratio.")
        return file

class AboutSectionAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'date_of_birth', 'address', 'email', 'phone', 'website',)
    form = AboutSectionForm


admin.site.register(AboutSection, AboutSectionAdmin)




class MyBlogSubheadingForm(forms.ModelForm):
    class Meta:
        model = MyBlogSubheading
        fields = '__all__'

    def clean_file(self):
        file = self.cleaned_data.get('file', False)
        if file:
            ext = file.name.split('.')[-1].lower()
            if ext not in ['jpg', 'jpeg']:
                raise forms.ValidationError("Only JPG and JPEG files are allowed.")
            # Validate aspect ratio
            img = Image.open(file)
            width, height = img.size

            aspect_ratio = width / height
            min_valid_aspect_ratio = 4 / 3 - 0.01
            max_valid_aspect_ratio = 4 / 3 + 0.01

            if not (min_valid_aspect_ratio <= aspect_ratio <= max_valid_aspect_ratio):
                raise forms.ValidationError("Invalid aspect ratio. Please upload an image with a 4:3 aspect ratio.")
        return file
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['file'].help_text = "Upload an image with a 4:3 aspect ratio in JPG or JPEG format."

class MyBlogSectionForm(forms.ModelForm):
    class Meta:
        model = MyBlogSection
        fields = '__all__'

    def clean_file(self):
        file = self.cleaned_data.get('file', False)
        if file:
            ext = file.name.split('.')[-1].lower()
            if ext not in ['jpg', 'jpeg']:
                raise forms.ValidationError("Only JPG and JPEG files are allowed.")
            
            # Validate aspect ratio
            img = Image.open(file)
            width, height = img.size

            aspect_ratio = width / height
            min_valid_aspect_ratio = 1 - 0.01
            max_valid_aspect_ratio = 1 + 0.01

            if not (min_valid_aspect_ratio <= aspect_ratio <= max_valid_aspect_ratio):
                raise forms.ValidationError("Invalid aspect ratio. Please upload an image with a 1:1 aspect ratio.")
        return file

from django.utils.safestring import mark_safe
class MyBlogSubheadingInline(admin.TabularInline):
    model = MyBlogSubheading
    form = MyBlogSubheadingForm
    extra = 1

class MyBlogSectionAdmin(admin.ModelAdmin):
    inlines = [MyBlogSubheadingInline]
    form = MyBlogSectionForm 
    list_display = ('id', "name", "slug","service", "description", "is_main", "file", "comment_count",)

admin.site.register(MyBlogSection, MyBlogSectionAdmin)



class ProjectSubheadingForm(forms.ModelForm):
    class Meta:
        model = ProjectSubheading
        fields = '__all__'

    def clean_file(self):
        file = self.cleaned_data.get('file', False)
        if file:
            ext = file.name.split('.')[-1].lower()
            if ext not in ['jpg', 'jpeg']:
                raise forms.ValidationError("Only JPG and JPEG files are allowed.")
            # Validate aspect ratio
            img = Image.open(file)
            width, height = img.size

            aspect_ratio = width / height
            min_valid_aspect_ratio = 4 / 3 - 0.01
            max_valid_aspect_ratio = 4 / 3 + 0.01

            if not (min_valid_aspect_ratio <= aspect_ratio <= max_valid_aspect_ratio):
                raise forms.ValidationError("Invalid aspect ratio. Please upload an image with a 4:3 aspect ratio.")
        return file

class ProjectsForm(forms.ModelForm):
    class Meta:
        model = Projects
        fields = '__all__'

    def clean_file(self):
        file = self.cleaned_data.get('file', False)
        if file:
            ext = file.name.split('.')[-1].lower()
            if ext not in ['jpg', 'jpeg']:
                raise forms.ValidationError("Only JPG and JPEG files are allowed.")
            
            # Validate aspect ratio
            img = Image.open(file)
            width, height = img.size

            aspect_ratio = width / height
            min_valid_aspect_ratio = 1 - 0.01
            max_valid_aspect_ratio = 1 + 0.01

            if not (min_valid_aspect_ratio <= aspect_ratio <= max_valid_aspect_ratio):
                raise forms.ValidationError("Invalid aspect ratio. Please upload an image with a 1:1 aspect ratio.")
        return file    

class ProjectSubheadingInline(admin.TabularInline):
    model = ProjectSubheading
    extra = 1
    form = ProjectSubheadingForm 

class ProjectsAdmin(admin.ModelAdmin):
    inlines = [ProjectSubheadingInline]
    form = ProjectsForm 
    list_display = ('id', "name", "slug", "service", "description", "is_main", "file",)
    def clean(self, form):
        cleaned_data = super().clean()

        name = cleaned_data.get('name')
        service = cleaned_data.get('service')

        if name and service and name.lower() == service.lower():
            raise forms.ValidationError("Name and Service cannot be the same.")

        return cleaned_data
    
admin.site.register(Projects, ProjectsAdmin)



class SocialMediaLinksForm(forms.ModelForm):
    class Meta:
        model = SocialMediaLinks
        fields = '__all__'

    def validate_social_media_link(self, link, social_media_name):
        pattern = {
            'instagram': r'^https?:\/\/(?:www\.)?instagram\.com\/[a-zA-Z0-9_]+\/?$',
            'twitter': r'^https?:\/\/(?:www\.)?twitter\.com\/[a-zA-Z0-9_]+(?:\/|$)',
            'youtube': r'^https?:\/\/(?:www\.)?youtube\.com\/(?:c\/[a-zA-Z0-9_]+|channel\/[a-zA-Z0-9_]+)\/?$',
            'linkedin': r'^https?:\/\/(?:www\.)?linkedin\.com\/(?:[a-zA-Z]{2}\/)?(?:in\/)?[a-zA-Z0-9_-]+(?:\/|$)',
            'github': r'^https?:\/\/(?:www\.)?github\.com\/[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+)?\/?$',
            'facebook': r'^https?:\/\/(?:www\.)?facebook\.com\/(?:[a-zA-Z0-9_.-]+\/)?(?:pages\/)?[a-zA-Z0-9_.-]+\/?$',
        }


        if link and not re.match(pattern[social_media_name], link):
            raise ValidationError(f"Enter a valid {social_media_name.capitalize()} link.")

        return link

    def clean_instagram(self):
        return self.validate_social_media_link(self.cleaned_data.get('instagram'), 'instagram')

    def clean_twitter(self):
        return self.validate_social_media_link(self.cleaned_data.get('twitter'), 'twitter')

    def clean_youtube(self):
        return self.validate_social_media_link(self.cleaned_data.get('youtube'), 'youtube')

    def clean_linkedin(self):
        return self.validate_social_media_link(self.cleaned_data.get('linkedin'), 'linkedin')

    def clean_github(self):
        return self.validate_social_media_link(self.cleaned_data.get('github'), 'github')

    def clean_facebook(self):
        return self.validate_social_media_link(self.cleaned_data.get('facebook'), 'facebook')

class SocialMediaLinksAdmin(admin.ModelAdmin):
    form = SocialMediaLinksForm
    list_display = ('id', "instagram", "twitter", "youtube", "linkedin", "github", "facebook",)

admin.site.register(SocialMediaLinks, SocialMediaLinksAdmin)



class EducationSectionAdmin(admin.ModelAdmin):
    list_display = ('id', "duration", "degree", "institution", "description",)
admin.site.register(EducationSection, EducationSectionAdmin)


class ExperienceSectionAdmin(admin.ModelAdmin):
    list_display = ('id', "duration", "company", "position", "description",)
admin.site.register(ExperienceSection, ExperienceSectionAdmin)


class NavbarAdmin(admin.ModelAdmin):
    list_display = ('id', "nav_name", "home", "about", "skills", "services", "experience", "education", "projects", "my_blog", "contact", "receive_mail", "youtube", "social_media", "hire_me",)
admin.site.register(Navbar, NavbarAdmin)


class ProjectDescriptionAdmin(admin.ModelAdmin):
    list_display = ('id', "description",)
admin.site.register(ProjectDescription, ProjectDescriptionAdmin)


class ContactMeAdmin(admin.ModelAdmin):
    list_display = ('id', "name", "message", "subject", "email", "is_mail_sent",)
admin.site.register(ContactMe, ContactMeAdmin)


class BlogCommentsAdmin(admin.ModelAdmin):
    list_display = ('id', "name", "message", "email", "my_blog",)
admin.site.register(BlogComments, BlogCommentsAdmin)


class BlogDescriptionAdmin(admin.ModelAdmin):
    list_display = ('id', "description",)
admin.site.register(BlogDescription, BlogDescriptionAdmin)

class HireMeSectionForm(forms.ModelForm):
    class Meta:
        model = HireMeSection
        fields = '__all__'

    def clean_file(self):
        file = self.cleaned_data.get('file', False)
        if file:
            ext = file.name.split('.')[-1].lower()
            if ext not in ['jpg', 'jpeg']:
                raise forms.ValidationError("Only JPG and JPEG files are allowed.")
            # Validate aspect ratio
            img = Image.open(file)
            width, height = img.size

            aspect_ratio = width / height
            min_valid_aspect_ratio = 16 / 9 - 0.01
            max_valid_aspect_ratio = 16 / 9 + 0.01

            if not (min_valid_aspect_ratio <= aspect_ratio <= max_valid_aspect_ratio):
                raise forms.ValidationError("Invalid aspect ratio. Please upload an image with a 16:9 aspect ratio.")

        return file

class HireMeSectionAdmin(admin.ModelAdmin):
    form = HireMeSectionForm
    list_display = ('id', 'main_text', 'description', 'is_button_available', 'button_text', 'file',)

admin.site.register(HireMeSection, HireMeSectionAdmin)