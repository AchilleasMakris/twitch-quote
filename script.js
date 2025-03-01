const client = new tmi.Client({
    connection: { reconnect: true },
    channels: ["lexmindset"] // Replace with your Twitch username
});

client.connect();

client.on("message", (channel, tags, message, self) => {
    if (self) return;
    
    if (message.toLowerCase() === "!quote") {
        console.log("Fetching quote...");
        fetch("https://api.quotable.io/random")
            .then(response => response.json())
            .then(data => {
                console.log("Fetched quote:", data.content);
                const quotePopup = document.getElementById("quote-popup");
                if (quotePopup) {
                    quotePopup.innerText = data.content;
                    quotePopup.style.display = "block";
                    
                    setTimeout(() => {
                        quotePopup.style.display = "none";
                    }, 5000);
                }
            })
            .catch(error => console.error("Error fetching quote:", error));
    }
});
