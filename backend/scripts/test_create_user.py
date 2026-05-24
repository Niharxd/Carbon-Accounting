import sys, os
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
from db import database
from auth import auth

print('Attempting create_user...')
uid = database.create_user('dbgtest','dbgtest@example.com', auth.hash_password('DbgPass123'))
print('create_user returned:', uid)
