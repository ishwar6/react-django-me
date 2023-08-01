from django.db import models

from django.db import models
from django.core.validators import EmailValidator
from taggit.managers import TaggableManager
from django.core.validators import RegexValidator
import os
import uuid
from django.core.exceptions import ValidationError
from django.core.validators import MaxLengthValidator
from django.utils import timezone
import re
from .utils import send_email
# Create your models here.


class BaseModelMixin(models.Model):
    """
        A base model mixin providing common fields for created_at and updated_at timestamps.

        Attributes:
            created_at (DateTimeField): The timestamp for when the object was created.
            updated_at (DateTimeField): The timestamp for when the object was last updated.

        Meta:
            abstract (bool): Set to True to indicate that this is an abstract model.
                            It will not be created as a separate database table.
    """

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class SingleObjectManager(models.Manager):
    """
        A custom manager that ensures only one object can be created.

        This manager extends the default Django Manager and adds a constraint
        to allow only a single object to be created in the associated model.

        Note:
            Make sure to use this manager with a model where you want to restrict
            the creation of multiple objects.

        Example Usage:
            class MySingletonModel(models.Model):
                name = models.CharField(max_length=100)

                objects = SingleObjectManager()

        Methods:
            create(**kwargs): Create a new object if no object already exists,
                            otherwise raise a ValueError indicating that only
                            one object is allowed.

        Raises:
            ValueError: If an object already exists in the model.
    """
    def create(self, **kwargs):
        if self.exists():
            raise ValueError("Only one object is allowed.")
        return super(SingleObjectManager, self).create(**kwargs)


class Navbar(BaseModelMixin):
    """
        Model representing the navigation bar configuration.

        This model stores the configuration for the navigation bar, including the names of different
        sections and whether they should be displayed in the navigation bar or not.

        Attributes:
            nav_name (CharField): The name of the navigation bar.
            home (BooleanField): Whether to display the 'Home' section in the navigation bar.
            about (BooleanField): Whether to display the 'About' section in the navigation bar.
            skills (BooleanField): Whether to display the 'Skills' section in the navigation bar.
            services (BooleanField): Whether to display the 'Services' section in the navigation bar.
            experience (BooleanField): Whether to display the 'Experience' section in the navigation bar.
            education (BooleanField): Whether to display the 'Education' section in the navigation bar.
            projects (BooleanField): Whether to display the 'Projects' section in the navigation bar.
            my_blog (BooleanField): Whether to display the 'My Blog' section in the navigation bar.
            contact (BooleanField): Whether to display the 'Contact' section in the navigation bar.
            receive_mail (BooleanField): Whether to display the 'Receive Mail' section in the navigation bar.
            youtube_link (BooleanField): Whether to display the 'YouTube Link' section in the navigation bar.
            social_media (BooleanField): Whether to display the 'Social Media' section in the navigation bar.

        Manager:
            objects (SingleObjectManager): A custom manager to ensure only one object is allowed.

        Methods:
            save(*args, **kwargs): Override the save method to prevent more than one object from being saved.

        Raises:
            ValueError: If an object already exists when trying to save a new object.

        Example Usage:
            nav = Navbar.objects.create(
                nav_name="Main Navbar",
                home=True,
                about=True,
                skills=True,
                services=True,
                experience=True,
                education=True,
                projects=True,
                my_blog=True,
                contact=True,
                receive_mail=True,
                youtube_link=True,
                social_media=True,
                hire_me=True,
            )
    """
    nav_name = models.CharField(max_length=50, null=False, blank=False)
    home = models.BooleanField(default=False)
    about = models.BooleanField(default=False)
    skills = models.BooleanField(default=False)
    services = models.BooleanField(default=False)
    experience = models.BooleanField(default=False)
    education = models.BooleanField(default=False)
    projects = models.BooleanField(default=False)
    my_blog = models.BooleanField(default=False)
    contact = models.BooleanField(default=False)
    receive_mail = models.BooleanField(default=False)
    youtube = models.BooleanField(default=False)
    social_media = models.BooleanField(default=False)
    hire_me = models.BooleanField(default=False)

    objects = SingleObjectManager()

    def save(self, *args, **kwargs):
        if self.pk is None and Navbar.objects.exists():
            raise ValueError("Only one object is allowed.")
        super(Navbar, self).save(*args, **kwargs)


def unique_home_filename(instance, filename):
    # Get the file's extension
    ext = filename.split('.')[-1]
    # Generate a unique filename using a UUID
    unique_name = f"{uuid.uuid4().hex}.{ext}"
    # Return the unique filename
    return os.path.join('home/', unique_name)


