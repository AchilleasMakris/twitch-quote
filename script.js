import tmi from "https://esm.sh/tmi.js";

// Twitch Client Setup
const client = new tmi.Client({
    options: { debug: true },
    connection: { reconnect: true },
    channels: ["lexmindset"] // Replace with your Twitch username
});

// Connect to Twitch Chat
client.connect().catch(console.error);

// Listen for Messages
client.on("message", (channel, tags, message, self) => {
    if (self) return; // Ignore bot's own messages

    if (message.toLowerCase() === "!quote") {
        console.log("Fetching quote...");
        fetch("https://api.adviceslip.com/advice")
            .then(response => response.json())
            .then(data => {
                console.log("Fetched quote:", data.content);
                showQuote(data.content);
            })
            .catch(error => console.error("Error fetching quote:", error));
    }
});

// Function to Show the Quote Popup
function showQuote(quote) {
    const quotePopup = document.getElementById("quote-popup");
    if (quotePopup) {
        quotePopup.innerText = quote;
        quotePopup.style.display = "block";

        setTimeout(() => {
            quotePopup.style.display = "none";
        }, 5000);
    }
}
