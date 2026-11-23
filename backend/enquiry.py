from database import Database


class Enquiry:

    # CREATE ENQUIRY
    def add_enquiry(self, first_name, last_name, mobile, email):

        db = Database()
        connection = db.connect()
        cursor = connection.cursor()

        query = """
        INSERT INTO enquiries (first_name, last_name, mobile, email)
        VALUES (%s, %s, %s, %s)
        """

        values = (first_name, last_name, mobile, email)

        cursor.execute(query, values)
        connection.commit()

        cursor.close()
        connection.close()

        return True

    # GET ALL ENQUIRIES
    def get_all_enquiries(self):

        db = Database()
        connection = db.connect()
        cursor = connection.cursor(dictionary=True)

        query = "SELECT * FROM enquiries"

        cursor.execute(query)

        enquiries = cursor.fetchall()

        cursor.close()
        connection.close()

        return enquiries

    # UPDATE ENQUIRY
    def update_enquiry(self, enquiry_id, first_name, last_name, mobile, email):

        db = Database()
        connection = db.connect()
        cursor = connection.cursor()

        query = """
        UPDATE enquiries
        SET first_name = %s,
            last_name = %s,
            mobile = %s,
            email = %s
        WHERE id = %s
        """

        values = (first_name, last_name, mobile, email, enquiry_id)

        cursor.execute(query, values)
        connection.commit()

        updated = cursor.rowcount

        cursor.close()
        connection.close()

        return updated

    # DELETE ENQUIRY
    def delete_enquiry(self, enquiry_id):

        db = Database()
        connection = db.connect()
        cursor = connection.cursor()

        query = "DELETE FROM enquiries WHERE id = %s"

        values = (enquiry_id,)

        cursor.execute(query, values)
        connection.commit()

        deleted = cursor.rowcount

        cursor.close()
        connection.close()

        return deleted

    # SEARCH ENQUIRIES
    def search_enquiries(self, search_text):

        db = Database()
        connection = db.connect()
        cursor = connection.cursor(dictionary=True)

        query = """
        SELECT * FROM enquiries
        WHERE first_name LIKE %s
        OR last_name LIKE %s
        OR mobile LIKE %s
        OR email LIKE %s
        """

        search_value = "%" + search_text + "%"

        values = (
            search_value,
            search_value,
            search_value,
            search_value
        )

        cursor.execute(query, values)

        enquiries = cursor.fetchall()

        cursor.close()
        connection.close()

        return enquiries