class HomeSection(BaseModelMixin):
    """
        Model representing the home section configuration.

        This model stores the configuration for the home section, including the greeting text,
        main text, subtext, and an optional file (e.g., image).

        Attributes:
            greeting_text (CharField): The greeting text to display in the home section.
            main_text (CharField): The main text to be displayed in the home section.
            sub_text (CharField): The subtext to be displayed in the home section (optional).
            file (FileField): An optional file to be uploaded and displayed in the home section.
                            Only JPG and JPEG files are allowed.

        Methods:
            save(*args, **kwargs): Override the save method to process the main_text and sub_text
                                and surround dynamic words with <span> tags.

        Example Usage:
            home = HomeSection.objects.create(
                greeting_text="HELLO!",
                main_text='Welcome to our "amazing" website!',
                sub_text='Discover the "innovative" solutions we offer.',
                file=<file_object>,  # Replace <file_object> with the actual file object.
            )
    """
    greeting_text = models.CharField(max_length=50, default="HELLO!")
    main_text = models.CharField(max_length=255, null=False, blank=False,
        help_text='To design the specific words please use "double quote".')
    sub_text = models.CharField(max_length=255, blank=True, null=True,
        help_text='To design the specific words please use "double quote".')
    file = models.FileField(upload_to=unique_home_filename, blank=True, 
                            help_text="Only JPG and JPEG files are allowed.")
    is_button_available = models.BooleanField(default=False)
    button_text = models.CharField(max_length=25, null=True, blank=True)

    def save(self, *args, **kwargs):
        """
            Override the save method to process the main_text and sub_text
            and surround dynamic words with <span> tags.

            Args:
                *args: Additional positional arguments for the save method.
                **kwargs: Additional keyword arguments for the save method.
        """
        # Process the main_text to surround dynamic word with <span> tags
        string = self.main_text
        words_between_quotes = re.findall(r'"([^"]+)"', string)
        for dynamic_word in words_between_quotes:
            if dynamic_word and dynamic_word in self.main_text:
                self.main_text = self.main_text.replace(dynamic_word, f'<span>{dynamic_word}</span>').replace('"', "")

        
        sub_string = self.sub_text
        if self.sub_text:
            sub_words_between_quotes = re.findall(r'"([^"]+)"', sub_string) 
            for sub_dynamic_word in sub_words_between_quotes:
                if sub_dynamic_word and sub_dynamic_word in self.sub_text:
                    self.sub_text = self.sub_text.replace(sub_dynamic_word, f'<span>{sub_dynamic_word}</span>').replace('"', "")

        super(HomeSection, self).save(*args, **kwargs)


class AboutSection(BaseModelMixin):
    """
        Model representing the about section configuration.

        This model stores the configuration for the about section, including the name, description,
        date of birth, address, zip code, email, phone, and website.

        Attributes:
            name (CharField): The name to be displayed in the about section.
            description (CharField): The description to be displayed in the about section.
            date_of_birth (DateField): The date of birth of the person (optional).
                                    Validations are performed to ensure it is not in the future.
            address (CharField): The address of the person (optional).
            zip_code (CharField): The zip code of the person's location (optional).
            email (EmailField): The email address of the person.
            phone (CharField): The phone number of the person.
                            It must be entered in the format: '+999999999'. Up to 15 digits allowed.
            website (CharField): The website link of the person (optional).

        Manager:
            objects (SingleObjectManager): A custom manager to ensure only one object is allowed.

        Methods:
            __str__(): Return the string representation of the model instance.
            save(*args, **kwargs): Override the save method to prevent more than one object from being saved.

        Raises:
            ValueError: If an object already exists when trying to save a new object.

        Example Usage:
            about = AboutSection.objects.create(
                name="John Doe",
                description="Passionate Developer",
                date_of_birth=<date_of_birth>,  # Replace <date_of_birth> with the actual date of birth.
                address="123 Main Street",
                zip_code="12345",
                email="example@gmail.com",
                phone="+123456789",
                website="www.example.com",
            )
    """
    name = models.CharField(max_length=255, null=False, blank=False)
    description = models.CharField(max_length=255, null=False, blank=False)
    
    def validate_date_of_birth(value):
        """
            Validate the date of birth to ensure it is not in the future.

            Args:
                value (date): The date of birth to be validated.

            Raises:
                ValidationError: If the date of birth is in the future.
        """
        if value and value > timezone.now().date():
            raise ValidationError("Date of birth cannot be in the future.")

    date_of_birth = models.DateField(null=True, blank=True, validators=[validate_date_of_birth])

    address = models.CharField(max_length=255, null=True, blank=True)
    zip_code = models.CharField(max_length=10, null=True, blank=True)
    email = email = models.EmailField(
        null=False,
        blank=False,
        help_text="Enter your email address. like example@gmail.com",
        validators=[EmailValidator(message="Enter a valid email address.")]
    )

    phone_regex = RegexValidator(
        regex=r'^\+?1?\d{9,15}$',
        message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
    )
    
    phone = models.CharField(max_length=20, null=False, blank=False, validators=[phone_regex])
    website = models.CharField(max_length=20, null=True, blank=True)
    def validate_file_extension(value):
        # Get the file extension from the file name
        ext = os.path.splitext(value.name)[1]  
        # List of valid extensions 
        valid_extensions = ['.pdf', '.doc', '.docx']  

        if not ext.lower() in valid_extensions:
            raise ValidationError('Only PDF and DOC files are allowed.')
    resume = models.FileField(upload_to='resumes/', validators=[validate_file_extension],
        help_text="Only PDF and DOC files are allowed.",)
    file = models.FileField(upload_to='about/', blank=True, 
                            help_text="Only JPG and JPEG files are allowed.")

    objects = SingleObjectManager()

    def __str__(self):
        """
        Return the string representation of the model instance.

        Returns:
            str: The name of the person as the string representation.
        """
        return self.name

    def save(self, *args, **kwargs):
        if self.pk is None and AboutSection.objects.exists():
            raise ValueError("Only one object is allowed.")
        super(AboutSection, self).save(*args, **kwargs)


