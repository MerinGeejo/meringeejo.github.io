"use strict";
$(document).ready(function () {
    $("#registrationForm").submit(function (event) {
        event.preventDefault();
        let firstName=$("firstName").val();
        let lastName=$("lastName").val();
        let emailAddress=$("emailAddress").val();
        let phoneNumber=$("phoneNumber").val();
        let username = $("#username").val();
        let address=$("address").val();
        let password = $("#password").val();

        let newUser = {
            "FirstName":firstName,
            "LastName":lastName,
            "EmailAddress":emailAddress,
            "PhoneNumber":phoneNumber,
            "Username": username,
            "Address":address,
            "Password": password,
        };

        // Assuming users.json is an empty array initially
        $.getJSON("./data/users.json", function (data) {
            data.users.push(newUser);
            $.ajax({
                url: "./data/users.json",
                type: "PUT",
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function () {
                    $("#messageRegisterArea")
                        .removeClass("alert-danger")
                        .addClass("alert alert-success")
                        .text("Registration successful. You can now login.")
                        .show();
                },
                error: function () {
                    $("#messageRegisterArea")
                        .removeClass("alert-success")
                        .addClass("alert alert-danger")
                        .text("Error: Registration failed.")
                        .show();
                }
            });
        });
    });
});
