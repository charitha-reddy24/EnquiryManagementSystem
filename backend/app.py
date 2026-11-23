from flask import Flask, request
from flask_cors import CORS
from enquiry import Enquiry
import re

app = Flask(__name__)
CORS(app)


# COMMON VALIDATION FUNCTION

def validate_enquiry(data):

    first_name = data.get("first_name", "").strip()
    last_name = data.get("last_name", "").strip()
    mobile = data.get("mobile", "").strip()
    email = data.get("email", "").strip()

    if not all([first_name, last_name, mobile, email]):
        return "All fields are required!"

    if not re.fullmatch(r"[a-zA-Z ]+", first_name):
        return "First name should contain only letters!"

    if not re.fullmatch(r"[a-zA-Z ]+", last_name):
        return "Last name should contain only letters!"

    if not re.fullmatch(r"[0-9]{10}", mobile):
        return "Mobile number must contain exactly 10 digits!"

    if not re.fullmatch(r"[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+", email):
        return "Please enter a valid email address!"

    return None


# HOME API

@app.route('/')
def home():
    return "Welcome to Enquiry Management System!"


# GET API

@app.route('/api/enquiries', methods=['GET'])
def get_enquiries():

    enquiry = Enquiry()
    enquiries = enquiry.get_all_enquiries()

    return {
        "message": "Enquiries retrieved successfully!",
        "data": enquiries
    }


# POST API

@app.route('/api/enquiries', methods=['POST'])
def create_enquiry():

    data = request.get_json(silent=True)

    if not isinstance(data, dict):
        return {"message": "Invalid request data!"}, 400

    error = validate_enquiry(data)

    if error:
        return {"message": error}, 400

    enquiry = Enquiry()

    enquiry.add_enquiry(
        data["first_name"].strip(),
        data["last_name"].strip(),
        data["mobile"].strip(),
        data["email"].strip()
    )

    return {"message": "Enquiry submitted and saved successfully!"}, 201


# PUT API

@app.route('/api/enquiries/<int:enquiry_id>', methods=['PUT'])
def update_enquiry(enquiry_id):

    data = request.get_json(silent=True)

    if not isinstance(data, dict):
        return {"message": "Invalid request data!"}, 400

    error = validate_enquiry(data)

    if error:
        return {"message": error}, 400

    enquiry = Enquiry()

    updated = enquiry.update_enquiry(
        enquiry_id,
        data["first_name"].strip(),
        data["last_name"].strip(),
        data["mobile"].strip(),
        data["email"].strip()
    )

    if updated == 0:
        return {"message": "Enquiry not found!"}, 404

    return {"message": "Enquiry updated successfully!"}


# DELETE API

@app.route('/api/enquiries/<int:enquiry_id>', methods=['DELETE'])
def delete_enquiry(enquiry_id):

    enquiry = Enquiry()
    deleted = enquiry.delete_enquiry(enquiry_id)

    if deleted == 0:
        return {"message": "Enquiry not found!"}, 404

    return {"message": "Enquiry deleted successfully!"}


# SEARCH API

@app.route('/api/enquiries/search', methods=['GET'])
def search_enquiries():

    search_text = request.args.get('search', '')

    enquiry = Enquiry()
    enquiries = enquiry.search_enquiries(search_text)

    return {
        "message": "Search completed successfully!",
        "data": enquiries
    }


if __name__ == '__main__':
    app.run(debug=True)