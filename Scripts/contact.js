"use strict";


(function (core) {

    class Contact {


        constructor(fullName = "", contactNumber = "", emailAddress = "", feedback="",rating='') {
            this._fullName = fullName;
            this._contactNumber = contactNumber;
            this._emailAddress = emailAddress;
            this._feedback=feedback;
            this._rating=rating;
        }

        get fullName() {
            return this._fullName;
        }

        set fullName(value) {
            this._fullName = value;
        }

        get contactNumber() {
            return this._contactNumber;
        }

        set contactNumber(value) {
            this._contactNumber = value;
        }

        get emailAddress() {
            return this._emailAddress;
        }

        set emailAddress(value) {
            this._emailAddress = value;
        }
        get feedback() {
            return this._feedback;
        }

        set feedback(value) {
            this._feedback = value;
        }
        get rating() {
            return this._rating;
        }

        set rating(value) {
            this._rating = value;
        }

        toString() {
            return `FullName: ${this._fullName}\nContact Number: ${this._contactNumber}\n 
            EmailAddress: ${this._emailAddress}\nFeedback: ${this._feedback}\nRating: ${this._rating}`

        }

        /**
         Serialize for writing to localStorage
         */
        serialize() {
            if (this._fullName !== "" && this._contactNumber !== "" && this._emailAddress !== ""&& this._feedback !== ""&& this._rating !== "") {
                return `${this._fullName},${this._contactNumber},${this._emailAddress},${this._feedback},${this._rating}`;
            }
            console.error("One or more of the Contact properties is missing or invalid.");
            return null;
        }

        /**
         Deserialize is used to read data from localStorage
         */
        deserialize(data) {
            let propertyArray = data.split(",");
            this._fullName = propertyArray[0];
            this._contactNumber = propertyArray[1];
            this._emailAddress = propertyArray[2];
            this._feedback=propertyArray[3];
            this._rating=propertyArray[4];
        }
    }
    //namespace definition
    core.Contact = Contact;
})(core ||(core={}));