class EducationSection(BaseModelMixin):
    """
        Model representing the education section configuration.

        This model stores the configuration for the education section, including the duration of education,
        degree obtained, institution attended, and an optional description.

        Attributes:
            duration (CharField): The duration of education (e.g., "2015 - 2019").
            degree (CharField): The degree obtained during the education (e.g., "Bachelor of Science").
            institution (CharField): The name of the institution attended for education.
            description (TextField): An optional description or additional information about the education.

        Methods:
            __str__(): Return the string representation of the model instance.

        Example Usage:
            education = EducationSection.objects.create(
                duration="2015 - 2019",
                degree="Bachelor of Science",
                institution="ABC University",
                description="Studied computer science with a focus on artificial intelligence.",
            )
    """
    duration = models.CharField(max_length=100, null=False, blank=False)
    degree = models.CharField(max_length=255, null=False, blank=False)
    institution = models.CharField(max_length=255, null=False, blank=False)
    description = models.TextField(null=False, blank=False)

    def __str__(self):
        return f"{self.degree} at {self.institution}"
    

class ExperienceSection(BaseModelMixin):
    """
        Model representing the experience section configuration.

        This model stores the configuration for the experience section, including the duration of experience,
        company worked at, position held, and an optional description.

        Attributes:
            duration (CharField): The duration of experience (e.g., "2019 - Present").
            company (CharField): The name of the company where the experience was gained.
            position (CharField): The position held during the experience (e.g., "Software Engineer").
            description (TextField): An optional description or additional information about the experience.

        Methods:
            __str__(): Return the string representation of the model instance.

        Example Usage:
            experience = ExperienceSection.objects.create(
                duration="2019 - Present",
                company="XYZ Technologies",
                position="Software Engineer",
                description="Developed web applications and implemented new features.",
            )
    """
    duration = models.CharField(max_length=100, null=False, blank=False)
    company = models.CharField(max_length=255, null=False, blank=False)
    position = models.CharField(max_length=255, null=False, blank=False)
    description = models.TextField(null=False, blank=False)

    def __str__(self):
        return f"{self.company} at {self.description}"



def unique_filename(instance, filename):
    # Get the file's extension
    ext = filename.split('.')[-1]
    # Generate a unique filename using a UUID
    unique_name = f"{uuid.uuid4().hex}.{ext}"
    # Return the unique filename
    return os.path.join('services/', unique_name)



class Services(BaseModelMixin):
    """
        Model representing the services configuration.

        This model stores the configuration for the services, including the description of the services.

        Attributes:
            description (CharField): The description of the services.
                                    Maximum length is 255 characters.

        Manager:
            objects (SingleObjectManager): A custom manager to ensure only one object is allowed.

        Methods:
            save(*args, **kwargs): Override the save method to prevent more than one object from being saved.

        Raises:
            ValueError: If an object already exists when trying to save a new object.

        Example Usage:
            services = Services.objects.create(
                description="We offer a wide range of professional services."
            )
    """
    description = models.CharField(max_length=255, null=False, blank=False, help_text="Maximum length is 255 characters.")
    
    objects = SingleObjectManager()

    def save(self, *args, **kwargs):
        if self.pk is None and Services.objects.exists():
            raise ValueError("Only one object is allowed.")
        super(Services, self).save(*args, **kwargs)



