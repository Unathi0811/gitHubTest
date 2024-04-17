//welcome page js
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.getElementById('sidebar');

sidebarToggle.addEventListener('click', () => {
  sidebar.classList.toggle('visible');
});

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


/*Styling welcome page*/
const form = document.querySelector('main form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

 
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    alert('Please fill out all fields.');
    return;
  }

  // validate email format
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  form.submit();
});


//styling the send button in the ABOUT US link
document.addEventListener('DOMContentLoaded', function() {
  // Get the send WhatsApp button element
  var sendWhatsAppButton = document.getElementById('sendWhatsApp');

  // Add event listener for button click
  sendWhatsAppButton.addEventListener('click', function() {
      // Define the message
      var message = 'Hello, this is a message from a visitor of NANNY CO. website!';

      // Generate the WhatsApp group chat URL
      var whatsappUrl = 'https://chat.whatsapp.com/En47tTayMF1K8MrCXsypQe'; 
      
      // Open WhatsApp group chat in a new tab/window
      window.open(whatsappUrl, '_blank');
  });
});




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