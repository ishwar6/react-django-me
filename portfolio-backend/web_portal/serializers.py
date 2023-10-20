from rest_framework import serializers
from django.db.models import Q
# from .models import UploadedImage
from rest_framework.exceptions import ValidationError
from .models import (Navbar, HomeSection, AboutSection, EducationSection, ExperienceSection,  ServiceSections, 
                     SkillSection, Projects, MyBlogSection, ProjectDescription, ProjectSubheading, MyBlogSubheading, 
                     Skill, Services,BlogComments,ContactMe,YouTubeLinks, SocialMediaLinks, BlogDescription, YouTube,
                     HireMeSection)
import logging

logger = logging.getLogger(__name__)

class ContactMeSerializer(serializers.ModelSerializer):
    """
    Serializer for the ContactMe model.

    Attributes:
        None

    Example Usage:
        contact_me_data = {
            'name': 'John Doe',
            'email': 'john.doe@example.com',
            'subject': 'Inquiry',
            'message': 'Hello, I have a question...',
        }
        serializer = ContactMeSerializer(data=contact_me_data)
        if serializer.is_valid():
            contact_me_instance = serializer.save()
    """
    class Meta:
        model = ContactMe
        fields = '__all__'


class BlogCommentsSerializer(serializers.ModelSerializer):
    """
    Serializer for the BlogComments model.

    Attributes:
        None

    Example Usage:
        comment_data = {
            'author': 'John Doe',
            'comment': 'Great blog post!',
            'blog': 1,  # Assuming 1 is the ID of the related blog
        }
        serializer = BlogCommentsSerializer(data=comment_data)
        if serializer.is_valid():
            comment_instance = serializer.save()
    """
    class Meta:
        model = BlogComments
        fields = '__all__'
        ordering = ['-created_at']

class NavbarSerializer(serializers.ModelSerializer):
    """
    Serializer for the Navbar model.

    Attributes:
        None

    Example Usage:
        navbar_data = {
            'home': True,
            'about': True,
            'education': True,
            'experience': False,
            'services': False,
            'skills': True,
            'projects': False,
            'my_blog': True,
            'contact': True,
            'youtube': False,
            'social_media': True,
            'hire_me': True,
        }
        serializer = NavbarSerializer(data=navbar_data)
        if serializer.is_valid():
            navbar_instance = serializer.save()
    """
    class Meta:
        model = Navbar
        fields = ["home", "about", "education", "experience", "services", "skills", "projects", "my_blog", "contact", "youtube", 
                  "social_media", "hire_me", "youtube_icon", "leetcode_icon", "linkedin_icon", "github_icon"]


class HomeSectionSerializer(serializers.ModelSerializer):
    """
    Serializer for the HomeSection model.

    Attributes:
        None

    Example Usage:
        home_section_data = {
            'title': 'Welcome to My Website',
            'description': 'This is my home page...',
            'image': 'path/to/image.jpg',
            'created_at': '2023-07-28',
        }
        serializer = HomeSectionSerializer(data=home_section_data)
        if serializer.is_valid():
            home_section_instance = serializer.save()
    """
    class Meta:
        model = HomeSection
        fields = '__all__'


class AboutSectionSerializer(serializers.ModelSerializer):
    """
    Serializer for the AboutSection model.

    Attributes:
        None

    Example Usage:
        about_section_data = {
            'title': 'About Me',
            'description': 'I am a software developer...',
            'image': 'path/to/image.jpg',
        }
        serializer = AboutSectionSerializer(data=about_section_data)
        if serializer.is_valid():
            about_section_instance = serializer.save()
    """
    class Meta:
        model = AboutSection
        fields = '__all__'


class EducationSectionSerializer(serializers.ModelSerializer):
    """
    Serializer for the EducationSection model.

    Attributes:
        None

    Example Usage:
        education_section_data = {
            'institution': 'University of XYZ',
            'degree': 'Bachelor of Science',
            'major': 'Computer Science',
            'duration': '2019-20',
        }
        serializer = EducationSectionSerializer(data=education_section_data)
        if serializer.is_valid():
            education_section_instance = serializer.save()
    """
    class Meta:
        model = EducationSection
        fields = '__all__'


