// Cúlra Shows Data
// Single source of truth for all show information

const showsData = [
    {
        id: 'fhd-balt-2025-01-18',
        date: '2025-01-18',
        venue: 'Four Hour Day Lutherie',
        city: 'Baltimore',
        state: 'MD',
        country: 'US',
        time: '7:30 PM',
        description: 'Join Cúlra, a new Baltimore-based Celtic Folk quintet, for a night of original tunes and songs. With support from Pilgrims of Deep Run.',
        detailsUrl: 'https://www.facebook.com/events/1610027859592809/',
    },
    {
        id: 'bwb-ecm-2025-02-01',
        date: '2025-02-01',
        venue: 'Backwater Books',
        city: 'Ellicot City',
        state: 'MD',
        country: 'US',
        time: '8:00 PM',
        description: 'We\'ll be at Backwater Books in Ellicott City on February 1st for a night of Books, Beers, Bodhráns, and Banjos! You\'re missing out if you haven\'t been to this place, so come out and support local music AND a local business.',
        detailsUrl: 'https://backwaterbooks.com/event/2025-02-01/backwater-sessions-culra',
    },
    {
        id: 'eo-fva-2025-03-14',
        date: '2025-03-14',
        venue: 'Earp\'s Ordinary',
        city: 'Fairfax',
        state: 'VA',
        country: 'US',
        time: '7:30 PM',
        description: 'We\'ll be kicking the night off at this Pre St. Paddy\'s party with our obligatory friends The Kilmaine Saints! March 14th at Earp\'s Ordinary in Fairfax, VA. Start your St. Pat\'s weekend the right way!',
        detailsUrl: 'https://aftontickets.com/event/buyticket/nvjqo80zxo',
    },
    {
        id: 'dcf-dpa-2025-04-12',
        date: '2025-04-12',
        venue: 'Dills Celtic Fest',
        city: 'Dillsburg',
        state: 'PA',
        country: 'US',
        time: '1:45 PM',
        description: 'This one is sure to be a good time. Catch our festival debut Saturday 4/12 at 1:45!',
        detailsUrl: 'https://dillscelticfest.com/',
    },
    {
        id: 'haf-hpa-2025-05-25',
        date: '2025-05-25',
        venue: 'Harrisburg Arts Fest',
        city: 'Harrisburg',
        state: 'PA',
        country: 'US',
        time: '12:30 PM',
        description: '',
        detailsUrl: 'https://www.facebook.com/photo?fbid=1186567736599879&set=a.175713004352029s',
    },
    {
        id: 'bwb-ecm-2026-02-21',
        date: '2026-02-21',
        venue: 'Backwater Books',
        city: 'Ellicot City',
        state: 'MD',
        country: 'US',
        time: '8:00 PM',
        description: 'We\'ll be at Backwater Books in Ellicott City for a night of Books, Beers, Bodhráns, and Banjos! You\'re missing out if you haven\'t been to this place, so come out and support local music AND a local business.',
        detailsUrl: 'https://backwaterbooks.com/event/2026-02-21/backwater-sessions-culra',
    },
    {
        id: 'dcf-dpa-2026-04-18',
        date: '2026-04-18',
        venue: 'Dills Celtic Fest',
        city: 'Dillsburg',
        state: 'PA',
        country: 'US',
        time: '1:45 PM',
        description: "It's a new year, and we're starting the 2026 festival season right by returning to Dills Celtic Fest on April 18th. We'll be bringing new tunes, CD's, and T-shirts and you can do your part by bringing some warmer weather...",
        detailsUrl: 'https://dillscelticfest.com/entertainment-schedule',
    },
    {
        id: 'pmf-ypa-2026-06-20',
        date: '2026-06-20',
        venue: 'Penn-Mar Irish Festival',
        city: 'Glen Rock',
        state: 'PA',
        country: 'US',
        time: '',
        description: "Looking forward to playing at the Penn-Mar Irish Festival this June!",
        detailsUrl: 'https://pennmaririshfestival.com/',
    },
    {
        id: 'bwb-ecm-2026-07-18',
        date: '2026-07-18',
        venue: 'Backwater Books',
        city: 'Ellicot City',
        state: 'MD',
        country: 'US',
        time: '8:00 PM',
        description: 'We\'ll be at Backwater Books in Ellicott City for a night of Books, Beers, Bodhráns, and Banjos! You\'re missing out if you haven\'t been to this place, so come out and support local music AND a local business.',
        detailsUrl: ''
    },
    {
        id: 'spg-spa-2026-08-15',
        date: '2026-08-15',
        venue: 'Spyglass on the Ridge Winery',
        city: 'Sunbury',
        state: 'PA',
        country: 'US',
        time: '',
        description: 'Thrilled to be playing at this year\'s return of Celtic Fest at Spyglass on the Ridge this August!',
        detailsUrl: 'https://valleyfusion570.com/event/celtic-fest/'
    }
];

// Utility functions for working with shows data
const ShowsUtils = {
   getUpcomingShows() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day for better comparison
    return showsData
        .filter((a) => new Date(a.date) >= today)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    },

    getPastShows() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return showsData
        .filter((a) => new Date(a.date) < today)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    },

    getFeaturedShows() {
        upcoming = this.getUpcomingShows()
        return upcoming.slice(0, 3); // Limit to 3 for homepage
    },

    // Get shows by location
    getShowsByCity(city) {
        return showsData.filter(show => 
            show.city.toLowerCase() === city.toLowerCase()
        );
    },

    getShowsByState(state) {
        return showsData.filter(show => 
            show.state.toLowerCase() === state.toLowerCase()
        );
    },

    // Get shows by type
    getShowsByType(type) {
        return showsData.filter(show => show.type === type);
    },

    // Format date utilities
    formatDate(dateString) {
        const date = new Date(dateString + 'T12:00:00');
        return {
            month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
            day: date.getDate().toString(),
            year: date.getFullYear().toString(),
            weekday: date.toLocaleDateString('en-US', { weekday: 'long' }),
            full: date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            })
        };
    },

    // Get show status display info
    getStatusInfo(show) {
        const statusMap = {
            'on-sale': {
                text: 'On Sale',
                class: 'on-sale',
                canBuy: true
            },
            'sold-out': {
                text: 'Sold Out',
                class: 'sold-out',
                canBuy: false
            },
            'announced': {
                text: 'Announced',
                class: 'announced',
                canBuy: false
            },
            'past': {
                text: 'Past Show',
                class: 'past',
                canBuy: false
            }
        };
        return statusMap[show.status] || statusMap['announced'];
    },

    // Search functionality
    searchShows(query) {
        const searchTerm = query.toLowerCase();
        return showsData.filter(show => 
            show.venue.toLowerCase().includes(searchTerm) ||
            show.city.toLowerCase().includes(searchTerm) ||
            show.state.toLowerCase().includes(searchTerm) ||
            show.description.toLowerCase().includes(searchTerm)
        );
    },

    // Get next show
    getNextShow() {
        const upcoming = this.getUpcomingShows();
        return upcoming.length > 0 ? upcoming[0] : null;
    },

    // Get show by ID
    getShowById(id) {
        return showsData.find(show => show.id === id);
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { showsData, ShowsUtils };
}