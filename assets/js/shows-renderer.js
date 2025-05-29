// Cúlra Shows Renderer
// Handles dynamic rendering of shows data

class ShowsRenderer {
    constructor() {
        this.utils = ShowsUtils;
    }

    // Render shows preview for homepage
    renderHomepagePreview(containerId = 'shows-preview') {
        const container = document.getElementById(containerId);
        if (!container) return;

        const featuredShows = this.utils.getFeaturedShows();
        
        if (featuredShows.length === 0) {
            container.innerHTML = '<p>No upcoming shows scheduled.</p>';
            return;
        }

        container.innerHTML = featuredShows.map(show => {
            const dateInfo = this.utils.formatDate(show.date);
            
            return `
                <div class="show-item">
                    <div class="show-date">
                        <span class="month">${dateInfo.month}</span>
                        <span class="day">${dateInfo.day}</span>
                    </div>
                    <div class="show-info">
                        <h3>${show.venue}</h3>
                        <p>${show.city}, ${show.state}</p>
                        <span class="show-time">${show.time}</span>
                    </div>
                    <div class="show-status">
                        ${show.detailsUrl ? 
                            `<a href="${show.detailsUrl}" class="ticket-link" target="_blank" rel="noopener">Details</a>` :
                            `<span class="info-text">More info coming</span>`
                        }
                    </div>
                </div>
            `;
        }).join('');
    }

    // Render full shows page
    renderShowsPage() {
        this.renderUpcomingShows();
        this.renderPastShows();
    }

    // Render upcoming shows section
    renderUpcomingShows(containerId = 'upcoming-shows-grid') {
        const container = document.getElementById(containerId);
        if (!container) return;

        const upcomingShows = this.utils.getUpcomingShows();
        
        if (upcomingShows.length === 0) {
            container.innerHTML = `
                <div class="no-shows">
                    <p>No upcoming shows scheduled at the moment.</p>
                    <p><a href="https://instagram.com/culraband" target="_blank" rel="noopener" class="cta-button">Follow on Instagram for Announcements</a></p>
                </div>
            `;
            return;
        }
                
        container.innerHTML = upcomingShows.map(show => {
            return this.renderShowCard(show);
        }).join('');
    }

    // Render individual show card
    renderShowCard(show) {
        const dateInfo = this.utils.formatDate(show.date);
        
        return `
            <div class="show-card" data-show-id="${show.id}">
                <div class="show-header">
                    <div class="show-date-large">
                        <span class="month">${dateInfo.month}</span>
                        <span class="day">${dateInfo.day}</span>
                        <span class="year">${dateInfo.year}</span>
                    </div>
                </div>
                
                <div class="show-details">
                    <h3>${show.venue}</h3>
                    <p class="show-venue">${this.utils.getShowTypeLabel(show.type)}</p>
                    <p class="show-location">${show.city}, ${show.state}</p>
                    <p class="show-time">Show time: ${show.time}</p>
                    <p class="show-description">${show.description}</p>
                </div>
                
                <div class="show-actions">
                    ${this.renderShowActions(show)}
                </div>
            </div>
        `;
    }

    // Render show action buttons
    renderShowActions(show) {
        let actions = [];
        
        // Details/Tickets button
        if (show.detailsUrl) {
            actions.push(`
                <a href="${show.detailsUrl}" 
                   class="ticket-button" 
                   target="_blank" 
                   rel="noopener"
                   onclick="trackShowClick('${show.id}', 'details')">
                    Event Details
                </a>
            `);
        }
        
        // Venue info button
        if (show.venueUrl) {
            actions.push(`
                <a href="${show.venueUrl}" 
                   class="info-button" 
                   target="_blank" 
                   rel="noopener"
                   onclick="trackShowClick('${show.id}', 'venue')">
                    Venue Info
                </a>
            `);
        }
        
        // Add to calendar button
        if (this.utils.isUpcoming(show.date)) {
            actions.push(`
                <button class="info-button" onclick="addToCalendar('${show.id}')">
                    Add to Calendar
                </button>
            `);
        }
        
        return actions.join('');
    }

    // Render past shows section
    renderPastShows(containerId = 'past-shows-list') {
        const container = document.getElementById(containerId);
        if (!container) return;

        const pastShows = this.utils.getPastShows().slice(0, 10); // Limit to 10 most recent
        
        if (pastShows.length === 0) {
            container.innerHTML = '<p>No past shows to display.</p>';
            return;
        }

        container.innerHTML = pastShows.map(show => {
            const dateInfo = this.utils.formatDate(show.date);
            
            return `
                <div class="past-show-item" data-show-id="${show.id}">
                    <div class="past-show-info">
                        <h4>${show.venue}</h4>
                        <p>${show.city}, ${show.state} • ${dateInfo.full}</p>
                    </div>
                    <div class="past-show-date">
                        ${dateInfo.month} ${dateInfo.day}, ${dateInfo.year}
                    </div>
                </div>
            `;
        }).join('');
    }

    // Filter shows (for future search functionality)
    renderFilteredShows(shows, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (shows.length === 0) {
            container.innerHTML = '<p>No shows match your criteria.</p>';
            return;
        }

        container.innerHTML = shows.map(show => {
            return this.renderShowCard(show);
        }).join('');
    }

    // Search functionality
    renderSearchResults(query, containerId = 'search-results') {
        const results = this.utils.searchShows(query);
        this.renderFilteredShows(results, containerId);
    }
}

// Analytics and interaction tracking
function trackShowClick(showId, clickType) {
    // Add your analytics tracking here
    console.log(`${clickType} link clicked for show: ${showId}`);
    
    // Example: Google Analytics
    // gtag('event', 'show_click', {
    //     'show_id': showId,
    //     'click_type': clickType,
    //     'event_category': 'shows'
    // });
}

function addToCalendar(showId) {
    const show = ShowsUtils.getShowById(showId);
    if (!show) return;
    
    // Create calendar event
    const showDate = ShowsUtils.parseDate(show.date);
    const [timeStr, period] = show.time.split(' ');
    const [hours, minutes] = timeStr.split(':');
    let hour24 = parseInt(hours);
    
    // Convert to 24-hour format
    if (period === 'PM' && hour24 !== 12) {
        hour24 += 12;
    } else if (period === 'AM' && hour24 === 12) {
        hour24 = 0;
    }
    
    const startDate = new Date(showDate);
    startDate.setHours(hour24, parseInt(minutes || 0), 0, 0);
    
    const endDate = new Date(startDate.getTime() + (3 * 60 * 60 * 1000)); // 3 hours later
    
    const calendarUrl = createGoogleCalendarUrl({
        title: `Cúlra at ${show.venue}`,
        start: startDate,
        end: endDate,
        location: `${show.venue}, ${show.city}, ${show.state}`,
        description: show.description + (show.detailsUrl ? `\n\nEvent Details: ${show.detailsUrl}` : '')
    });
    
    window.open(calendarUrl, '_blank');
    
    // Track calendar add
    trackShowClick(showId, 'calendar');
}

function createGoogleCalendarUrl({ title, start, end, location, description }) {
    const formatDate = (date) => {
        return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    };
    
    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: title,
        dates: `${formatDate(start)}/${formatDate(end)}`,
        location: location,
        details: description
    });
    
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ShowsRenderer;
}