class ServiceSections(BaseModelMixin):
    """
        Model representing the service sections configuration.

        This model stores the configuration for the service sections, including the name of the service,
        an optional file (e.g., image) related to the service, and a foreign key to link to the Services model.

        Attributes:
            service (CharField): The name of the service.
            file (FileField): An optional file to be uploaded and associated with the service section.
                            Only JPG and JPEG files are allowed.
            service_section (ForeignKey): A foreign key to link the service section to the Services model.

        Methods:
            __str__(): Return the string representation of the model instance.

        Example Usage:
            service_section = ServiceSections.objects.create(
                service="Web Development",
                file=<file_object>,  # Replace <file_object> with the actual file object.
                service_section=<service_instance>,  # Replace <service_instance> with the actual Services instance.
            )
    """
    service = models.CharField(max_length=100, null=False, blank=False)
    file = models.FileField(upload_to=unique_filename, blank=True, 
                            help_text="Only JPG and JPEG files are allowed.")
    service_section = models.ForeignKey(Services, related_name="service_sections",
        on_delete=models.CASCADE, null=True, blank=True)
    
    def __str__(self):
        return self.service



class Skill(BaseModelMixin):
    """
        Model representing the skills configuration.

        This model stores the configuration for the skills, including the description of the skills.

        Attributes:
            description (CharField): The description of the skills.
                                    Maximum length is 255 characters.

        Manager:
            objects (SingleObjectManager): A custom manager to ensure only one object is allowed.

        Methods:
            save(*args, **kwargs): Override the save method to prevent more than one object from being saved.

        Raises:
            ValueError: If an object already exists when trying to save a new object.

        Example Usage:
            skill = Skill.objects.create(
                description="A wide range of technical skills."
            )
    """
    description = models.CharField(max_length=255, null=False, blank=False, help_text="Maximum length is 255 characters.")
    
    objects = SingleObjectManager()

    def save(self, *args, **kwargs):
        if self.pk is None and Skill.objects.exists():
            raise ValueError("Only one object is allowed.")
        super(Skill, self).save(*args, **kwargs)



class SkillSection(BaseModelMixin):
    """
        Model representing the skill sections configuration.

        This model stores the configuration for the skill sections, including the name of the skill,
        the percentage representing the skill level, and a foreign key to link to the Skill model.

        Attributes:
            skill (CharField): The name of the skill.
            percentage (PositiveIntegerField): The percentage representing the skill level.
                                            It has a default value of 0.
            skill_section (ForeignKey): A foreign key to link the skill section to the Skill model.

        Methods:
            __str__(): Return the string representation of the model instance.

        Example Usage:
            skill_section = SkillSection.objects.create(
                skill="Python",
                percentage=90,
                skill_section=<skill_instance>,  # Replace <skill_instance> with the actual Skill instance.
            )
    """
    skill = models.CharField(max_length=100, null=False, blank=False)
    percentage = models.PositiveIntegerField(default=0)
    skill_section = models.ForeignKey(Skill, related_name="skill_sections",
        on_delete=models.CASCADE, null=True, blank=True)
    
    
    def __str__(self):
        return self.skill



def unique_project_filename(instance, filename):
    # Get the file's extension
    ext = filename.split('.')[-1]
    # Generate a unique filename using a UUID
    unique_name = f"{uuid.uuid4().hex}.{ext}"
    # Return the unique filename
    return os.path.join('project/', unique_name)


