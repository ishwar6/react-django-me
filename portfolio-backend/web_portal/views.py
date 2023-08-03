from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Navbar, BlogComments, Projects, MyBlogSection
from .serializers import (PortfolioSerializer, BlogCommentsSerializer,MyBlogSection, ContactMeSerializer,ProjectsSerializer,
                           MyBlogSectionSerializer, SingleBlogSectionSerializer)
from .utils import send_email
from django.shortcuts import get_object_or_404
from rest_framework import status
from .pagination import CommentPagination, CustomPagination
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
class BlogsGetView(APIView):
    """
        View to retrieve blog section data.

        Supported Query Parameters:
            - my_blog (int, optional): Filter blogs by their ID and return the corresponding blog data.
            - recent (bool, optional): Return the most recent three blogs.

        GET request:
            - If 'my_blog' is provided in the query parameters, retrieve and return the serialized data
            for the specified blog with the given ID.
            - If 'recent' is provided in the query parameters, retrieve and return the serialized data
            for the three most recent blogs.
            - If neither 'my_blog' nor 'recent' is provided, return all blogs serialized data.

        Example:
            GET /blogs/?my_blog=1
            GET /blogs/?tag=AI
            GET /blogs/?recent=True
            GET /blogs/
    """
    def get(self, request):
        my_blog = request.GET.get("my_blog")
        recent = request.GET.get("recent")
        tag = request.GET.get("tag")
        MyBlogSection.update_blog_comment_count()

        if my_blog:
            # If my_blog is provided in the query string, filter the queryset
            try:
                blog_instance = MyBlogSection.objects.get(id=my_blog)
                serializer = SingleBlogSectionSerializer(blog_instance)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except MyBlogSection.DoesNotExist:
                return Response({"error": "Project not found."}, status=status.HTTP_404_NOT_FOUND)
            
        if recent:
            # If recent is provided in the query string, filter the queryset
            blogs = MyBlogSection.objects.all().order_by('-created_at')[:3]
            serializer = MyBlogSectionSerializer(blogs, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        if tag:
            # If tag is provided in the query string, filter the queryset
            tag_list = tag.split(',')
            queryset = MyBlogSection.objects
            obj_list = set()
            # Build the filter query for each tag and chain them using AND operator (&)
            for tag_name in tag_list:
                queryset_id = queryset.filter(tags__name__iexact=tag_name).values_list('id', flat=True)
                obj_list.add(queryset_id)
            obj_list = list(obj_list)
            queryset = MyBlogSection.objects.filter(id__in = obj_list)

            paginator = CustomPagination()
            result_page = paginator.paginate_queryset(queryset, request)
            serializer = MyBlogSectionSerializer(result_page, many=True)
            all_tags = MyBlogSection.tags.all()
            all_tags =  list(all_tags.values_list('name', flat=True).distinct())
            response_data = {
                "count": paginator.page.paginator.count,
                "next_link": paginator.get_next_link(),
                "previous_link": paginator.get_previous_link(),
                "data": serializer.data,
                "all_tags":all_tags
            }
            return Response(response_data, status=status.HTTP_200_OK)
            
        # If my_blog, tag and recent is not provided, return all blogs
        queryset = MyBlogSection.objects.all().order_by('-created_at')
        paginator = CustomPagination()
        result_page = paginator.paginate_queryset(queryset, request)
        serializer = MyBlogSectionSerializer(result_page, many=True)
        all_tags = MyBlogSection.tags.all()
        all_tags =  list(all_tags.values_list('name', flat=True).distinct())
        response_data = {
            "count": paginator.page.paginator.count,
            "next_link": paginator.get_next_link(),
            "previous_link": paginator.get_previous_link(),
            "data": serializer.data,
            "all_tags":all_tags
        }
        return Response(response_data, status=status.HTTP_200_OK)


@method_decorator(csrf_exempt, name='dispatch')
class BlogCommentsCreateView(APIView):
    """
        View to retrieve and create comments for a specific blog.

        Supported Query Parameters:
            - my_blog (int, required): The ID of the blog for which comments are to be retrieved or created.

        GET request:
            - If 'my_blog' is provided in the query parameters, retrieve and return all comments associated
            with the specified blog, serialized as a list.

        POST request:
            - Create a new comment by providing the necessary data in the request body. Increment the 'comment_count'
            field for the corresponding MyBlogSection upon successful comment creation.

        Example:
            GET /blog-comments/?my_blog=1
            POST /blog-comments/
            {
                "my_blog": 1,
                "name": "John Doe",
                "email": "john.doe@example.com",
                "comment": "This is a great blog!"
            }
    """
    permission_classes = []
    authentication_classes = []
    def get(self, request):
        my_blog = request.GET.get("my_blog")

        if my_blog:
            # If my_blog is provided in the query string, filter the queryset
            try:
                blog = MyBlogSection.objects.get(id = my_blog)
            except MyBlogSection.DoesNotExist:
                return Response({"error": "blog not found."}, status=status.HTTP_404_NOT_FOUND)
            queryset = BlogComments.objects.filter(my_blog=my_blog).order_by('-created_at')
            paginator = CommentPagination()
            result_page = paginator.paginate_queryset(queryset, request)
            serializer = BlogCommentsSerializer(result_page, many = True)
            response_data = {
                "count": paginator.page.paginator.count,
                "next_link": paginator.get_next_link(),
                "previous_link": paginator.get_previous_link(),
                "data": serializer.data
            }
            return Response(response_data, status=status.HTTP_200_OK)
            
        return Response({"Error":"Blog id is missing"}, status=status.HTTP_400_BAD_REQUEST)
    

    def post(self, request):
        serializer = BlogCommentsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            # Increment comment_count for the related MyBlogSection
            my_blog_section_id = request.data.get('my_blog')
            if my_blog_section_id:
                try:
                    my_blog_section = MyBlogSection.objects.get(id=my_blog_section_id)
                    my_blog_section.comment_count += 1
                    my_blog_section.save()
                except MyBlogSection.DoesNotExist:
                    pass

            return Response({"Message":"commented successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PortfolioView(APIView):
    """
        View to retrieve portfolio data.

        GET request:
            - Fetch and return the serialized representation of the portfolio data.

        Example:
            GET /
    """
    def get(self, request):
        navbar_instance = Navbar.objects.first()
        # Serialize the portfolio data using the PortfolioSerializer
        serializer = PortfolioSerializer(navbar_instance)
        return Response(serializer.data)
    

@method_decorator(csrf_exempt, name='dispatch')
class ContactMeCreateView(APIView):
    """
        View to handle the creation of contact me messages and sending emails.

        POST request:
            - Create a new contact me message by providing the necessary data in the request body.
            - If 'receive_mail' flag is set in the Navbar model, send an email notification using the provided
            email address.

        Example:
            POST /contact-me/
            {
                "name": "John Doe",
                "email": "john.doe@example.com",
                "subject": "Inquiry",
                "message": "I have a question about your services."
            }
    """


    def post(self, request):
        serializer = ContactMeSerializer(data=request.data)
        if serializer.is_valid():
            # Save the new instance using the serializer's save method
            instance = serializer.save()
            nav_obj = Navbar.objects.first()
            if nav_obj.receive_mail:
                # Send the email using the send_email function
                mailer = instance.email
                subject = instance.subject
                message = instance.message
                name = instance.name

                send_email(subject=subject,name= name,message=message, mailer=mailer)

                # Update the is_mail_sent field and save the instance again
                instance.is_mail_sent = True
                instance.save()

            return Response({"Message":"Sent successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ProjectsGetView(APIView):
    """
        View to retrieve project data.

        Supported Query Parameters:
            - project_id (int, optional): Filter projects by their ID and return the corresponding project data.
            - recent (bool, optional): Return the most recent three projects.

        GET request:
            - If 'project_id' is provided in the query parameters, retrieve and return the serialized data
            for the specified project with the given ID.
            - If 'recent' is provided in the query parameters, retrieve and return the serialized data
            for the three most recent projects.
            - If neither 'project_id' nor 'recent' is provided, return all projects serialized data.

        Example:
            GET /projects/?project_id=1
            GET /projects/?recent=True
            GET /projects/
    """
    def get(self, request):
        project_id = request.GET.get("project_id")
        recent = request.GET.get("recent")

        if project_id:
            # If project_id is provided in the query string, filter the queryset
            try:
                project_instance = Projects.objects.get(id=project_id)
                serializer = ProjectsSerializer(project_instance)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Projects.DoesNotExist:
                return Response({"error": "Project not found."}, status=status.HTTP_404_NOT_FOUND)
            
        if recent:
            # If recent is provided in the query string, filter the queryset
            try:
                project_instance = Projects.objects.all().order_by('-created_at')[:3]
                serializer = ProjectsSerializer(project_instance, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Projects.DoesNotExist:
                return Response({"error": "Project not found."}, status=status.HTTP_404_NOT_FOUND)
            
        # If project_id and recent is not provided, return all projects
        queryset = Projects.objects.all().order_by('-created_at')
        paginator = CustomPagination()
        result_page = paginator.paginate_queryset(queryset, request)
        serializer = ProjectsSerializer(result_page, many=True)
        response_data = {
            "count": paginator.page.paginator.count,
            "next_link": paginator.get_next_link(),
            "previous_link": paginator.get_previous_link(),
            "data": serializer.data
        }
        return Response(response_data, status=status.HTTP_200_OK)