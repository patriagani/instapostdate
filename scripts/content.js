window.addEventListener('DOMContentLoaded', (event) => {
    processTimeElements();
});

function convertToLocalDate(element) {
    const dateTimeValue = element.getAttribute('datetime');
    const localDate = new Date(dateTimeValue);
    const formattedDate = localDate.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    element.textContent = formattedDate;
    element.setAttribute('title', formattedDate);
}

function processTimeElements() {
    const timeElements = document.querySelectorAll('time');
    timeElements.forEach((timeElement) => {
        convertToLocalDate(timeElement);
    });
}

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList' || mutation.type === 'subtree') {
            processTimeElements();
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
});