class Projects(BaseModelMixin):
    """
        Model representing the projects configuration.

        This model stores the configuration for the projects, including the name of the project,
        the associated service, a description of the project, a boolean flag to indicate if it's the main project,
        and an optional file (e.g., image) related to the project.

        Attributes:
            name (CharField): The name of the project.
                            Maximum length is 255 characters.
            service (CharField): The associated service of the project.
                                Maximum length is 100 characters.
            description (TextField): An optional description or details about the project.
                                    It can be a longer text field.
            is_main (BooleanField): A boolean flag to indicate if the project is the main project.
                                    Default is False.
            file (FileField): An optional file to be uploaded and associated with the project.
                            Only JPG and JPEG files are allowed.

        Methods:
            __str__(): Return the string representation of the model instance.

        Example Usage:
            project = Projects.objects.create(
                name="Project X",
                service="Web Development",
                description="Developed a responsive website using modern technologies.",
                is_main=True,
                file=<file_object>,  # Replace <file_object> with the actual file object.
            )
    """
    name = models.CharField(max_length=255, null=False, blank=False, help_text="Maximum length is 255 characters.")
    service = models.CharField(max_length=100, null=False, blank=False)
    description = models.TextField(null=True, blank=True)
    is_main = models.BooleanField(default=False)
    file = models.FileField(upload_to=unique_project_filename, blank=True, 
                            help_text="Only JPG and JPEG files are allowed.")
    
    
    def __str__(self):
        return self.name


class ProjectSubheading(BaseModelMixin):
    """
        Model representing the project subheading configuration.

        This model stores the configuration for the project subheading, including the title of the subheading,
        a description of the subheading, an optional file (e.g., image) related to the subheading,
        and a foreign key to link to the Projects model.

        Attributes:
            title (CharField): The title of the subheading.
                            Maximum length is 255 characters.
            description (TextField): An optional description or details about the subheading.
                                    It can be a longer text field.
            file (FileField): An optional file to be uploaded and associated with the subheading.
                            Only JPG and JPEG files are allowed.
            project (ForeignKey): A foreign key to link the subheading to the Projects model.

        Methods:
            __str__(): Return the string representation of the model instance.

        Example Usage:
            project_subheading = ProjectSubheading.objects.create(
                title="Implementation Details",
                description="Outlined the implementation details of Project X.",
                file=<file_object>,  # Replace <file_object> with the actual file object.
                project=<project_instance>,  # Replace <project_instance> with the actual Projects instance.
            )
    """
    tittle = models.CharField(max_length=255, null=True, blank=True, help_text="Maximum length is 255 characters.")
    description = models.TextField(null=True, blank=True)
    file = models.FileField(upload_to=unique_project_filename, blank=True, 
                            help_text="Only JPG and JPEG files are allowed.")
    project = models.ForeignKey(Projects, related_name="projects_subheadings",
        on_delete=models.CASCADE, null=True, blank=True)
    


class ProjectDescription(BaseModelMixin):
    """
        Model representing the project description configuration.

        This model stores the configuration for the project description, which is a text field containing
        detailed information about the project.

        Attributes:
            description (TextField): The detailed description of the project.

        Manager:
            objects (SingleObjectManager): A custom manager to ensure only one object is allowed.

        Methods:
            save(*args, **kwargs): Override the save method to prevent more than one object from being saved.

        Raises:
            ValueError: If an object already exists when trying to save a new object.

        Example Usage:
            project_description = ProjectDescription.objects.create(
                description="Project X is an e-commerce website developed using Django and React."
            )
    """
    description = models.TextField(null=False, blank=False)
    
    objects = SingleObjectManager()

    def save(self, *args, **kwargs):
        if self.pk is None and ProjectDescription.objects.exists():
            raise ValueError("Only one object is allowed.")
        super(ProjectDescription, self).save(*args, **kwargs)
    


class BlogDescription(BaseModelMixin):
    """
        Model representing the blog description configuration.

        This model stores the configuration for the blog description, which is a text field containing
        detailed information about the blog.

        Attributes:
            description (TextField): The detailed description of the blog.

        Manager:
            objects (SingleObjectManager): A custom manager to ensure only one object is allowed.

        Methods:
            save(*args, **kwargs): Override the save method to prevent more than one object from being saved.

        Raises:
            ValueError: If an object already exists when trying to save a new object.

        Example Usage:
            blog_description = BlogDescription.objects.create(
                description="blog X is an e-commerce website developed using Django and React."
            )
    """
    description = models.TextField(null=False, blank=False)
    
    objects = SingleObjectManager()

    def save(self, *args, **kwargs):
        if self.pk is None and BlogDescription.objects.exists():
            raise ValueError("Only one object is allowed.")
        super(BlogDescription, self).save(*args, **kwargs)




def unique_blog_filename(instance, filename):
    # Get the file's extension
    ext = filename.split('.')[-1]
    # Generate a unique filename using a UUID
    unique_name = f"{uuid.uuid4().hex}.{ext}"
    # Return the unique filename
    return os.path.join('project/', unique_name)



