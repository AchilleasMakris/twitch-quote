const socket = new WebSocket("wss://pubsub-edge.twitch.tv");

const CHANNEL_ID = "47661990";
const OAUTH_TOKEN = "4zv4prswbkjxu1tg68sp63o5ygg4pv";
const REWARD_ID = "3eba5889-089f-4613-9783-ff08ac9c74c2";

socket.onopen = () => {
    console.log("Connected to Twitch PubSub");
    const listenMessage = {
        type: "LISTEN",
        nonce: "myNonce",
        data: {
            topics: [`channel-points-channel-v1.${CHANNEL_ID}`],
            auth_token: OAUTH_TOKEN
        }
    };
    socket.send(JSON.stringify(listenMessage));
};

socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.type === "MESSAGE") {
        const data = JSON.parse(message.data.message);
        if (data.type === "reward-redeemed") {
            const redemption = data.data.redemption;
            const reward = redemption.reward;
            if (reward.id === REWARD_ID) {
                console.log("Inspirational Quote redeemed by", redemption.user.display_name);
                fetchQuote();
            }
        }
    }
};

socket.onerror = (error) => console.error("PubSub Error:", error);
socket.onclose = () => console.log("PubSub Disconnected");

function fetchQuote() {
    fetch("https://api.adviceslip.com/advice")
        .then(response => response.json())
        .then(data => {
            const quote = data.slip.advice;
            console.log("Fetched quote:", quote);
            showQuote(quote);
        })
        .catch(error => console.error("Error fetching quote:", error));
}

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