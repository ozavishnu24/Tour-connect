// UI interaction logic
document.addEventListener('DOMContentLoaded', () => {
    // Fetch all tours and display them
    fetchTours();
    // Handle create tour form submission
    const createForm = document.getElementById('create-tour-form');
    createForm.addEventListener('submit', handleCreateTour);
    // Handle update tour form submission
    const saveUpdateBtn = document.getElementById('save-update-btn');
    saveUpdateBtn.addEventListener('click', handleUpdateTour);
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 76, // Offset for fixed navbar
                    behavior: 'smooth'
                });
            }
        });
    });
    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to your backend
            // For now, we'll just show a success message
            
            showToast('Thank you for your message! We will get back to you soon.');
            
            // Reset the form
            contactForm.reset();
        });
    }
});

// Function to fetch all tours and display them
async function fetchTours() {
    try {
        const data = await apiService.getTours();
        displayTours(data.data.tour_options);
    } catch (error) {
        showToast('Failed to fetch tours', 'error');
    }
}

// Function to display tours in the table
function displayTours(tours) {
    const toursList = document.getElementById('tours-list');
    toursList.innerHTML = '';
    tours.forEach(tour => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${tour.tour_id}</td>
            <td>${tour.title}</td>
            <td>${tour.description}</td>
            <td>${tour.pick_up}</td>
            <td>${tour.meeting_point}</td>
            <td>${tour.drop_off}</td>
            <td>${tour.duration} ${tour.duration_unit}</td>
            <td>
                <button class="btn btn-sm btn-warning me-2" onclick="openUpdateModal(${JSON.stringify(tour).replace(/"/g, '&quot;')})">Update</button>
                <button class="btn btn-sm btn-danger" onclick="deleteTour(${tour.tour_id}, '${tour.title}')">Delete</button>
            </td>
        `;
        toursList.appendChild(row);
    });
}

// Function to handle create tour form submission
async function handleCreateTour(e) {
    e.preventDefault();
    
    const tourData = {
        tour_id: parseInt(document.getElementById('tour_id').value),
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        pick_up: document.getElementById('pick_up').value,
        meeting_point: document.getElementById('meeting_point').value,
        drop_off: document.getElementById('drop_off').value,
        duration: parseFloat(document.getElementById('duration').value),
        duration_unit: document.getElementById('duration_unit').value
    };
    try {
        const result = await apiService.createTour(tourData);
        showToast(result.message);
        e.target.reset();
        fetchTours();
    } catch (error) {
        showToast('Failed to create tour', 'error');
    }
}

// Function to handle update tour form submission
async function handleUpdateTour() {
    const tourId = document.getElementById('update-tour-id').value;
    const tourData = {
        title: document.getElementById('update-title').value,
        description: document.getElementById('update-description').value,
        pick_up: document.getElementById('update-pick_up').value,
        meeting_point: document.getElementById('update-meeting_point').value,
        drop_off: document.getElementById('update-drop_off').value,
        duration: parseFloat(document.getElementById('update-duration').value),
        duration_unit: document.getElementById('update-duration_unit').value
    };
    try {
        const result = await apiService.updateTour(tourId, tourData);
        showToast(result.message);
        const modal = bootstrap.Modal.getInstance(document.getElementById('updateTourModal'));
        modal.hide();
        fetchTours();
    } catch (error) {
        showToast('Failed to update tour', 'error');
    }
}

// Function to open update modal and populate with tour data
function openUpdateModal(tour) {
    document.getElementById('update-tour-id').value = tour.tour_id;
    document.getElementById('update-title').value = tour.title;
    document.getElementById('update-description').value = tour.description;
    document.getElementById('update-pick_up').value = tour.pick_up;
    document.getElementById('update-meeting_point').value = tour.meeting_point;
    document.getElementById('update-drop_off').value = tour.drop_off;
    document.getElementById('update-duration').value = tour.duration;
    document.getElementById('update-duration_unit').value = tour.duration_unit;
    const modal = new bootstrap.Modal(document.getElementById('updateTourModal'));
    modal.show();
}

// Function to delete a tour
async function deleteTour(tourId, tourTitle) {
    if (confirm(`Are you sure you want to delete "${tourTitle}"?`)) {
        try {
            const result = await apiService.deleteTour(tourId);
            showToast(result.message);
            fetchTours();
        } catch (error) {
            showToast('Failed to delete tour', 'error');
        }
    }
}

// Function to show toast notification
function showToast(message, type = 'success') {
    const toastEl = document.getElementById('liveToast');
    const toastMessage = document.getElementById('toast-message');
    
    toastMessage.textContent = message;
    
    // Set toast color based on type
    if (type === 'error') {
        toastEl.classList.add('bg-danger');
        toastEl.classList.remove('bg-success');
    } else {
        toastEl.classList.add('bg-success');
        toastEl.classList.remove('bg-danger');
    }
    
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}