class MyBlogSection(BaseModelMixin):
    """
        Model representing the My Blog section configuration.

        This model stores the configuration for the My Blog section, including the name of the blog,
        the associated service, a description of the blog, a boolean flag to indicate if it's the main blog,
        an optional file (e.g., image) related to the blog, and a count of comments.

        Attributes:
            name (CharField): The name of the blog.
                            Maximum length is 255 characters.
            service (CharField): The associated service of the blog.
                                Maximum length is 100 characters.
            description (TextField): An optional description or details about the blog.
                                    It can be a longer text field.
            is_main (BooleanField): A boolean flag to indicate if the blog is the main blog.
                                    Default is False.
            file (FileField): An optional file to be uploaded and associated with the blog.
                            Only JPG and JPEG files are allowed.
            comment_count (BigIntegerField): The count of comments for the blog.
                                            It has a default value of 0.

        Tags:
            tags (TaggableManager): A manager for handling tags associated with the blog.

        Methods:
            __str__(): Return the string representation of the model instance.

        Example Usage:
            blog = MyBlogSection.objects.create(
                name="My Journey in Tech",
                service="Tech Blogging",
                description="Sharing my experiences and insights in the tech industry.",
                is_main=True,
                file=<file_object>,  # Replace <file_object> with the actual file object.
                comment_count=0,
            )
    """
    name = models.CharField(max_length=255, null=False, blank=False, help_text="Maximum length is 255 characters.")
    service = models.CharField(max_length=100, null=False, blank=False, help_text="Maximum length is 100 characters.")
    description = models.TextField(null=True, blank=True)
    is_main = models.BooleanField(default=False)
    file = models.FileField(upload_to=unique_blog_filename, blank=True, 
                            help_text="Only JPG and JPEG files are allowed.")
    comment_count = models.BigIntegerField(default= 0)

    tags = TaggableManager()
    
    def __str__(self):
        return self.name



class MyBlogSubheading(BaseModelMixin):
    """
        Model representing the My Blog subheading configuration.

        This model stores the configuration for the My Blog subheading, including the title of the subheading,
        a description of the subheading, an optional file (e.g., image) related to the subheading,
        and a foreign key to link to the MyBlogSection model.

        Attributes:
            title (CharField): The title of the subheading.
                            Maximum length is 255 characters.
            description (TextField): An optional description or details about the subheading.
                                    It can be a longer text field.
            file (FileField): An optional file to be uploaded and associated with the subheading.
                            Only JPG and JPEG files are allowed.
            my_blog (ForeignKey): A foreign key to link the subheading to the MyBlogSection model.

        Methods:
            __str__(): Return the string representation of the model instance.

        Example Usage:
            blog_subheading = MyBlogSubheading.objects.create(
                title="Tech Trends",
                description="Exploring the latest trends in the tech industry.",
                file=<file_object>,  # Replace <file_object> with the actual file object.
                my_blog=<blog_instance>,  # Replace <blog_instance> with the actual MyBlogSection instance.
            )
    """
    tittle = models.CharField(max_length=255, null=True, blank=True, help_text="Maximum length is 255 characters.")
    description = models.TextField(null=True, blank=True)
    file = models.FileField(upload_to=unique_blog_filename, blank=True, 
                            help_text="Only JPG and JPEG files are allowed.")
    my_blog = models.ForeignKey(MyBlogSection, related_name="MyBlog_subheadings",
        on_delete=models.CASCADE, null=True, blank=True)



class BlogComments(BaseModelMixin):
    """
        Model representing the blog comments configuration.

        This model stores the configuration for the blog comments, including the commenter's name,
        the message of the comment, the commenter's email, and a foreign key to link to the MyBlogSection model.

        Attributes:
            name (CharField): The name of the commenter.
                            Maximum length is 100 characters.
            message (TextField): The message of the comment.
                                Maximum length is 500 characters.
            email (EmailField): The email address of the commenter.
                                It must be a valid email address.
            my_blog (ForeignKey): A foreign key to link the comment to the MyBlogSection model.

        Methods:
            None

        Example Usage:
            comment = BlogComments.objects.create(
                name="John Doe",
                message="Great article! I found it very insightful.",
                email="john.doe@example.com",
                my_blog=1,  
            )

        Notes:
            The `BlogComments` model inherits from the `BaseModelMixin` to include the common fields such as `created_at`
            and `updated_at`, which automatically track the creation and modification timestamps of the comment.

            The `my_blog` attribute represents the ForeignKey relationship to the associated blog post.
            A comment can be linked to a specific blog post using this field.

            The `name`, `message`, and `email` attributes capture the necessary information from the commenter.

            The `save` method of the `BaseModelMixin` is inherited to ensure only one object of `BlogComments` is allowed.
    """
    name = models.CharField(max_length=100, null=False, blank=False, help_text="Maximum length is 100 characters.")
    message = models.TextField(max_length=500, null=False, blank=False, validators=[MaxLengthValidator(500)], 
                               help_text="Maximum length is 500 characters.")
    email = email = models.EmailField(
        null=False,
        blank=False,
        help_text="Enter your email address. like example@gmail.com",
        validators=[EmailValidator(message="Enter a valid email address.")]
    )
    my_blog = models.ForeignKey(MyBlogSection, related_name="MyBlog_comments",
        on_delete=models.CASCADE, null=True, blank=True)


