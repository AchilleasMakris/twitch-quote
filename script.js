import tmi from "https://esm.sh/tmi.js";

const client = new tmi.Client({
    options: { debug: true },
    connection: { reconnect: true },
    channels: ["lexmindset"] // Replace with your Twitch username
});

client.connect().catch(console.error);

client.on("message", (channel, tags, message, self) => {
    if (self) return;
    if (message.toLowerCase() === "!quote") {
        console.log("Fetching quote...");
        fetch("https://api.adviceslip.com/advice")
            .then(response => response.json())
            .then(data => {
                const quote = data.slip.advice;
                console.log("Fetched quote:", quote);
                showQuote(quote);
            })
            .catch(error => console.error("Error fetching quote:", error));
    }
});

function showQuote(quote) {
    const quotePopup = document.getElementById("quote-popup");
    if (quotePopup) {
        quotePopup.innerText = quote;
        quotePopup.style.display = "block";
        quotePopup.style.opacity = "0";
        quotePopup.style.animation = "none";
        void quotePopup.offsetWidth;
        quotePopup.style.animation = "slideUp 0.3s ease-out forwards";
        setTimeout(() => {
            quotePopup.style.animation = "slideDown 0.3s ease-out forwards";
            setTimeout(() => {
                quotePopup.style.display = "none";
            }, 300);
        }, 5000);
    }
}