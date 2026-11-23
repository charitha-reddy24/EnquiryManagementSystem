import mysql.connector


class Database:
    def connect(self):
        connection=mysql.connector.connect(host="localhost",port=3307,user="root",password="Charitha@123",database="enquiry_db")
        return connection

if __name__ == "__main__":

    db = Database()
    connection = db.connect()

    if connection.is_connected():
        print("MySQL Database Connected Successfully!")

    connection.close()