class ExperienceSectionSerializer(serializers.ModelSerializer):
    """
    Serializer for the ExperienceSection model.

    Attributes:
        None

    Example Usage:
        experience_section_data = {
            'position': 'Software Engineer',
            'company': 'ABC Tech Solutions',
            'description': 'Worked on various projects...',
            'duration': '2019-20',
        }
        serializer = ExperienceSectionSerializer(data=experience_section_data)
        if serializer.is_valid():
            experience_section_instance = serializer.save()
    """
    class Meta:
        model = ExperienceSection
        fields = '__all__'


class ServiceSectionsSerializer(serializers.ModelSerializer):
    """
    Serializer class for ServiceSections model.

    Serializes and deserializes ServiceSections model instances for API interaction.

    Attributes:
        Meta:
            model (ServiceSections): The ServiceSections model to be serialized/deserialized.
            fields (list): List of fields to include in the serialized data.
                           '__all__' includes all fields from the model.

    Example Usage:
        serializer = ServiceSectionsSerializer(data=request_data)
        if serializer.is_valid():
            serializer.save()
    """
    class Meta:
        model = ServiceSections
        fields = '__all__'


class ServicesSerializer(serializers.ModelSerializer):
    """
    Serializer class for Services model.

    Serializes and deserializes Services model instances for API interaction.

    Attributes:
        services (ServiceSectionsSerializer): A nested serializer for ServiceSections related to this service.

        Meta:
            model (Services): The Services model to be serialized/deserialized.
            fields (list): List of fields to include in the serialized data.
                           '__all__' includes all fields from the model.

    Example Usage:
        serializer = ServicesSerializer(data=request_data)
        if serializer.is_valid():
            serializer.save()
    """
    services = ServiceSectionsSerializer(many=True, read_only=True, source='service_sections')
    class Meta:
        model = Services
        fields = '__all__'


class SkillSectionSerializer(serializers.ModelSerializer):
    """
    Serializer class for SkillSection model.

    Serializes and deserializes SkillSection model instances for API interaction.

    Attributes:
        Meta:
            model (SkillSection): The SkillSection model to be serialized/deserialized.
            fields (list): List of fields to include in the serialized data.
                           '__all__' includes all fields from the model.

    Example Usage:
        serializer = SkillSectionSerializer(data=request_data)
        if serializer.is_valid():
            serializer.save()
    """
    class Meta:
        model = SkillSection
        fields = '__all__'


class SkillSerializer(serializers.ModelSerializer):
    """
    Serializer class for Skill model.

    Serializes and deserializes Skill model instances for API interaction.

    Attributes:
        skills (SkillSectionSerializer): A nested serializer for SkillSections related to this skill.

        Meta:
            model (Skill): The Skill model to be serialized/deserialized.
            fields (list): List of fields to include in the serialized data.
                           '__all__' includes all fields from the model.

    Example Usage:
        serializer = SkillSerializer(data=request_data)
        if serializer.is_valid():
            serializer.save()
    """
    skills = SkillSectionSerializer(many=True, read_only=True, source='skill_sections')
    class Meta:
        model = Skill
        fields = '__all__'


class ProjectSubheadingSerializer(serializers.ModelSerializer):
    """
    Serializer class for ProjectSubheading model.

    Serializes and deserializes ProjectSubheading model instances for API interaction.

    Attributes:
        Meta:
            model (ProjectSubheading): The ProjectSubheading model to be serialized/deserialized.
            fields (list): List of fields to include in the serialized data.
                           '__all__' includes all fields from the model.

    Example Usage:
        serializer = ProjectSubheadingSerializer(data=request_data)
        if serializer.is_valid():
            serializer.save()
    """
    class Meta:
        model = ProjectSubheading
        fields = '__all__'
        ordering = ['-created_at']


