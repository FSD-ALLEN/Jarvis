// Selecting DOM elements
const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

// Function to speak text
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.volume = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
}

// Function to greet user based on time of day
function wishMe() {
    const hour = new Date().getHours();
    let greeting;
    if (hour >= 0 && hour < 12) {
        greeting = "Good Morning Boss.";
    } else if (hour >= 12 && hour < 17) {
        greeting = "Good Afternoon Master.";
    } else {
        greeting = "Good Evening Sir.";
    }
    speak(greeting);
}

// Event listener when the window loads
window.addEventListener('load', () => {
    speak("Initializing JARVIS.");
    wishMe();
});

// Initializing SpeechRecognition API
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

// Event listener when speech recognition detects a result
recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    content.textContent = transcript;
    takeCommand(transcript);
};

// Event listener for button click to start speech recognition
btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

// Function to process user commands
// Function to process user commands
async function searchAndPlay(songTitle) {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyB9F-k5jZjGHZcf6QtZJ8t7OqBPVOLEdUw&q=${encodeURIComponent(songTitle)}&type=video&part=snippet&maxResults=1`);
        const data = await response.json();
        const videoId = data.items[0].id.videoId;
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
        window.open(videoUrl, "_blank");
        speak(`Playing "${songTitle}" on YouTube.`);
    } catch (error) {
        console.error('Error searching and playing song:', error);
        speak("Sorry, I couldn't play the song.");
    }
}

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Allow me to introduce myself. How may I help you?");
    } else if (message.includes("open google")) {
        window.location.href = "https://google.com";
        speak("Opening Google.");
    } else if (message.includes("open spotify")) {
        window.location.href = "https://open.spotify.com/";
        speak("Opening Spotify.");
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube.");
    } else if (message.includes("play this song")) {
        const songTitle = message.replace("play this song", "").trim();
        searchAndPlay(songTitle);
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook.");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(message)}`, "_blank");
        speak(`Searching for "${message}" on Google.`);
    } else if (message.includes('wikipedia')) {
        const searchTerm = message.replace("wikipedia", "").trim();
        window.open(`https://en.wikipedia.org/wiki/${encodeURIComponent(searchTerm)}`, "_blank");
        speak(`Searching Wikipedia for "${searchTerm}".`);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(`The current time is ${time}.`);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        speak(`Today's date is ${date}.`);
    } else if (message.includes('calculator')) {
        window.open('Calculator:///');
        speak("Opening Calculator.");
    } else {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(message)}`, "_blank");
        speak(`Searching for "${message}" on Google.`);
    }
}




