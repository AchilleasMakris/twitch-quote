document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    const client = new tmi.Client({
        channels: [ 'lexmindset' ]
    });

    client.connect().then(() => {
        console.log('Connected to Twitch chat');
    }).catch(error => {
        console.error('Error connecting to Twitch chat:', error);
    });

    client.on('message', (channel, tags, message, self) => {
        if(self) return;

        console.log(`Received message: ${message}`);

        if(message.toLowerCase() === '!quote') {
            console.log('Fetching quote...');
            fetch('https://api.quotable.io/random')
                .then(response => response.json())
                .then(data => {
                    console.log('Fetched quote:', data.content);
                    const quotePopup = document.getElementById('quote-popup');
                    if (quotePopup) {
                        quotePopup.innerText = data.content;
                        quotePopup.style.display = 'block';

                        setTimeout(() => {
                            quotePopup.style.display = 'none';
                        }, 5000);
                    } else {
                        console.error('Element with ID "quote-popup" not found');
                    }
                })
                .catch(error => console.error('Error fetching quote:', error));
        }
    });
});