class SocialMediaLinks(BaseModelMixin):
    """
        Model representing the social media links configuration.

        This model stores the configuration for social media links, including links to various social media platforms.

        Attributes:
            instagram (CharField): The link to the Instagram profile.
                                Maximum length is 255 characters.
            twitter (CharField): The link to the Twitter profile.
                                Maximum length is 255 characters.
            youtube (CharField): The link to the YouTube channel.
                                Maximum length is 255 characters.
            linkedin (CharField): The link to the LinkedIn profile.
                                Maximum length is 255 characters.
            github (CharField): The link to the GitHub profile.
                                Maximum length is 255 characters.
            facebook (CharField): The link to the Facebook profile.
                                Maximum length is 255 characters.

        Manager:
            objects (SingleObjectManager): A custom manager to ensure only one object is allowed.

        Methods:
            save(*args, **kwargs): Override the save method to prevent more than one object from being saved.

        Raises:
            ValueError: If an object already exists when trying to save a new object.

        Example Usage:
            social_media_links = SocialMediaLinks.objects.create(
                instagram="https://www.instagram.com/example/",
                twitter="https://twitter.com/example/",
                youtube="https://www.youtube.com/c/example/",
                linkedin="https://www.linkedin.com/in/example/",
                github="https://github.com/example/",
                facebook="https://www.facebook.com/example/",
            )
    """
    instagram = models.CharField(max_length=255, null=True, blank=True, help_text="Maximum length is 255 characters.")
    twitter = models.CharField(max_length=255, null=True, blank=True, help_text="Maximum length is 255 characters.")
    youtube = models.CharField(max_length=255, null=True, blank=True, help_text="Maximum length is 255 characters.")
    linkedin = models.CharField(max_length=255, null=True, blank=True, help_text="Maximum length is 255 characters.")
    github = models.CharField(max_length=255, null=True, blank=True, help_text="Maximum length is 255 characters.")
    facebook = models.CharField(max_length=255, null=True, blank=True, help_text="Maximum length is 255 characters.")

    objects = SingleObjectManager()

    def save(self, *args, **kwargs):
        if self.pk is None and SocialMediaLinks.objects.exists():
            raise ValueError("Only one object is allowed.")
        super(SocialMediaLinks, self).save(*args, **kwargs)


class ContactMe(BaseModelMixin):
    """
        Model representing contact messages.

        This model stores messages received through the contact form on the website.

        Attributes:
            name (CharField): The name of the person sending the message.
                            Maximum length is 255 characters.
            message (CharField): The message sent by the user.
                                Maximum length is 500 characters.
            subject (TextField): The subject of the message.
                                Maximum length is 100 characters.
            email (EmailField): The email address of the person sending the message.
                                It must be a valid email address.
            is_mail_sent (BooleanField): A boolean flag indicating whether an email notification has been sent
                                        in response to this message.
                                        Default is False.

        Methods:
            __str__(): Return the string representation of the model instance.
            save(*args, **kwargs): Override the save method to send an email notification upon saving a new instance.

        Example Usage:
            contact_message = ContactMe.objects.create(
                name="John Doe",
                message="Hello, I would like to inquire about your services.",
                subject="Service Inquiry",
                email="john.doe@example.com",
            )
    """
    name = models.CharField(max_length=255, null=False, blank=False)
    message = models.CharField(max_length=500, null=False, blank=False, validators=[MaxLengthValidator(500)], 
                               help_text="Maximum length is 500 characters.")
    subject = models.TextField(max_length=100, null=False, blank=False)
    email = email = models.EmailField(
        null=False,
        blank=False,
        help_text="Enter your email address. like example@gmail.com",
        validators=[EmailValidator(message="Enter a valid email address.")]
    )
    is_mail_sent = models.BooleanField(default=False)
    
    def __str__(self):
        return self.name