class ProjectDescriptionSerializer(serializers.ModelSerializer):
    """
    Serializer class for ProjectDescription model.

    Serializes and deserializes ProjectDescription model instances for API interaction.

    Attributes:
        Meta:
            model (ProjectDescription): The ProjectDescription model to be serialized/deserialized.
            fields (list): List of fields to include in the serialized data.
                           The specified field is ["description"].

    Example Usage:
        serializer = ProjectDescriptionSerializer(data=request_data)
        if serializer.is_valid():
            serializer.save()
    """
    class Meta:
        model = ProjectDescription
        fields = ["description"]


class ProjectsSerializer(serializers.ModelSerializer):
    """
    Serializer class for Projects model.

    Serializes and deserializes Projects model instances for API interaction.

    Attributes:
        subheadings (ProjectSubheadingSerializer): A nested serializer for ProjectSubheadings related to this project.

        Meta:
            model (Projects): The Projects model to be serialized/deserialized.
            fields (list): List of fields to include in the serialized data.
                           '__all__' includes all fields from the model.

    Example Usage:
        serializer = ProjectsSerializer(data=request_data)
        if serializer.is_valid():
            serializer.save()
    """
    class Meta:
        model = Projects
        fields = '__all__'
        ordering = ['-created_at']
    

    def to_representation(self, instance):
        subheadings_queryset = instance.projects_subheadings.all() 
        subheadings_serializer = ProjectSubheadingSerializer(subheadings_queryset, many=True)

        representation = super().to_representation(instance)
        representation['subheadings'] = subheadings_serializer.data
        return representation


class MyBlogSubheadingSerializer(serializers.ModelSerializer):
    """
    Serializer class for MyBlogSubheading model.

    Serializes and deserializes MyBlogSubheading model instances for API interaction.

    Attributes:
        Meta:
            model (MyBlogSubheading): The MyBlogSubheading model to be serialized/deserialized.
            fields (list): List of fields to include in the serialized data.
                           '__all__' includes all fields from the model.

    Example Usage:
        serializer = MyBlogSubheadingSerializer(data=request_data)
        if serializer.is_valid():
            serializer.save()
    """
    class Meta:
        model = MyBlogSubheading
        fields = '__all__'
        ordering = ['-created_at']


class MyBlogSectionSerializer(serializers.ModelSerializer):
    """
    Serializer class for MyBlogSection model.

    Serializes and deserializes MyBlogSection model instances for API interaction.

    Attributes:
        subheadings (ProjectSubheadingSerializer): A nested serializer for ProjectSubheadings related to this MyBlogSection.

        Meta:
            model (MyBlogSection): The MyBlogSection model to be serialized/deserialized.
            fields (list): List of fields to include in the serialized data.

    Example Usage:
        serializer = MyBlogSectionSerializer(data=request_data)
        if serializer.is_valid():
            serializer.save()
    """
    tags = serializers.SlugRelatedField(
        many=True,
        slug_field='name', 
        read_only=True
    )
    
    
    class Meta:
        model = MyBlogSection
        fields = '__all__'
        ordering = ['-created_at']
    
    def to_representation(self, instance):
        subheadings_queryset = instance.MyBlog_subheadings.all()  
        subheadings_serializer = MyBlogSubheadingSerializer(subheadings_queryset, many=True)

        representation = super().to_representation(instance)
        representation['subheadings'] = subheadings_serializer.data
        return representation

class BlogDescriptionSerializer(serializers.ModelSerializer):
    """
    Serializer class for BlogDescription model.

    Serializes and deserializes BlogDescription model instances for API interaction.

    Attributes:
        Meta:
            model (BlogDescription): The BlogDescription model to be serialized/deserialized.
            fields (list): List of fields to include in the serialized data.
                           '__all__' includes all fields from the model.

    Example Usage:
        serializer = BlogDescriptionSerializer(data=request_data)
        if serializer.is_valid():
            serializer.save()
    """
    class Meta:
        model = BlogDescription
        fields = '__all__'



