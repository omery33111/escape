from datetime import timedelta
from pathlib import Path
import os
import dj_database_url



# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'e3kgq_)$tf+f8q)*e1fpn4#-7hm84c44=ir-p&%55^sf%nd4%w'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']



# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    "rest_framework",
    "rest_framework_simplejwt.token_blacklist",
    'corsheaders',
    'shoe',
    'brand',
    'administrator',
    'authentication',
    'shipping',
    'order',
    'profile_user',
    'insta_rec',
    'coupon',
]



REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
 
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}



SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days = 1),
    "REFRESH_TOKEN_LIFETIME": timedelta(days = 90),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
    "UPDATE_LAST_LOGIN": False,
    "ALGORITHM": "HS256",
    "VERIFYING_KEY": None,
    "AUDIENCE": None,
    "ISSUER": None,
    "JWK_URL": None,
    "LEEWAY": 0,
    "AUTH_HEADER_TYPES": ("Bearer",),
    "AUTH_HEADER_NAME": "HTTP_AUTHORIZATION",
    "USER_ID_FIELD": "id",
    "USER_ID_CLAIM": "user_id",
    "USER_AUTHENTICATION_RULE": "rest_framework_simplejwt.authentication.default_user_authentication_rule",
    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
    "TOKEN_TYPE_CLAIM": "token_type",
    "JTI_CLAIM": "jti",
    "SLIDING_TOKEN_REFRESH_EXP_CLAIM": "refresh_exp",
    "SLIDING_TOKEN_LIFETIME": timedelta(minutes=5),
    "SLIDING_TOKEN_REFRESH_LIFETIME": timedelta(days=1),
}



MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    # 'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

ROOT_URLCONF = 'project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, "templates")],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


FRONTEND_URL = 'https://escapeshoes.netlify.app/'


# ~~~~~~~~~~ EMAIL CONFIGURATION
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'escapeilhelp@gmail.com'
EMAIL_HOST_PASSWORD = 'vezm auux ghik syiq'

# EMAIL_HOST_USER = 'omery33111@gmail.com'
# EMAIL_HOST_PASSWORD = 'wofo cbpm ljoh qrqx'




WSGI_APPLICATION = 'project.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases


# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql',
#         'NAME': 'Escape',
#         'USER': 'root',
#         'PASSWORD': 'A1a2a3a4a5%%',
#         'HOST': 'localhost',
#         'PORT': '3306',
#     }
# }


PROJECT_DIR = os.path.abspath(os.path.dirname(__file__))

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': os.path.join(PROJECT_DIR, 'mydatabase.db'),
#     }
# }



DATABASES = {
   "default": dj_database_url.parse("postgresql://escape_database_user:pCj8BQJloNnuwFa3IelLCeWyJoKvJClA@dpg-cqdua588fa8c73dsl2u0-a.oregon-postgres.render.com/escape_database")
}



# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql',
#         'NAME': 'Escape',
#         'USER': 'Adminito',
#         'PASSWORD': '12344321Nn>',
#         'HOST': '159.69.188.224',
#         'PORT': '3306',
#     }
# }


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

# STATIC_URL = '/staticBack/'

# STATICFILES_DIRS = [
#     BASE_DIR / 'staticBack',
#     BASE_DIR / 'Front-end/build/static'
# ]

# STATICFILES_DIRS = [
#     os.path.join(BASE_DIR, 'staticBack'),
# ]


# MEDIA_ROOT = os.path.join(BASE_DIR, 'staticBack/images')

STATIC_URL = '/static/'

STATICFILES_DIRS = [
    BASE_DIR / 'static',
    BASE_DIR / 'Front-end/build/static'
]

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
]


MEDIA_ROOT = os.path.join(BASE_DIR, 'static/images')

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

MEDIA_URL = '/media/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CORS_ALLOW_ALL_ORIGINS = True
