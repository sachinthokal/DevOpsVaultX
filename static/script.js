let currentCategory = 'all';
let toolsData = [];

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('static/data.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        toolsData = await response.json();
        renderCards();
    } catch (error) {
        console.error("Error loading JSON data:", error);
        document.getElementById('grid-container').innerHTML = `<p style="color: #ff2a5f; text-align: center; width: 100%;">Failed to load data. Please ensure local server is running.</p>`;
    }
});

function renderCards() {
    const grid = document.getElementById('grid-container');
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

        // 🟢 FIX: Changed <h3 class="tool-title"> to <h2 class="tool-title"> to fix sequential heading order
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
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`tab-${category}`).classList.add('active');
    filterHub();
}

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

    document.getElementById('no-results').classList.toggle('hidden', matchedCount !== 0);
}

function clearSearchFilters() {
    document.getElementById('engine-search').value = '';
    setCategory('all');
}

const text1 = "Skip the search.";
const text2 = "Premium Modern Tools For Everyone.";
const line1 = document.getElementById("type-line-1");
const line2 = document.getElementById("type-line-2");
let i = 0, j = 0;

function typeEffect() {
    if (i < text1.length) {
        line1.innerHTML += text1.charAt(i); i++;
        setTimeout(typeEffect, 50);
    } else if (j < text2.length) {
        line2.innerHTML += text2.charAt(j); j++;
        setTimeout(typeEffect, 50);
    }
}
window.onload = () => setTimeout(typeEffect, 500);