document.addEventListener('DOMContentLoaded', () => {
    const topicContainer = document.getElementById('topic-content-wrapper');

    if (!topicContainer) {
        console.error('Thoughts display container (thoughts-content-wrapper) not found.');
        return;
    }

    function displayTopic() {
        try {
            const topicText = localStorage.getItem('topic');
            if (topicText && topicText.trim() !== '') {
                topicContainer.textContent = topicText; // Safely sets text content
            } else {
                topicContainer.textContent = 'There is no topic yet.';
            }
        } catch (e) {
            console.error('Error reading or displaying thoughts from localStorage:', e);
            topicContainer.textContent = 'Error loading topic.';
        }
    }

    // 1. Initial display when the page loads
    displayTopic();

    // 2. Listen for storage changes from other tabs/windows
    // This is the standard event for cross-tab localStorage communication
    window.addEventListener('storage', (event) => {
        if (event.key === 'topic') {
            console.log('Thoughts page: "thoughts" key changed in localStorage by another tab.');
            displayTopic();
        }
    });

    // 3. Update when tab becomes visible
    // This ensures content is up-to-date if changes occurred while the tab was hidden,
    // or if the 'storage' event was missed.
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            console.log('Thoughts page: Tab became visible, refreshing thoughts display.');
            displayTopic();
        }
    });
});
