from flask_restful import Resource, reqparse
from database import database
from models import User

class UserRegistration(Resource):
    def post(self):
        args = user_register_post_args.parse_args()
        username = args.get("username")
        email = args.get("email")
        password = args.get("password")
        dob = args.get("dob")

        user = User("User", email, password, dob).getObject()

        if database.users.insert_one(user):
            return {
                    "message": "Registration successful",
                    "username": "User"
                    }, 200

# This is for after registration for the user to set their
# info up.
class UserUpdateInformation(Resource):
    def post(self):
        args = user_update_post_args.parse_args()
        full_name = args.get("full_name")
        id_number = args.get("id_number")
        phone_number = args.get("phone_number")
        home_address = args.get("home_address")
        insurance_number = args.get("insurance_number")
        insurance_name = args.get("insurance_name")
        license_number = args.get("license_plate")

        # Update database
        if(database.users.find_one({"username": "User"})):
            query_filter = {"username": "User"}
            update_operation = {'$set': {'full_name': full_name, 'id_number': id_number, 'phone_number': phone_number, 'home_address': home_address, 'insurance_number': insurance_number, 'insurance_name': insurance_name, 'license_number': license_number }}
            database.users.update_one(query_filter, update_operation)

            return {"message": "Account updated"}, 200
        else:
            return {"message": "User could not be found"}, 400
          


class UserAccount(Resource):
    def get(self):
        user = database.users.find_one({"username": "User"})
        if(user):
          username = user['username']
          full_name = user['full_name']
          email = user['email']
          id_number = user['id_number']
          phone_number = user['phone_number']
          home_address = user['home_address']
          dob = user['dob']
          insurance_number = user['insurance_number']
          insurance_name = user['insurance_name']
          license_numbers = user['license_numbers']
          incidents = user['incidents']
          notifications = user['notifications']

          return {"username": username,
                  "full_name": full_name,
                  "email": email,
                  "id_number": id_number,
                  "phone_number": phone_number,
                  "home_address": home_address,
                  "dob": dob,
                  "insurance_number": insurance_number,
                  "license_numbers": license_numbers,
                  "incidents": incidents,
                  "notifications": notifications}, 200
        else:
            return {"message": "User could not be found."}, 400

# User registration arguments
# i.e: what the frontend needs to pass
user_register_post_args = reqparse.RequestParser()
user_register_post_args.add_argument("username", type=str, help="Username missing", location="json", required=True)
user_register_post_args.add_argument("email", type=str, help="Email missing", location="json", required=True)
user_register_post_args.add_argument("password", type=str, help="Password missing", location="json", required=True)
user_register_post_args.add_argument("dob", type=str, help="DOB missing", location="json", required=True)

# User update arguments
# These are the arguments the user needs to provide to complete their account.
user_update_post_args = reqparse.RequestParser()
user_update_post_args.add_argument("full_name", type=str, help="Full name missing", location="json", required=True)
user_update_post_args.add_argument("id_number", type=str, help="ID number missing", location="json", required=True)
user_update_post_args.add_argument("phone_number", type=str, help="Phone number missing", location="json", required=True)
user_update_post_args.add_argument("home_address", type=str, help="Home address missing", location="json", required=True)
user_update_post_args.add_argument("insurance_name", type=str, help="Insurance name missing", location="json", required=True)
user_update_post_args.add_argument("insurance_number", type=str, help="Insurance number missing", location="json", required=True)
user_update_post_args.add_argument("license_plate", type=str, help="License plate number missing", location="json", required=True)
