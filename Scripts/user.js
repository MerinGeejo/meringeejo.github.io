"use strict";


(function (core) {

    class User {
        get displayName() {
            return this._displayName;
        }

        set displayName(value) {
            this._displayName = value;
        }

        get emailAddress() {
            return this._emailAddress;
        }

        set emailAddress(value) {
            this._emailAddress = value;
        }

        get username() {
            return this._username;
        }

        set username(value) {
            this._username = value;
        }


        constructor(displayName = "", emailAddress = "", username ="",password = "") {
            this._displayName = displayName;
            this._emailAddress = emailAddress;
            this._username = username;
            this._password = password;
        }



        toString() {
            return `DisplayName: ${this._displayName}\nEmailAddress: ${this._emailAddress}\n 
            Username: ${this._username}`

        }

        /**
         Serialize for writing to localStorage
         */
        serialize() {
            if (this._displayName !== "" && this._emailAddress !== "" && this._username !== "") {
                return `${this._displayName},${this._emailAddress},${this._username}`;
            }
            console.error("One or more of the Contact properties is missing or invalid.");
            return null;
        }

        /**
         Deserialize is used to read data from localStorage
         */
        deserialize(data) {
            let propertyArray = data.split(",");
            this._displayName = propertyArray[0];
            this._emailAddress = propertyArray[1];
            this._username = propertyArray[2];
        }

        toJSON(){
            return {
                DisplayName : this._displayName,
                EmailAddress : this._emailAddress,
                Username : this._username,
                Password : this._password
            }
        }

        fromJSON(data){
            this._displayName = data.DisplayName;
            this._emailAddress = data.EmailAddress;
            this._username = data.Username;
            this._password = data.Password;

        }
    }
    //namespace definition
    core.User = User;
})(core ||(core={}));