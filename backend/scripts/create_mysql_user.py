import mysql.connector
from mysql.connector import errorcode

candidates = [
    {'user':'root','password':None},
    {'user':'root','password':'newpassword123'},
]

created = False
for cred in candidates:
    try:
        print('Trying connection with', cred)
        conn = mysql.connector.connect(host='localhost', user=cred['user'], password=cred['password'])
        cursor = conn.cursor()
        cursor.execute('CREATE DATABASE IF NOT EXISTS ghg_db')
        cursor.execute("CREATE USER IF NOT EXISTS 'ghg_user'@'localhost' IDENTIFIED BY 'ghg_dev_password'")
        cursor.execute("GRANT ALL PRIVILEGES ON ghg_db.* TO 'ghg_user'@'localhost'")
        cursor.execute('FLUSH PRIVILEGES')
        conn.commit()
        cursor.close()
        conn.close()
        print('Success using', cred)
        created = True
        break
    except mysql.connector.Error as err:
        print('Failed with', cred, 'error:', err)

if not created:
    print('\nUnable to create database/user with tested credentials.')
    print('If MySQL requires a different root password, run the following SQL manually:')
    print("CREATE DATABASE ghg_db;\nCREATE USER 'ghg_user'@'localhost' IDENTIFIED BY 'ghg_dev_password';\nGRANT ALL PRIVILEGES ON ghg_db.* TO 'ghg_user'@'localhost';\nFLUSH PRIVILEGES;")
