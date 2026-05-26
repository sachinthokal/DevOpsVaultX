let currentCategory = 'all';
let toolsData = []; // Data will be populated from JSON

// 1. Fetch JSON and render cards dynamically
window.addEventListener('DOMContentLoaded', async () => {
    try {
        // 🟢 फक्त इथे बदल केला आहे. पाथ 'static/data.json' असा दिला आहे.
        const response = await fetch('static/data.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        toolsData = await response.json();
        renderCards();
    } catch (error) {
        console.error("Error loading JSON data:", error);
        document.getElementById('grid-container').innerHTML = `<p class="text-red-400 text-center w-full col-span-full">Failed to load data. Ensure you are running a local server.</p>`;
    }
});

function renderCards() {
    const grid = document.getElementById('grid-container');
    grid.innerHTML = ''; 

    toolsData.forEach(tool => {
        const cardHTML = `
            <a href="${tool.actionUrl}" target="_blank" class="bento-card group block rounded-2xl p-6 flex flex-col justify-between cursor-pointer no-underline" 
                 data-category="${tool.category}" 
                 data-search="${tool.searchTags}">
                <div>
                    <div class="flex items-center justify-between mb-4">
                        <span class="text-[10px] px-2.5 py-1 rounded-full font-bold border uppercase tracking-wider ${tool.badgeStyle}">
                            ${tool.badge}
                        </span>
                        <div class="flex items-center space-x-1.5 text-[11px] text-gray-500 font-medium">
                            <span>${tool.duration}</span>
                        </div>
                    </div>
                    <h3 class="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-brand-primary transition-colors">${tool.title}</h3>
                    <p class="text-gray-400 text-xs leading-relaxed mb-6">${tool.desc}</p>
                </div>
                <div class="flex items-center justify-between pt-4 border-t border-brand-border/40">
                    <span class="text-xs font-bold ${tool.metricStyle}">
                        <i class="${tool.metricIcon} mr-1.5"></i> ${tool.friendlyMetric}
                    </span>
                    <span class="px-3.5 py-1.5 bg-brand-border/60 group-hover:bg-brand-primary text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center">
                        Open Tool <i class="fa-solid fa-arrow-up-right-from-square ml-1.5 text-[10px]"></i>
                    </span>
                </div>
            </a>
        `;
        grid.insertAdjacentHTML('beforeend', cardHTML);
    });
    
    filterHub();
}

// 2. Navigation Tab filter controller logic
function setCategory(category) {
    currentCategory = category;
    
    document.querySelectorAll('.hub-pill').forEach(btn => {
        btn.classList.remove('active-pill');
    });
    document.getElementById(`tab-${category}`).classList.add('active-pill');

    filterHub();
}

// 3. Search & Category filter logic engine
function filterHub() {
    const query = document.getElementById('engine-search').value.toLowerCase().trim();
    const cards = document.querySelectorAll('.bento-card');
    let matchedCount = 0;

    cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        const cardMeta = card.getAttribute('data-search');

        const matchesCat = (currentCategory === 'all' || cardCat === currentCategory);
        const matchesSearch = cardMeta.includes(query);

        if (matchesCat && matchesSearch) {
            card.classList.remove('hidden');
            matchedCount++;
        } else {
            card.classList.add('hidden');
        }
    });

    const notice = document.getElementById('no-results');
    if (matchedCount === 0) {
        notice.classList.remove('hidden');
    } else {
        notice.classList.add('hidden');
    }
}

function clearSearchFilters() {
    document.getElementById('engine-search').value = '';
    setCategory('all');
}


const text1 = "Skip the search.";
const text2 = "Simplified Modern Tools For Everyone.";

const line1Element = document.getElementById("type-line-1");
const line2Element = document.getElementById("type-line-2");

let i = 0;
let j = 0;
const typingSpeed = 80; 

function typeEffect() {
    if (i < text1.length) {
        line1Element.innerHTML += text1.charAt(i);
        i++;
        setTimeout(typeEffect, typingSpeed);
    } 
    else if (j < text2.length) {
        line2Element.innerHTML += text2.charAt(j);
        j++;
        setTimeout(typeEffect, typingSpeed);
    }
}

window.onload = () => {
    setTimeout(typeEffect, 500);
};