from django.test import TestCase
from django.contrib.auth.models import User
from django import forms

# Import your sign-up AND login functions
from AuthSys.Functionalities.SignUp.SignUpFunctionalities import sign_up
from AuthSys.Functionalities.Login.LoginFunctionalities import login_logic

class LoginTests(TestCase):
    
    def setUp(self):
        """Run this before every test: Create a user to log in with."""
        # We use create_user directly here to ensure the user exists for login tests
        self.username = "testuser"
        self.password = "securePassword123"
        self.email = "test@example.com"
        User.objects.create_user(username=self.username, email=self.email, password=self.password)

    def test_login_success(self):
        """Test that correct credentials return the user object."""
        # We pass None for request since we are just testing logic, not the web view
        user = login_logic(None, self.username, self.password)
        
        self.assertIsNotNone(user)
        self.assertEqual(user.username, self.username)

    def test_login_wrong_password(self):
        """Test that wrong password raises ValidationError."""
        with self.assertRaises(forms.ValidationError):
            login_logic(None, self.username, "WrongPassword")

    def test_login_wrong_username(self):
        """Test that non-existent username raises ValidationError."""
        with self.assertRaises(forms.ValidationError):
            login_logic(None, "ghost_user", self.password)