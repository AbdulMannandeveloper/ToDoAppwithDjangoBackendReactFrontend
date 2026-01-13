from django.test import TestCase, RequestFactory
from django.contrib.auth.models import User
from .models import Tasks
import json

# --- IMPORTS ---
# Based on your file structure image, this is how we find your functions:
from ToDoApp.Functionalities.CRUD import (
    Create, 
    read, 
    Update_task_description, 
    Update_task_check, 
    delete_task
)

class TaskCRUDTests(TestCase):
    def setUp(self):
        """
        Run this before every single test.
        We create a fake browser (factory), a user, and a sample task.
        """
        self.factory = RequestFactory()
        self.user = User.objects.create_user(username="testuser", password="password")
        
        # Create a sample task to use in Update/Delete tests
        self.sample_task = Tasks.objects.create(
            user=self.user,
            task="Existing Task",
            is_done=False
        )

    def test_create_task_success(self):
        """Test the Create function."""
        # 1. Create a fake POST request with JSON data
        data = {"task": "Buy Groceries"}
        request = self.factory.post(
            '/dummy-url/', 
            data=json.dumps(data), 
            content_type='application/json'
        )
        
        # 2. Manually attach the user (since we aren't using real URLs/Middleware)
        request.user = self.user

        # 3. Call your function
        response = Create(request)

        # 4. Check the result
        self.assertEqual(response.status_code, 201)
        
        # 5. Verify it's actually in the database
        self.assertTrue(Tasks.objects.filter(task="Buy Groceries").exists())

    def test_read_tasks(self):
        """Test the read function."""
        request = self.factory.get('/dummy-url/')
        request.user = self.user

        response = read(request)

        # Check status (Your code defaults to 200 for JsonResponse)
        self.assertEqual(response.status_code, 200)
        
        # Parse the JSON response
        response_data = json.loads(response.content)
        
        # Expecting: {'task': [...]}
        self.assertIn('task', response_data)
        self.assertTrue(len(response_data['task']) > 0)
        self.assertEqual(response_data['task'][0]['task'], "Existing Task")

    def test_update_description(self):
        """Test Update_task_description function."""
        new_desc = "Updated Task Name"
        data = {
            "task_id": self.sample_task.id,
            "new_task": new_desc
        }
        
        request = self.factory.put(
            '/dummy-url/', 
            data=json.dumps(data), 
            content_type='application/json'
        )
        request.user = self.user

        response = Update_task_description(request)
        self.assertEqual(response.status_code, 200)

        # Verify DB update
        self.sample_task.refresh_from_db()
        self.assertEqual(self.sample_task.task, new_desc)

    def test_update_check(self):
        """Test Update_task_check function."""
        data = {
            "task_id": self.sample_task.id,
            "new_check": True
        }
        
        request = self.factory.put(
            '/dummy-url/', 
            data=json.dumps(data), 
            content_type='application/json'
        )
        request.user = self.user

        response = Update_task_check(request)
        self.assertEqual(response.status_code, 200)

        # Verify DB update
        self.sample_task.refresh_from_db()
        self.assertTrue(self.sample_task.is_done)

    def test_delete_task(self):
        """Test delete_task function."""
        data = {"task_id": self.sample_task.id}
        
        request = self.factory.delete(
            '/dummy-url/', 
            data=json.dumps(data), 
            content_type='application/json'
        )
        request.user = self.user

        response = delete_task(request)
        self.assertEqual(response.status_code, 200)

        # Verify DB deletion
        self.assertFalse(Tasks.objects.filter(id=self.sample_task.id).exists())

    def test_security_check(self):
        """Test that user A cannot delete user B's task."""
        # Create a second user and their task
        other_user = User.objects.create_user(username="hacker")
        other_task = Tasks.objects.create(user=other_user, task="Secret")

        # Try to delete 'other_task' while logged in as 'self.user'
        data = {"task_id": other_task.id}
        request = self.factory.delete(
            '/dummy-url/', 
            data=json.dumps(data), 
            content_type='application/json'
        )
        request.user = self.user  # We are 'testuser', not 'hacker'

        response = delete_task(request)
        
        # Should fail with 403 (Forbidden) based on your code
        self.assertEqual(response.status_code, 403)
        
        # Task should still exist
        self.assertTrue(Tasks.objects.filter(id=other_task.id).exists())