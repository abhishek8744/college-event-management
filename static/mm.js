// Data
const events = [
    {
        id: 1,
        title: 'Annual Tech Fest',
        date: 'April 10, 2025',
        location: 'College Auditorium',
        description: 'Join us for a day of workshops, talks, and exhibitions showcasing the latest in technology!',
        imageUrl: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        id: 2,
        title: 'Sports Day',
        date: 'May 5, 2025',
        location: 'College Sports Ground',
        description: 'Prepare for a day full of athletic competitions, team spirit, and healthy competition!',
        imageUrl: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        id: 3,
        title: 'Cultural Festival',
        date: 'June 15, 2025',
        location: 'College Grounds',
        description: 'A day of dance, music, food, and celebration of cultural diversity!',
        imageUrl: 'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
];

const teamMembers = [
    {
        id: 1,
        name: 'Aman Singh',
        role: 'Event Coordinators',
        imageUrl: 'https://images.pexels.com/photos/2379004/pexels-pho'
    },
    {
        id: 2,
        name: 'Uday Biswas',
        role: 'Event Coordinators',
        imageUrl: 'https://images.pexels.com/photos/2182970/pexels'
    },
    {
        id: 3,
        name: 'Abhisekh Maurya',
        role: 'Event Coordinators',
        imageUrl: 'https://images.pexels.com/photos/2681751/pexels-photo-2681751.j'
    }
];

// Login page handlers
function showLogin() {
    const loginPage = document.getElementById('loginPage');
    loginPage.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function hideLogin() {
    const loginPage = document.getElementById('loginPage');
    loginPage.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close login when clicking outside
document.getElementById('loginPage').addEventListener('click', (e) => {
    if (e.target.id === 'loginPage') {
        hideLogin();
    }
});

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    console.log('Login attempt:', { email, password });
    // Add your login logic here
});

// Create Event page handlers
function showCreateEvent() {
    const createEventPage = document.getElementById('createEventPage');
    createEventPage.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function hideCreateEvent() {
    const createEventPage = document.getElementById('createEventPage');
    createEventPage.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close create event when clicking outside
document.getElementById('createEventPage').addEventListener('click', (e) => {
    if (e.target.id === 'createEventPage') {
        hideCreateEvent();
    }
});

// Handle create event form submission
document.getElementById('createEventForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const newEvent = {
        id: events.length + 1,
        title: document.getElementById('eventTitle').value,
        date: document.getElementById('eventDate').value,
        location: document.getElementById('eventLocation').value,
        description: document.getElementById('eventDescription').value,
        imageUrl: document.getElementById('eventImage').value
    };
    
    events.push(newEvent);
    populateEvents();
    hideCreateEvent();
    document.getElementById('createEventForm').reset();
});

// Update create event button click handler
document.querySelectorAll('.create-event-btn').forEach(btn => {
    btn.setAttribute('onclick', 'showCreateEvent()');
    btn.setAttribute('href', '#');
});

// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 10) {
        header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        header.style.padding = '0.5rem 0';
    } else {
        header.style.boxShadow = 'none';
        header.style.padding = '1rem 0';
    }
});

// Populate events
function createEventCard(event) {
    return `
        <div class="event-card">
            <div class="event-image" style="background-image: url('${event.imageUrl}')"></div>
            <div class="event-content">
                <h3 class="event-title">${event.title}</h3>
                <div class="event-info">
                    <span>📅</span>${event.date}
                </div>
                <div class="event-info">
                    <span>📍</span>${event.location}
                </div>
                <button class="view-details-btn" onclick="toggleEventDetails(${event.id})">
                    View Details
                </button>
                <div class="event-details" id="details-${event.id}">
                    <p>${event.description}</p>
                    <button class="register-btn" onclick="showLogin()">Register</button>
                </div>
            </div>
        </div>
    `;
}

function populateEvents() {
    const eventGrid = document.getElementById('eventGrid');
    eventGrid.innerHTML = events.map(event => createEventCard(event)).join('');
}

// Populate team members
function createTeamMemberCard(member) {
    return `
        <div class="team-member">
            <img src="${member.imageUrl}" alt="${member.name}">
            <div class="team-member-content">
                <h3>${member.name}</h3>
                <p>${member.role}</p>
                <div class="social-links">
                    <a href="#" title="Facebook">📱</a>
                    <a href="#" title="Twitter">🐦</a>
                    <a href="#" title="Instagram">📸</a>
                </div>
            </div>
        </div>
    `;
}

function populateTeam() {
    const teamGrid = document.getElementById('teamGrid');
    teamGrid.innerHTML = teamMembers.map(member => createTeamMemberCard(member)).join('');
}

// Event details toggle
function toggleEventDetails(eventId) {
    const detailsElement = document.getElementById(`details-${eventId}`);
    detailsElement.classList.toggle('visible');
}

// Contact form handling
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    console.log('Form submitted:', formData);
    contactForm.style.display = 'none';
    formSuccess.classList.remove('hidden');
    
    // Reset form after 3 seconds
    setTimeout(() => {
        contactForm.reset();
        contactForm.style.display = 'block';
        formSuccess.classList.add('hidden');
    }, 3000);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    populateEvents();
    populateTeam();
});