class YouTubeLinksSerializer(serializers.ModelSerializer):
    """
    Serializer class for YouTubeLinks model.

    Serializes and deserializes YouTubeLinks model instances for API interaction.

    Attributes:
        Meta:
            model (YouTubeLinks): The YouTubeLinks model to be serialized/deserialized.
            fields (list): List of fields to include in the serialized data.
                           '__all__' includes all fields from the model.

    Example Usage:
        serializer = YouTubeLinksSerializer(data=request_data)
        if serializer.is_valid():
            serializer.save()
    """
    class Meta:
        model = YouTubeLinks
        fields = '__all__'


class YouTubeSerializer(serializers.ModelSerializer):
    """
    Serializer class for YouTube model.

    Serializes and deserializes YouTube model instances for API interaction.

    Attributes:
        youtube_links (SerializerMethodField): A method field that returns a filtered and serialized queryset
                                              of related YouTubeLinks.

        Meta:
            model (YouTube): The YouTube model to be serialized/deserialized.
            fields (list): List of fields to include in the serialized data.
                           '__all__' includes all fields from the model.

    Example Usage:
        serializer = YouTubeSerializer(data=request_data)
        if serializer.is_valid():
            serializer.save()
    """
    youtube_links = serializers.SerializerMethodField()

    class Meta:
        model = YouTube
        fields = '__all__'

    def get_youtube_links(self, youtube_instance):
        # Retrieve the related youtube_links queryset
        youtube_links_queryset = youtube_instance.youtube_links

        filtered_links = youtube_links_queryset.filter(
            Q(is_main=True) | Q(is_main=False)
        ).order_by('-is_main', '-created_at')[:6]

        # Serialize the filtered queryset using YouTubeLinksSerializer
        return YouTubeLinksSerializer(filtered_links, many=True).data


class SocialMediaLinksSerializer(serializers.ModelSerializer):
    """
    Serializer class for SocialMediaLinks model.

    Serializes and deserializes SocialMediaLinks model instances for API interaction.

    Attributes:
        Meta:
            model (SocialMediaLinks): The SocialMediaLinks model to be serialized/deserialized.
            fields (list): List of fields to include in the serialized data.
                           '__all__' includes all fields from the model.

    Example Usage:
        serializer = SocialMediaLinksSerializer(data=request_data)
        if serializer.is_valid():
            serializer.save()
    """
    class Meta:
        model = SocialMediaLinks
        fields = '__all__'


class HireMeSectionSerializer(serializers.ModelSerializer):
    """
    Serializer class for HireMeSection model.

    Serializes and deserializes HireMeSection model instances for API interaction.

    Attributes:
        Meta:
            model (HireMeSection): The HireMeSection model to be serialized/deserialized.
            fields (list): List of fields to include in the serialized data.
                           '__all__' includes all fields from the model.

    Example Usage:
        serializer = HireMeSectionSerializer(data=request_data)
        if serializer.is_valid():
            serializer.save()
    """
    class Meta:
        model = HireMeSection
        fields = '__all__'



