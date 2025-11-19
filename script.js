document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    } else {
        themeToggle.textContent = '🌙';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '☀️';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '🌙';
        }
    });

    // Current Time Display (Sydney and Tokyo)
    const sydneyTimeElement = document.getElementById('sydney-time');
    const tokyoTimeElement = document.getElementById('tokyo-time');

    function updateTimes() {
        const now = new Date();

        // Sydney time (Australia/Sydney)
        const sydneyTime = now.toLocaleString('en-AU', {
            timeZone: 'Australia/Sydney',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
        if (sydneyTimeElement) {
            sydneyTimeElement.textContent = sydneyTime;
        }

        // Tokyo time (Asia/Tokyo)
        const tokyoTime = now.toLocaleString('en-JP', {
            timeZone: 'Asia/Tokyo',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false // Japan typically uses 24-hour format
        });
        if (tokyoTimeElement) {
            tokyoTimeElement.textContent = tokyoTime;
        }
    }

    // Update times every second
    setInterval(updateTimes, 1000);
    updateTimes(); // Initial call to display time immediately

    // Currency Converter (AUD to JPY & JPY to AUD)
    const audInput = document.getElementById('aud');
    const jpyInput = document.getElementById('jpy');
    const jpyOutput = document.getElementById('jpy-output');
    const audOutput = document.getElementById('aud-output');

    const exchangeRateAUDtoJPY = 98.5; // Example rate, update as needed

    function convertCurrency() {
        if (audInput && jpyInput && jpyOutput && audOutput) {
            const audAmount = parseFloat(audInput.value);
            const jpyAmount = parseFloat(jpyInput.value);

            if (!isNaN(audAmount)) {
                jpyOutput.textContent = (audAmount * exchangeRateAUDtoJPY).toFixed(2);
            } else {
                jpyOutput.textContent = '0';
            }

            if (!isNaN(jpyAmount)) {
                audOutput.textContent = (jpyAmount / exchangeRateAUDtoJPY).toFixed(2);
            } else {
                audOutput.textContent = '0';
            }
        }
    }

    if (audInput) audInput.addEventListener('input', convertCurrency);
    if (jpyInput) jpyInput.addEventListener('input', convertCurrency);
    convertCurrency(); // Initial call

    // Phrasebook Audio Playback
    const audioButtons = document.querySelectorAll('.play-audio');
    const audioPlayer = new Audio(); // Create a single Audio object

    audioButtons.forEach(button => {
        button.addEventListener('click', () => {
            const audioSrc = button.dataset.audioSrc;
            if (audioSrc) {
                audioPlayer.src = audioSrc;
                audioPlayer.play().catch(e => console.error("Error playing audio:", e));
            }
        });
    });
});