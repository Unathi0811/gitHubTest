//welcome page js

//styling the login button and register button  
document.getElementById("Login").addEventListener("click", function(){
    window.location.href = "login.html";
});

document.getElementById("Register").addEventListener("click", function(){
    window.location.href = "Register.html";
});
//register in progress though
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.querySelector('input[name="username"]').value;
        const email = document.querySelector('input[name="email"]').value;
        const password = document.querySelector('input[name="password"]').value;
        const is_nanny = document.querySelector('input[name="is_nanny"]').checked;

        const data = {
            username: username,
            email: email,
            password: password,
            is_nanny: is_nanny
        };

        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Registration successful!');
                window.location.href = '/login';
            } else {
                alert('Registration failed. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Something went wrong. Please try again.');
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    console.log("Sign Up Button:", signUpButton);
    console.log("Sign In Button:", signInButton);
    console.log("Container:", container);

    signUpButton.addEventListener('click', function() {
        console.log("Sign Up Button Clicked");
        container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', function() {
        console.log("Sign In Button Clicked");
        container.classList.remove("right-panel-active");
    });
});


/*Styling profile*/
document.addEventListener("DOMContentLoaded", () => {
    const editProfileButtons = document.querySelectorAll(".edit-profile");
    const editProfileModal = document.getElementById("edit-profile-modal");
    const editProfileForm = document.getElementById("edit-profile-form");

    // Edit profile button click event
    editProfileButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const nannyId = button.getAttribute("data-nanny-id");
            document.getElementById("nanny-id").value = nannyId;
            editProfileModal.style.display = "block";
        });
    });

    // Modal close event
    const close = document.getElementsByClassName("close")[0];
    close.addEventListener("click", () => {
        editProfileModal.style.display = "none";
    });

    // Edit profile form submission
    editProfileForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const nannyId = document.getElementById("nanny-id").value;
        const name = document.getElementById("name").value;
        const experience = document.getElementById("experience").value;
        const certifications = document.getElementById("certifications").value;
        const availability = document.getElementById("availability").value;
        const pricing = document.getElementById("pricing").value;

        console.log(`Nanny ${nannyId} updated:`, {
            name,
            experience,
            certifications,
            availability,
            pricing,
        });

        // Clear form fields after submission
        editProfileForm.reset();

        // Hide the modal
        editProfileModal.style.display = "none";
    });

    // For demo purposes, display a message instead of submitting the form
    window.addEventListener("message", (event) => {
        if (event.data.type && event.data.type === "formSubmit") {
            const message = document.createElement("div");
            message.textContent = "Profile saved!";
            message.style.backgroundColor = "green";
            message.style.color = "white";
            message.style.padding = "10px";
            message.style.position = "fixed";
            message.style.top = "20px";
            message.style.left = "50%";
            message.style.transform = "translateX(-50%)";
            message.style.borderRadius = "4px";
            document.body.appendChild(message);

            setTimeout(() => {
                message.remove();
            }, 3000);
        }
    });
});


/*Styling landing page*/
const hero = document.querySelector('.hero');
const about = document.querySelector('.about');
const services = document.querySelector('.services');
const testimonials = document.querySelector('.testimonials');
const contact = document.querySelector('.contact');

const sections = [hero, about, services, testimonials, contact];

const scrollToSection = (section) => {
    const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
    });
}

const handleScroll = (event) => {
    const scrollPosition = window.pageYOffset;
    sections.forEach((section, index) => {
        if (scrollPosition >= section.offsetTop - 100) {
            sections.forEach((s) => s.classList.remove('active'));
            section.classList.add('active');
        }
    });
}

const handleClick = (event) => {
    const target = event.target.closest('a');
    if (target) {
        const sectionId = target.getAttribute('href');
        const section = document.querySelector(sectionId);
        scrollToSection(section);
    }
}

window.addEventListener('scroll', handleScroll);
document.querySelector('nav').addEventListener('click', handleClick);






// Function to get all nannies
function getNannies() {
    // Replace this with actual API call or Firebase function
    // This is just a placeholder for demonstration purposes
    fetch('/api/nannies')
        .then(response => response.json())
        .then(nannies => {
            const nannyList = document.getElementById('nannies');
            nannies.forEach(nanny => {
                const listItem = document.createElement('li');
                listItem.textContent = `${nanny.name} - ${nanny.email}`;
                nannyList.appendChild(listItem);
            });
        });
}



// Function to add a new nanny
function addNanny(event) {
    event.preventDefault();
    const form = document.getElementById('add-nanny-form');
    const nanny = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        age: form.age.value,
        experience: form.experience.value,
        bio: form.bio.value
    };
    // Replace this with actual API call or Firebase function
    // This is just a placeholder for demonstration purposes
    fetch('/api/nannies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nanny)
    })
        .then(response => response.json())
        .then(nanny => {
            const nannyList = document.getElementById('nannies');
            const listItem = document.createElement('li');
            listItem.textContent = `${nanny.name} - ${nanny.email}`;
            nannyList.appendChild(listItem);
            form.reset();
        });
}

// Add event listener for form submission
document.getElementById('add-nanny-form').addEventListener('submit', addNanny);




// 
// show menu | start
// 
function humburger_menu_clicked() {
    let humburgerMenuBtn = document.getElementById("humburger_menu");
    let smallScreenMenu = document.getElementById("small_screen_menu");

    humburgerMenuBtn.addEventListener("click", function(){
        console.log(
            smallScreenMenu.style.display
        )
        if( smallScreenMenu.style.display === "none" ) {
            smallScreenMenu.style.display ="block";
            smallScreenMenu.style.display ="flex";
        }
        else {
            smallScreenMenu.style.display ="none";
            smallScreenMenu.style.display ="none";
        }
    })
}

const navbarMenu = document.querySelector(".navbar .links");
const hamburgerBtn = document.querySelector(".hamburger-btn");
const hideMenuBtn = navbarMenu.querySelector(".close-btn");
const showPopupBtn = document.querySelector(".login-btn");
const formPopup = document.querySelector(".form-popup");
const hidePopupBtn = formPopup.querySelector(".close-btn");
const signupLoginLink = formPopup.querySelectorAll(".bottom-link a");

// Show mobile menu
hamburgerBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("show-menu");
});

// Hide mobile menu
hideMenuBtn.addEventListener("click", () => hamburgerBtn.click());

// Show login popup
showPopupBtn.addEventListener("click", () => {
  document.body.classList.toggle("show-popup");
});

// Hide login popup
hidePopupBtn.addEventListener("click", () => showPopupBtn.click());

// Show or hide signup form
signupLoginLink.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    formPopup.classList[link.id === "signup-link" ? "add" : "remove"](
      "show-signup"
    );
  });
});
// 
// show menu | ends
// 