class PortfolioSerializer(serializers.ModelSerializer):
    """
    Serializer class for Portfolio model.

    Serializes and deserializes Portfolio model instances for API interaction.
    This serializer provides a nested representation of related sections like home_section,
    skills_section, services_section, projects_section, blogs_section, about_section,
    education_section, experience_section, sections, social_media_links, youtube_videos_link,
    and hire_me_section.

    Attributes:
        home_section (SerializerMethodField): A method field that returns the serialized data of related HomeSection objects.
        skills_section (SerializerMethodField): A method field that returns the serialized data of related Skill objects.
        services_section (SerializerMethodField): A method field that returns the serialized data of related Services object.
        projects_section (SerializerMethodField): A method field that returns the serialized data of related Projects objects.
        blogs_section (SerializerMethodField): A method field that returns the serialized data of related MyBlogSection objects.
        about_section (SerializerMethodField): A method field that returns the serialized data of related AboutSection object.
        education_section (SerializerMethodField): A method field that returns the serialized data of related EducationSection objects.
        experience_section (SerializerMethodField): A method field that returns the serialized data of related ExperienceSection objects.
        sections (SerializerMethodField): A method field that returns the serialized data of related Navbar object.
        social_media_links (SerializerMethodField): A method field that returns the serialized data of related SocialMediaLinks object.
        youtube_videos_link (SerializerMethodField): A method field that returns the serialized data of related YouTube object.
        hire_me_section (SerializerMethodField): A method field that returns the serialized data of related HireMeSection object.

        Meta:
            model (Navbar): The Navbar model to be serialized/deserialized.
            fields (list): List of fields to include in the serialized data.

    Example Usage:
        serializer = PortfolioSerializer(data=request_data)
        if serializer.is_valid():
            serializer.save()
    """
    home_section = serializers.SerializerMethodField()
    skills_section = serializers.SerializerMethodField()
    services_section = serializers.SerializerMethodField()
    projects_section = serializers.SerializerMethodField()
    blogs_section = serializers.SerializerMethodField()
    about_section = serializers.SerializerMethodField()
    education_section = serializers.SerializerMethodField()
    experience_section = serializers.SerializerMethodField()
    sections = serializers.SerializerMethodField()
    social_media_links = serializers.SerializerMethodField()
    youtube_videos_link = serializers.SerializerMethodField()
    hire_me_section = serializers.SerializerMethodField()


    class Meta:
        model = Navbar
        fields = ["nav_name", "sections", 'home_section', "about_section", "education_section", "experience_section", "skills_section", "services_section",
                "projects_section", "blogs_section","hire_me_section","social_media_links", "youtube_videos_link"]
    
    def get_hire_me_section(self, navbar):
        available_to_hire = navbar.hire_me
        if available_to_hire:
            home_section = HireMeSection.objects.first()
            return HireMeSectionSerializer(home_section).data
        return False


    def get_social_media_links(self, navbar):
        social_media_status = navbar.social_media
        if social_media_status:
            home_section = SocialMediaLinks.objects.first()
            return SocialMediaLinksSerializer(home_section).data
        return False
    
    def get_youtube_videos_link(self, navbar):
        youtube_link_status = navbar.youtube
        if youtube_link_status:
            home_section = YouTube.objects.first()
            return YouTubeSerializer(home_section).data
        return False

    def get_sections(self, navbar):
        return NavbarSerializer(navbar).data

    def get_experience_section(self, navbar):
        experience_status = navbar.experience
        if experience_status:
            home_section = ExperienceSection.objects.all().order_by('-created_at')
            return ExperienceSectionSerializer(home_section, many=True).data
        return False

    def get_education_section(self, navbar):
        education_status = navbar.education
        if education_status:
            home_section = EducationSection.objects.all().order_by('-created_at')
            return EducationSectionSerializer(home_section, many=True).data
        return False

    def get_about_section(self, navbar):
        about_status = navbar.about
        if about_status:
            home_section = AboutSection.objects.first()
            return AboutSectionSerializer(home_section).data
        return False

    def get_blogs_section(self, navbar):
        blogs_status = navbar.my_blog
        if blogs_status:
            data = {}
            descript_data =  BlogDescription.objects.first()
            data = BlogDescriptionSerializer(descript_data).data
            home_section = MyBlogSection.objects.filter(
                Q(is_main=True) | Q(is_main=False)
            ).order_by('-is_main', '-created_at')[:6]
            data["my_blog"] = MyBlogSectionSerializer(home_section, many=True).data
            return data
        return False

    def get_projects_section(self, navbar):
        project_status = navbar.projects
        if project_status:
            data = {}
            descript_data =  ProjectDescription.objects.first()
            data = ProjectDescriptionSerializer(descript_data).data
            home_section = Projects.objects.filter(
                Q(is_main=True) | Q(is_main=False)
            ).order_by('-is_main', '-created_at')[:6]
            data["projects"] =  ProjectsSerializer(home_section, many=True).data
            return data
        return False

    def get_services_section(self, navbar):
        service_status = navbar.services
        if service_status:
            home_section = Services.objects.first()
            return ServicesSerializer(home_section).data
        return False

    def get_skills_section(self, navbar):
        skill_status = navbar.skills
        if skill_status:
            home_section = Skill.objects.first()
            return SkillSerializer(home_section).data
        return False

    def get_home_section(self, navbar):
        home_status = navbar.home
        if home_status:
            home_section = HomeSection.objects.all().order_by('-created_at')[:3]
            return HomeSectionSerializer(home_section, many=True).data
        return False



