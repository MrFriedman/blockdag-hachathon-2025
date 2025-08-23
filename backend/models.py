import json
class User():
    def __init__(self, username, email, password, dob):
        self.username = username
        self.full_name = None
        self.email = email
        self.password = password # Not encrypted, "just a prototype so its fine".
        self.id_number = None
        self.phone_number = None
        self.home_address = None
        self.dob = dob

        # Probably going to have to change this later.
        # I don't know how insurance works.
        self.insurance_number = None
        self.insurance_name = None
        self.license_numbers = []
        self.incidents = [] # Stores ids of incidents
        self.notifications = []

        # Create the fake notifications
        # We're gonna just open multiple files and store as json objects.
        # I know there are more efficient ways of doing this, I'm just honestly
        # fed up with python - please for the love of god take me back to C++
        notification_file = open("util/defaultnotification1.txt")
        default_notification = json.load(notification_file)
        self.notifications.append(default_notification)
        notification_file.close()
        
        notification_file = open("util/defaultnotification2.txt")
        default_notification = json.load(notification_file)
        self.notifications.append(default_notification)
        notification_file.close()

    def getObject(self):
        return {
                "username": self.username,
                "full_name": self.full_name,
                "email": self.email,
                "password": self.password,
                "id_number": self.id_number,
                "phone_number": self.phone_number,
                "home_address": self.home_address,
                "dob": self.dob,
                "insurance_number": self.insurance_number,
                "insurance_name": self.insurance_name,
                "license_numbers": self.license_numbers,
                "notifications": self.notifications,
                "incidents": self.incidents
                }

class Notification():
    def __init__(self, incident_id, message):
        self.incident_id = incident_id
        self.message = message

    def getObject(self):
        return {
                "incident_id": self.incident_id,
                "message": self.message
                }
