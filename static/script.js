let currentCategory = 'all';
let toolsData = [];

window.addEventListener('DOMContentLoaded', async () => {
    const grid = document.getElementById('grid-container');
    
    // Safety Check: If grid-container doesn't exist (e.g., on a tool page), stop execution immediately
    if (!grid) return;

    try {
        // Path Fix: Added a leading slash '/' to consistently fetch from the root directory across all sub-URLs
        const response = await fetch('/static/data.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        toolsData = await response.json();
        renderCards();
    } catch (error) {
        console.error("Error loading JSON data:", error);
        grid.innerHTML = `<p style="color: #ff2a5f; text-align: center; width: 100%;">Failed to load data. Please ensure local server is running.</p>`;
    }
});

function renderCards() {
    const grid = document.getElementById('grid-container');
    // Safety Check: Ensure the grid exists before manipulating its innerHTML
    if (!grid) return;

    grid.innerHTML = '';

    toolsData.forEach(tool => {
        const isDisabled = tool.status === 'disabled';
        const cardTag = isDisabled ? 'div' : 'a';
        
        const actionUrlAttr = isDisabled 
            ? 'aria-disabled="true"' 
            : `href="${tool.actionUrl}" target="_blank" rel="noopener noreferrer" aria-label="Launch ${tool.title}"`;

        let cardClasses = isDisabled ? "bento-card disabled" : "bento-card";
        
        let buttonHTML = isDisabled 
            ? `<span class="open-btn">Coming Soon <i class="fa-solid fa-lock" aria-hidden="true" style="margin-left: 4px;"></i></span>`
            : `<span class="open-btn">Launch <i class="fa-solid fa-arrow-right" aria-hidden="true" style="margin-left: 4px;"></i></span>`;

        const cardHTML = `
            <${cardTag} ${actionUrlAttr} class="${cardClasses}" data-category="${tool.category}" data-search="${tool.searchTags}">
                <div class="card-content">
                    <div class="card-header">
                        <span class="tool-badge" style="background: ${tool.badgeBg}; color: ${tool.badgeColor}; border-color: ${tool.badgeBorder};">${tool.badge}</span>
                        <span class="time-tag">${tool.duration}</span>
                    </div>
                    <h2 class="tool-title">${tool.title}</h2>
                    <p class="tool-desc">${tool.desc}</p>
                </div>
                <div class="card-footer">
                    <span class="metric" style="color: ${tool.metricColor};">
                        <i class="${tool.metricIcon}" aria-hidden="true" style="margin-right: 4px;"></i> ${tool.friendlyMetric}
                    </span>
                    ${buttonHTML}
                </div>
            </${cardTag}>
        `;
        grid.insertAdjacentHTML('beforeend', cardHTML);
    });

    document.querySelectorAll('.bento-card').forEach(card => {
        card.onmousemove = e => {
            const rect = card.getBoundingClientRect(),
                  x = e.clientX - rect.left,
                  y = e.clientY - rect.top;
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        }
    });

    filterHub();
}

function setCategory(category) {
    currentCategory = category;
    const tabBtn = document.getElementById(`tab-${category}`);
    // Safety Check: Ensure the tab button exists before toggling classes
    if (!tabBtn) return;

    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    tabBtn.classList.add('active');
    filterHub();
}

function filterHub() {
    const searchInput = document.getElementById('engine-search');
    const noResults = document.getElementById('no-results');
    
    // Safety Check: Exit if search elements don't exist on the current page
    if (!searchInput || !noResults) return;

    const query = searchInput.value.toLowerCase().trim();
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

    noResults.classList.toggle('hidden', matchedCount !== 0);
}

function clearSearchFilters() {
    const searchInput = document.getElementById('engine-search');
    if (searchInput) searchInput.value = '';
    setCategory('all');
}

// --- Typing Effect Setup ---
const text1 = "Skip the search.";
const text2 = "premium modern tools for everyone !!";
const line1 = document.getElementById("type-line-1");
const line2 = document.getElementById("type-line-2");

let i = 0, j = 0;
const speed = 100; 
const pause = 1000; 

function typeEffect() {
    // Safety Check: If typing elements do not exist on the current page, exit cleanly without throwing errors
    if (!line1 || !line2) return;

    if (i < text1.length) {
        line1.innerHTML += text1.charAt(i); 
        i++;
        setTimeout(typeEffect, speed);
    } 
    else if (i === text1.length && j === 0) {
        i++;
        setTimeout(typeEffect, pause); 
    } 
    else if (j < text2.length) {
        line2.innerHTML += text2.charAt(j); 
        j++;
        setTimeout(typeEffect, speed);
    }
}

// Safe Event Listener: Only trigger the typing animation if the elements are present on the current DOM
window.addEventListener('load', () => {
    if (line1 || line2) {
        setTimeout(typeEffect, 500);
    }
});