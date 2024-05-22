document.addEventListener('DOMContentLoaded', function() {
    const serviceContainers = document.querySelectorAll('.service');
    const nextButton = document.getElementById('nextButton');
    let selectedService = null;

    serviceContainers.forEach(function(service) {
        service.addEventListener('click', function() {
            // Remove active class from all services
            serviceContainers.forEach(function(s) {
                s.classList.remove('active');
            });

            // Add active class to the clicked service
            service.classList.add('active');

            // Store the selected service
            selectedService = service.getAttribute('data-service');
        });
    });

    nextButton.addEventListener('click', function() {
        if (selectedService) {
            // Store the selected service in the database
            storeSelectedService(selectedService);
        } else {
            alert('Please select a service.');
        }
    });

    function storeSelectedService(service) {
        // Make an AJAX request to store the selected service
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'store_selection.php');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function() {
            if (xhr.status === 200) {
                alert(xhr.responseText); // Display success or failure message
                // Redirect to the next page if needed
                window.location.href = `nextpage.html?service=${selectedService}`;
            } else {
                alert('Failed to store selected service.');
            }
        };
        xhr.send(`service=${service}`);
    }
});
