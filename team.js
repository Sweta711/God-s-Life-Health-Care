const teamData = [
    {
    name: "Dr. Sandukh Ruit",
    title: "MD, Primary Care Physician",
    specialties: ["Primary Care", "Preventive Care"],
    image: "https://www.aljazeera.com/wp-content/uploads/2021/04/AP21097245248453.jpg?fit=1170%2C780&quality=80",
    alt: "Dr. Sandukh Ruit, MD",
    description: "Dr. Sandukh is a dedicated general practitioner focused on comprehensive health management. His philosophy centers on proactive, preventative care to maintain long-term wellness for all his patients. He holds board certification in Internal Medicine and has been practicing for over a decade in the community.",
    titleDisplay: "Primary Care & Internal Medicine"
    },
    {
    name: "Dr. Sneha Pandey",
    title: "MD, Obstetrician and Gynecologist",
    specialties: ["Obstetrics", "Gynecology", "Women's Health"],
    image: "https://www.nepalmediciti.com/images/doctors/8790.jpg",
    alt: "Dr. Sneha Pandey, MD",
    description: "Dr. Sneha  is a member of the American College of Obstetrics and Gynecology and the Florida Obstetrics and Gynecology Society. She was born in California and speaks fluent English, Vietnamese and Spanish. With 12 years in practice and an average rating of 4.8 on healthgrades, she is a trusted figure in women's healthcare.",
    titleDisplay: "Obstetrics and Gynecology Specialist"
    },
    {
    name: "Dr. Gowardhan Sharma",
    title: "NP, Nurse Practitioner",
    specialties: ["Geriatrics", "Infectious Disease"],
    image: "https://nepalpaincarecenter.com/wp-content/uploads/2020/12/dr.-shirish-1.png",
    alt: "Dr. Gowardhan Sharma, NP",
    description: "Dr. Gowardhan is a specialized Nurse Practitioner focusing on the unique needs of geriatric patients, ensuring they receive compassionate and effective long-term care. He also works on educating the community about infectious disease prevention.",
    titleDisplay: "Geriatric & Infectious Disease Care"
    },
    {
    name: "Dr. Samrath Shrestha",
    title: "LPN, Licensed Practical Nurse",
    specialties: ["Triage", "Patient Education"],
    image: "https://api.cmh.com.np/media/filer_public/ad/cf/adcf3176-472f-42d8-a991-8edbf5f738da/kovid_nepal.jpeg",
    alt: "Dr. Samrath Shrestha, LPN",
    description: "Dr. Samrath is a key member of our triage team, expertly assessing patient needs and providing initial care. She also leads our patient education workshops, empowering individuals to take control of their health.",
    titleDisplay: "Licensed Practical Nurse"
    },
    {
    name: "Dr. Binod Chaudhary",
    title: "Dermatologist",
    specialties: ["Dermatology", "Cosmetic Procedures", "Skin Cancer Screening"],
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    alt: "Dr. Binod Chaudhary",
    description: "Dr. A leading dermatologist, Dr. Chaudhary offers a full range of services from medical dermatology to the latest in cosmetic procedures. He is highly skilled in early detection and treatment of skin cancer.",
    titleDisplay: "Specialist in Dermatology"
    }
];

let currentIndex = 0;
const totalProfiles = teamData.length;

const cardStackEl = document.getElementById('card-stack');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageIndicator = document.getElementById('page-indicator');
const detailOverlayEl = document.getElementById('detail-view-overlay');
const detailRightEl = document.getElementById('detail-right');
const detailLeftEl = document.getElementById('detail-left');
const detailImageEl = document.getElementById('detail-image');
const detailFirstNameEl = document.getElementById('detail-first-name');
const detailLastNameEl = document.getElementById('detail-last-name');
const detailDescriptionEl = document.getElementById('detail-description-content');
const closeDetailBtn = document.getElementById('close-detail-btn');

const meetText = document.getElementById('meet-text');
const ourText = document.getElementById('our-text');
const teamText = document.getElementById('team-text');

let isAnimating = false;
const isMobile = window.matchMedia("(max-width: 1023px)").matches;
const ANIMATION_DURATION = 600;

