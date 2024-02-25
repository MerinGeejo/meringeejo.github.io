"use strict";

(function () {
    function CheckLogin(){
        if(sessionStorage.getItem("user")){
            $("#login").html(`<a id="logout" class="nav-link" href="#"> <i class="fas fa-sign-out-alt"></i>Logout</a>`)
        }

        $("#logout").on("click",function (){
            sessionStorage.clear();
            location.href = "login.html"
        });
    }
    function Load_header(html_data) {
        $("header").html(html_data);
        $(`li>a:contains(${document.title})`).addClass("active").attr("area-current", "page")
        CheckLogin()
    }
    function AjaxRequest(method,url,callback){


        //     Step 1: Instantiate an XHR object
        let xhr = new XMLHttpRequest();

        //     Step 2 : Open a connection to the server.
        xhr.open(method,url);

        // Step 3 : Add event listener for readystatechange event
        // The readystate event os being triggered when the
        // state of teh document being fetched changes.
        xhr.addEventListener("readystatechange",() => {
            if(xhr.readyState === 4 && xhr.status === 200){


                //     response succeeded - data is available in here only
                if(typeof callback == "function"){
                    callback(xhr.responseText)
                }else{
                    console.error("ERROR: callback not a function");
                }

            }

        });
        //     Step 4 : Send the request.
        xhr.send();
    }


    function RegisterFormValidation() {
        ValidateRegisterField("#firstName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/, "Please enter a valid First Name");
        ValidateRegisterField("#lastName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/, "Please enter a valid Last Name");
        ValidateRegisterField("#emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid Email Address");
        ValidateRegisterField("#phoneNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/, "Please enter a valid Phone Number");
        ValidateRegisterField("#username", /^[a-zA-Z0-9_-]{3,16}$/, "Please enter a valid Username (3-16 characters alphanumeric, underscores, or dashes)");
        ValidateRegisterField("#password", /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "Please enter a valid Password (at least 8 characters, including uppercase, lowercase, and numbers)");
        ValidateConfirmPassword("#password", "#confirmPassword", "Passwords do not match");
    }
    function ValidateRegisterField(input_filed_id, regular_expression, error_message){

        let messageRegisterArea = $("#messageRegisterArea").hide();

        $(input_filed_id).on("blur", function(){
            // fail validation
            let inputFieldText = $(this).val();
            if(!regular_expression.test(inputFieldText)){
                //pattern fails
                $(this).trigger("focus").trigger("select");
                messageRegisterArea.addClass("alert alert-danger").text(error_message).show();
            }else{
                // pass validation
                messageRegisterArea.removeAttr("class").hide();
            }
        })

    }

    function ValidateConfirmPassword(passwordField, confirmPasswordField, errorMessage) {
        let messageRegisterArea = $("#messageRegisterArea").hide();

        $(confirmPasswordField).on("blur", function() {
            let password = $(passwordField).val();
            let confirmPassword = $(this).val();
            if (password !== confirmPassword) {
                // Passwords do not match
                $(this).trigger("focus").trigger("select");
                messageRegisterArea.addClass("alert alert-danger").text(errorMessage).show();
            } else {
                // Passwords match
                messageRegisterArea.removeAttr("class").hide();
            }
        });
    }
    function DisplayRegisterPage(){
        console.log("Called DisplayRegisterPage()");
        RegisterFormValidation();

    }


    function DisplayHomepage() {
        console.log("Called DisplayHomePage()");
        let ExploreButton = document.getElementById("ExploreButton");
        ExploreButton.addEventListener("click", function () {
            location.href = "blog.html";
        });
    }

    function DisplayPortfolioPage() {
        const projectsData = [
            { title: 'Community Classes', description: 'Explore a variety of classes for all ages and backgrounds.', image: "../Pictures/port1.jpg" },
            { title: 'Events & Workshops', description: 'Join exciting events and workshops happening at Harmony Hub.', image: "../Pictures/port2.jpg" },
            { title: 'Community Projects', description: 'Get involved in meaningful projects that benefit the community.', image: "../Pictures/port3.jpg" },
            // Add more projects as needed
        ];

        const projectsContainer = document.getElementById('projects-container');
        const loadMoreButton = document.getElementById('load-more-btn');

        let lastIndexDisplayed = 0;

        function createProjectCard(project) {
            const projectCard = document.createElement('div');
            projectCard.classList.add('project-card');

            const projectImg = document.createElement('img');
            projectImg.src = project.image;
            projectImg.alt = project.title;
            projectImg.classList.add('project-img');

            const title = document.createElement('h3');
            title.innerText = project.title;

            const description = document.createElement('p');
            description.innerText = project.description;

            // Append the image at the top and the text at the bottom of the card
            projectCard.appendChild(projectImg);
            projectCard.appendChild(title);
            projectCard.appendChild(description);

            return projectCard;
        }




        function loadProjects(numProjects) {
            const endIndex = Math.min(lastIndexDisplayed + numProjects, projectsData.length);

            for (let i = lastIndexDisplayed; i < endIndex; i++) {
                const projectCard = createProjectCard(projectsData[i]);
                projectsContainer.appendChild(projectCard);
                lastIndexDisplayed++;
            }

            if (lastIndexDisplayed === projectsData.length) {
                loadMoreButton.style.display = 'none';
            }
        }

        loadMoreButton.addEventListener('click', function () {
            loadProjects(1); // Change 1 to the number of projects you want to load each time
        });

        // Load initial projects
        loadProjects(1); // Change 1 to the number of projects you want to load initially
    }

    function DisplayTeamPage() {
        console.log("Called DisplayTeamPage()");
        let popupButton = document.getElementById("popupButton");
        popupButton.addEventListener("click", function () {
            alert("Student at Durham college.\nComputer Programming");
        });
        let popupButton1 = document.getElementById("popupButton1");
        popupButton1.addEventListener("click", function () {
            alert("Student at Durham college.\nComputer Programming and Analysis");
        });
    }

    function DisplayServicePage() {
        console.log("Called DisplayServicePage()");
    }

    function DisplayBlogPage() {
        console.log("Called DisplayBlogPage()");
        search();
    }
    function ContactFormValidation(){
        ValidateField("#fullName",/^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/,"Please enter a valid First Name and Last Name");
        ValidateField("#contactNumber",/^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,"Please enter a valid Contact Number");
        ValidateField("#emailAddress",/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,"Please enter a valid Email Address");
    }

    /**
     * This function validates input from text field
     * @param input_filed_id
     * @param regular_expression
     * @param error_message
     *
     */
    function ValidateField(input_filed_id, regular_expression, error_message){

        let messageArea = $("#messageArea").hide();

        $(input_filed_id).on("blur", function(){
            // fail validation
            let inputFieldText = $(this).val();
            if(!regular_expression.test(inputFieldText)){
                //pattern fails
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }else{
                // pass validation
                messageArea.removeAttr("class").hide();
            }
        })

    }
    function AddFeedback(fullName, contactNumber, emailAddress, feedback, rating) {
        let contact = new core.Contact(fullName, contactNumber, emailAddress, feedback, rating);
        if (contact.serialize()) {
            let key = contact.fullName.substring(0, 1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }
    document.addEventListener("DOMContentLoaded", function () {
        const contactForm = document.getElementById("contactForm");
        const messageArea = document.getElementById("messageArea");
        const ratingInput = document.getElementById("rating");
        const stars = document.querySelectorAll(".star");
        const cancelButton = document.getElementById("cancelButton");

        // Event listener for each star
        stars.forEach(star => {
            star.addEventListener("click", function () {
                const value = parseInt(star.getAttribute("data-value"));

                // Toggle 'active' class for clicked star and set rating value
                stars.forEach(s => {
                    if (parseInt(s.getAttribute("data-value")) <= value) {
                        s.classList.add("active");
                    } else {
                        s.classList.remove("active");
                    }
                });
                ratingInput.value = value;
            });
        });
        // Event listener for cancel button
        cancelButton.addEventListener("click", function () {
            contactForm.reset(); // Reset form fields

            // Remove error message and hide message area
            messageArea.innerHTML = "";
            messageArea.style.display = "none";

            // Remove 'active' class from all stars
            stars.forEach(star => star.classList.remove("active"));
        });
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);

            // Display feedback and rating
            let message = "<p><strong>Feedback:</strong> " + formData.get('feedback') + "</p>";
            message += "<p><strong>Rating:</strong> " + formData.get('rating') + "</p>";
            messageArea.innerHTML = message;

            // Validate feedback and rating
            if (!formData.get('feedback')) {
                messageArea.innerHTML += "<p>Please enter your feedback.</p>";
                return;
            }

            if (!formData.get('rating')) {
                messageArea.innerHTML += "<p>Please provide a rating.</p>";
                return;
            }

            // Clear form fields
            contactForm.reset();

            // Remove 'active' class from all stars
            stars.forEach(star => star.classList.remove("active"));

            // Add contact with feedback and rating
            AddFeedback(formData.get('fullName'), formData.get('contactNumber'), formData.get('emailAddress'), formData.get('feedback'), formData.get('rating'));

            // Redirect to contact list page
            window.location.href = "review_list.html";
        });
    });
    function DisplayContactUsPage(){
        console.log("Called DisplayContactUsPage()");

        ContactFormValidation();


    }

    function DisplayReviewListPage() {
        console.log("Called DisplayReviewListPage()");

        if (localStorage.length > 0) {
            let reviewList = document.getElementById("reviewList");
            let data = "";

            let keys = Object.keys(localStorage);
            let index = 1;
            for (const key of keys) {
                let contactData = localStorage.getItem(key);
                let contact = new core.Contact();
                contact.deserialize(contactData);
                data += `<tr>
                        <th scope="row" class="text-center">${index}</th>
                        <td>${contact.fullName}</td>
                        <td>${contact.contactNumber}</td>
                        <td>${contact.emailAddress}</td>
                        <td>${contact.feedback}</td>
                        <td>${contact.rating}</td>
                        <td class="text-center">
                             <button value="${key}" class="btn btn-danger btn-sm delete">
                                    <i class="fas fa-trash-alt fa-sm"> Delete </i>                                                    
                             </button>
                        </td>
                    </tr>`;
                index++;
            }
            reviewList.innerHTML = data;
        }
        $("button.delete").on("click", function(){
            if(confirm("Delete Contact, Please confirm")){
                localStorage.removeItem($(this).val());

            }
            location.href = "review_list.html";
        });
    }


    document.addEventListener("DOMContentLoaded", function () {
        DisplayContactUsPage();
        DisplayReviewListPage();
    });

    function DisplayLoginPage(){
        console.log("DisplayLoginPage() Called..");

        let messageArea = $("#messageArea");
        messageArea.hide();

        $("#loginButton").on("click",function () {

            let success = false;
            let newUser = new core.User();


            // Ajax request using get.
            $.get( "./data/users.json", function(data){

                for(const user of data.users){
                    console.log(user);
                    if(username.value === user.Username && password.value === user.Password){

                        success = true;
                        newUser.fromJSON(user);
                        break;

                    }

                } //for ends
                if (success) {
                    sessionStorage.setItem("user", newUser.serialize());
                    // Show welcome message
                    messageArea
                        .removeClass("alert-danger")
                        .addClass("alert alert-success")
                        .text("Welcome, " + newUser.username + "!. You have Successfully Logged in.")
                        .show();

                    // Hide welcome message after 5 seconds
                    setTimeout(function () {
                        messageArea.hide();
                    }, 3000);

                    // Redirect to index.html after 5 seconds
                    setTimeout(function () {
                        location.href = "index.html";
                    }, 3000);
                } else {
                    $("#username").trigger("focus").trigger("select");
                    messageArea
                        .removeClass("alert-success")
                        .addClass("alert alert-danger")
                        .text("Error: Invalid Login Credentials")
                        .show();
                }
            });

        });


        $("#cancelButton").on("click",function () {
            document.forms[0].reset();
            location.href ="index.html";

        });

    }


    //Search function
    function search() {
        let searchText = document.getElementById("searchInput").value.toLowerCase();
        let searchResults = document.getElementById("searchResults");
        searchResults.innerHTML = ""; // Clear previous results

        if (searchText.trim() === "") {
            searchResults.style.display = "none";
            return;
        }

        let found = false;
        let blogCards = document.querySelectorAll(".card");

        blogCards.forEach(function (card) {
            let cardText = card.textContent.toLowerCase();
            if (cardText.includes(searchText)) {
                found = true;
                let link = document.createElement("a");
                link.href = "#" + card.id;
                link.textContent = card.querySelector("h2").textContent;
                searchResults.appendChild(link);
            }
        });

        if (found) {
            searchResults.style.display = "block";
        } else {
            searchResults.style.display = "none";
        }
    }

    function Start() {
        console.log("App Started");

        AjaxRequest("GET","header.html",Load_header);
        switch (document.title) {
            case "Home":
                DisplayHomepage();
                break;
            case "Portfolio":
                DisplayPortfolioPage();
                break;
            case "Our Services":
                DisplayServicePage();
                break;
            case "Team":
                DisplayTeamPage();
                break;
            case "Blog":
                DisplayBlogPage();
                break;
            case "Contact US":
                DisplayContactUsPage()
                break;
            case "Reviews":
                DisplayReviewListPage()
                break;
            case "Login":
                DisplayLoginPage()
                break;
            case "Register":
                DisplayRegisterPage()
                break;
        }
    }

    window.addEventListener("load", Start);

})();
