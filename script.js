// ====== HAMBURGER MENU ======
const hamIcon = document.querySelector('.ham-icon');
const navBar = document.querySelector('.nav-menu');

hamIcon.addEventListener('click', () => {
navBar.classList.toggle("active");
});

// ====== SEARCH FUNCTIONALITY ======
document.addEventListener("DOMContentLoaded", function () {
const hospitalSearch = document.getElementById("hospitalSearch");
const citySearch = document.getElementById("citySearch");
const departmentSearch = document.getElementById("departmentSearch");
const searchButton = document.querySelector(".search-btn");
const hospitals = document.querySelectorAll(".partner-card");

function filterHospitals() {
const hospitalValue = hospitalSearch.value.toLowerCase().trim();
const cityValue = citySearch.value.toLowerCase().trim();
const departmentValue = departmentSearch.value.toLowerCase().trim();
let anyVisible = false;

hospitals.forEach(card => {
    const name = (card.dataset.name || "").toLowerCase();
    const city = (card.dataset.city || "").toLowerCase();
    const departments = (card.dataset.department || "").toLowerCase();

    const matchesHospital = !hospitalValue || name.includes(hospitalValue);
const matchesCity = !cityValue || city.includes(cityValue);
    const matchesDept = !departmentValue || departments.includes(departmentValue);

    if (matchesHospital && matchesCity && matchesDept) {
    card.style.display = "block";
    anyVisible = true;
    } else {
    card.style.display = "none";
    }
});

// Handle "No Results"
let message = document.getElementById("noResults");
if (!anyVisible) {
    if (!message) {
    message = document.createElement("p");
    message.id = "noResults";
    message.textContent = "No hospitals found matching your search.";
    message.style.textAlign = "center";
    message.style.color = "gray";
    message.style.marginTop = "20px";
    document.querySelector(".partners-grid").appendChild(message);
}
} else if (message) {
    message.remove();
}
}

// Trigger on button click
searchButton.addEventListener("click", (e) => {
e.preventDefault(); // prevent page refresh
filterHospitals();
});

// Optional: live filtering
hospitalSearch.addEventListener("input", filterHospitals);
citySearch.addEventListener("input", filterHospitals);
departmentSearch.addEventListener("input", filterHospitals);
});