function animateText() {
    meetText.classList.remove('text-animate-meet');
    ourText.classList.remove('text-animate-our');
    teamText.classList.remove('text-animate-team');
    setTimeout(() => {
    meetText.classList.add('text-animate-meet');
    ourText.classList.add('text-animate-our');
    teamText.classList.add('text-animate-team');
    }, 50);
}

function createCardElements() {
    cardStackEl.innerHTML = '';
    teamData.forEach((profile, index) => {
    const cardEl = document.createElement('div');
    cardEl.classList.add('profile-card');
    cardEl.setAttribute('data-index', index);

    const specialtiesHTML = profile.specialties.map(
        (spec) => `<span class="specialty">${spec}</span>`
    ).join('');

    cardEl.innerHTML = `
        <img src="${profile.image}" alt="${profile.alt}" class="profile-image">
        <div class="profile-content">
        <h2 class="profile-name">${profile.name}</h2>
        <p class="profile-title">${profile.title}</p>
        <div class="profile-specialties">${specialtiesHTML}</div>
        </div>
    `;

    cardEl.addEventListener('click', (e) => {
        if (cardEl.classList.contains('active')) {
        showProfileDetail(e, index);
        }
    });

    cardStackEl.appendChild(cardEl);
    });
    updateCardClasses();
}

function updateCardClasses() {
    const cards = document.querySelectorAll('.profile-card');
    prevBtn.disabled = currentIndex === 0 || isAnimating;
    nextBtn.disabled = currentIndex >= totalProfiles - 1 || isAnimating;
    pageIndicator.textContent = `${currentIndex + 1} / ${totalProfiles}`;

    cards.forEach((card, index) => {
    card.classList.remove('active', 'next-1', 'next-2', 'hidden');
    if (index === currentIndex) card.classList.add('active');
    else if (!isMobile && index === currentIndex + 1) card.classList.add('next-1');
    else if (!isMobile && index === currentIndex + 2) card.classList.add('next-2');
    else card.classList.add('hidden');
    });
}

function nextProfile() {
    if (currentIndex < totalProfiles - 1 && !isAnimating) {
    isAnimating = true;
    currentIndex++;
    updateCardClasses();
    animateText();
    setTimeout(() => { isAnimating = false; updateCardClasses(); }, ANIMATION_DURATION);
    }
}

function prevProfile() {
    if (currentIndex > 0 && !isAnimating) {
    isAnimating = true;
    currentIndex--;
    updateCardClasses();
    animateText();
    setTimeout(() => { isAnimating = false; updateCardClasses(); }, ANIMATION_DURATION);
    }
}

function showProfileDetail(event, index) {
    if (isAnimating || detailOverlayEl.classList.contains('visible')) return;
    const cardEl = document.querySelector(`.profile-card[data-index="${index}"]`);
    const imageEl = cardEl.querySelector('.profile-image');
    const rect = imageEl.getBoundingClientRect();

    detailImageEl.src = imageEl.src;
    detailImageEl.style.width = `${rect.width}px`;
    detailImageEl.style.height = `${rect.height}px`;
    detailImageEl.style.top = `${rect.top}px`;
    detailImageEl.style.left = `${rect.left}px`;
    detailImageEl.style.opacity = '1';

    detailOverlayEl.classList.add('visible');
    document.body.style.overflow = 'hidden';

    const [firstName, lastName] = teamData[index].name.split(" ");
    detailFirstNameEl.textContent = firstName;
    detailLastNameEl.textContent = lastName;
    detailDescriptionEl.innerHTML = `
    <h2>${teamData[index].titleDisplay}</h2>
    <p>${teamData[index].description}</p>
    `;

    setTimeout(() => {
    detailLeftEl.classList.add('expanded-image-final');
    detailRightEl.classList.add('visible-content');
    }, 100);
}

function closeProfileDetail() {
    detailOverlayEl.classList.remove('visible');
    detailLeftEl.classList.remove('expanded-image-final');
    detailRightEl.classList.remove('visible-content');
    detailImageEl.src = '';
    document.body.style.overflow = '';
}

prevBtn.addEventListener('click', prevProfile);
nextBtn.addEventListener('click', nextProfile);
closeDetailBtn.addEventListener('click', closeProfileDetail);

window.onload = function () {
    createCardElements();
    animateText();
};