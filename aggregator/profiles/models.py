from __future__ import unicode_literals

from django.db import models

from django.core.mail import send_mail
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils.translation import ugettext_lazy as _
import uuid
from .managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField( unique=True)
    username = models.CharField(max_length=30)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    api_key = models.CharField(max_length=255, default=uuid.uuid4)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def get_short_name(self):
        """
        Returns the short name for the user.
        """
        return self.username

    def email_user(self, subject, message, from_email=None, **kwargs):
        """
        Sends an email to this User.
        """
        send_mail(subject, message, from_email, [self.email], **kwargs)