class HireMeSection(BaseModelMixin):
    """
    Model representing the Hire Me section configuration.

    This model stores the configuration for the Hire Me section, including the main text,
    description, button availability, and button text.

    Attributes:
        main_text (CharField): The main text of the Hire Me section.
                               To design specific words, use "double quotes" as delimiters.
                               Maximum length is 255 characters.
        description (TextField): The description of the Hire Me section.
                                 This field is mandatory and cannot be left blank.
        is_button_available (BooleanField): A boolean flag to indicate if the Hire Me button is available.
                                            Default is False.
        button_text (CharField): The text displayed on the Hire Me button.
                                 Maximum length is 25 characters.

    Methods:
        save(*args, **kwargs): Overrides the default save method of the model.
                               Processes the main_text and surrounds dynamic words with <span> tags.

    Example Usage:
        hire_me = HireMeSection.objects.create(
            main_text='Hire me for your next project!',
            description='I am available for freelance work.',
            is_button_available=True,
            button_text='Hire Now',
        )
    """
    main_text = models.CharField(max_length=255, null=False, blank=False,
        help_text='To design the specific words please use "double quote".')
    description = models.TextField(null=False, blank=False)
    is_button_available = models.BooleanField(default=False)
    button_text = models.CharField(max_length=25, null=True, blank=True)
    file = models.FileField(upload_to=unique_blog_filename, blank=True, 
                            help_text="Only JPG and JPEG files are allowed.")

    
    objects = SingleObjectManager()

    def save(self, *args, **kwargs):
        """
            Override the save method to process the main_text and sub_text
            and surround dynamic words with <span> tags.

            Args:
                *args: Additional positional arguments for the save method.
                **kwargs: Additional keyword arguments for the save method.
        """
        # Process the main_text to surround dynamic word with <span> tags
        string = self.main_text
        words_between_quotes = re.findall(r'"([^"]+)"', string) 
        for dynamic_word in words_between_quotes:
            if dynamic_word and dynamic_word in self.main_text:
                self.main_text = self.main_text.replace(dynamic_word, f'<span>{dynamic_word}</span>').replace('"', "")

        if self.pk is None and HireMeSection.objects.exists():
            raise ValueError("Only one object is allowed.")
        super(HireMeSection, self).save(*args, **kwargs)
    

class YouTube(BaseModelMixin):
    """
    Model representing YouTube configuration.

    This model stores the configuration for the YouTube section, including the description and the link to the YouTube channel.

    Attributes:
        description (TextField): The description of the YouTube section.
                                 This field is mandatory and cannot be left blank.
        youtube_channel_link (CharField): The link to the YouTube channel associated with the website.
                                          Maximum length is 255 characters.

    Methods:
        save(*args, **kwargs): Overrides the default save method of the model.
                               Raises a ValueError if a new instance is being created and another instance already exists.

    Example Usage:
        youtube_section = YouTube.objects.create(
            description="This is the YouTube section of the website.",
            youtube_channel_link="https://www.youtube.com/channel/examplechannel",
        )
    """
    description = models.TextField(null=False, blank=False)
    youtube_channel_link = models.CharField(max_length=255, null=True, blank=True, help_text="Maximum length is 255 characters.")
    
    objects = SingleObjectManager()

    def save(self, *args, **kwargs):
        if self.pk is None and YouTube.objects.exists():
            raise ValueError("Only one object is allowed.")
        super(YouTube, self).save(*args, **kwargs)


class YouTubeLinks(BaseModelMixin):
    """
    Model representing YouTube links configuration.

    This model stores the configuration for YouTube links, including the link to a specific video.

    Attributes:
        link (CharField): The YouTube video link.
                          Maximum length is 255 characters.
        title (CharField): The title of the YouTube video.
                           Maximum length is 255 characters.
        is_main (BooleanField): A boolean flag to indicate if it's the main YouTube link for the site.
                                Default is False.
        description (TextField): The description of the YouTube video.

    Methods:
        None

    Example Usage:
        youtube_link = YouTubeLinks.objects.create(
            link="https://www.youtube.com/watch?v=examplevideo",
            title="Example Video",
            is_main=True,
            description="This is an example YouTube video.",
        )
    """
    link = models.CharField(max_length=255, null=False, blank=False, help_text="Provide only embed youtube links.")
    title = models.CharField(max_length=255, null=False, blank=False, help_text="Maximum length is 255 characters.")
    is_main = models.BooleanField(default=False)
    description = models.TextField(null=False, blank=False)
    youtube = models.ForeignKey(YouTube, related_name="youtube_links",
        on_delete=models.CASCADE, null=False, blank=False)

