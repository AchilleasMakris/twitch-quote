document.addEventListener('DOMContentLoaded', () => {
    const client = new tmi.Client({
        channels: [ 'lexmindset' ]
    });

    client.connect();

    client.on('message', (channel, tags, message, self) => {
        if(self) return;

        if(message.toLowerCase() === '!quote') {
            fetch('https://api.quotable.io/random')
                .then(response => response.json())
                .then(data => {
                    const quotePopup = document.getElementById('quote-popup');
                    quotePopup.innerText = data.content;
                    quotePopup.style.display = 'block';

                    setTimeout(() => {
                        quotePopup.style.display = 'none';
                    }, 5000);
                })
                .catch(error => console.error('Error fetching quote:', error));
        }
    });
});