class AboutBlogSerializer(serializers.ModelSerializer):
    """
    Serializer class for AboutSection model.

    Serializes and deserializes AboutSection model instances for API interaction.
    This serializer includes only the 'name', 'description', and 'file' fields from the model.

    Attributes:
        Meta:
            model (AboutSection): The AboutSection model to be serialized/deserialized.
            fields (list): List of fields to include in the serialized data.
                           'name', 'description', and 'file' fields are included in this serializer.

    Example Usage:
        serializer = AboutBlogSerializer(data=request_data)
        if serializer.is_valid():
            serializer.save()
    """
    class Meta:
        model = AboutSection
        fields = ['name', "description", "file"]


class SingleBlogSectionSerializer(serializers.ModelSerializer):
    """
    Serializer for MyBlogSection model.

    This serializer serializes the MyBlogSection model and includes all fields. Additionally,
    it includes the subheadings associated with the MyBlogSection as read-only.

    Model:
        MyBlogSection

    Fields:
        All fields from the MyBlogSection model are included.
        subheadings (read-only): Serialized representation of related MyBlogSubheading objects.
        about (read-only): Serialized representation of the first AboutSection object.

    Example:
        data = {
            'id': 1,
            'title': 'Sample Section',
            'content': 'This is a sample section content.',
            'subheadings': [
                {
                    'id': 1,
                    'title': 'Subheading 1',
                    'content': 'Content of Subheading 1',
                    ...
                },
                {
                    'id': 2,
                    'title': 'Subheading 2',
                    'content': 'Content of Subheading 2',
                    ...
                },
                ...
            ],
            ...
        }
        serializer = SingleBlogSectionSerializer(data=data)
        if serializer.is_valid():
            serialized_data = serializer.data

    Methods:
        get_all_tags(obj): A method that returns a list of all unique tag names associated with MyBlogSection.
        get_about(obj): A method that returns the serialized representation of the first AboutSection object.
    """

    about = serializers.SerializerMethodField()
    tags = serializers.SlugRelatedField(
        many=True,
        slug_field='name', 
        read_only=True
    )
    all_tags = serializers.SerializerMethodField()
    subheadings = MyBlogSubheadingSerializer(many=True, read_only=True, source='MyBlog_subheadings')
    class Meta:
        model = MyBlogSection
        fields = '__all__'

    def get_all_tags(self, obj):
        all_tags = MyBlogSection.tags.all()
        return list(all_tags.values_list('name', flat=True).distinct())

    def get_about(self, obj):
        data = AboutSection.objects.first()
        return AboutBlogSerializer(data).data
    

class FooterSerializer(serializers.ModelSerializer):
    about = serializers.SerializerMethodField()
    sections = serializers.SerializerMethodField()
    social_media_links = serializers.SerializerMethodField()

    class Meta:
        model = Navbar
        fields = ["nav_name","sections", "about", "social_media_links"]
    
    def get_about(self, obj):
        about_status = obj.about
        if about_status:
            home_section = AboutSection.objects.first()
            return AboutSectionSerializer(home_section).data
        return False

    def get_sections(self, navbar):
        return NavbarSerializer(navbar).data

    def get_social_media_links(self, navbar):
        social_media_status = navbar.social_media
        if social_media_status:
            home_section = SocialMediaLinks.objects.first()
            return SocialMediaLinksSerializer(home_section).data
        return False
   

