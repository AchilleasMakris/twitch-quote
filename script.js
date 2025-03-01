window.addEventListener("onEventReceived", function (e) {
    let l = e.detail.event.data;
    if ((console.log(e), "message" === e.detail.listener)) {
        let message = l.text;
        if (message.toLowerCase() === '!quote') {
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
    }

    if (
      ("tip" === C || "kofiDonation" === C
        ? ((goalProgressText.textContent = (
            userCurrencySymbol + currentGoal
          ).toString()),
          (goalText.textContent = (userCurrencySymbol + goal).toString()))
        : ((goalProgressText.textContent = currentGoal),
          (goalText.textContent = goal)),
      "kofiDonation" === C || "kofiSubscriber" === C)
    )

    if (!e.detail.event)
    void 0 !== e.detail.event.itemId &&
      (e.detail.listener = "redemption-latest");
    let r = e.detail.listener.split("-")[0],
      n = e.detail.event;
    "twitch" === provider
      ? "follower" === r && "follower" === C
        ? o(C, 1)
        : "subscriber" === r && "subscriber" === C
        ? n.bulkGifted
          ? o(C, n.amount)
          : n.isCommunityGift || o(C, 1)
        : (("cheer" === r && "cheer" === C) || ("tip" === r && "tip" === C)) &&
          o(C, n.amount)
      : "youtube" === provider &&
        ("sponsor" === r && "subscriber" === C
          ? n.bulkGifted
            ? o(C, n.amount)
            : n.isCommunityGift || n.bulkGifted || o(C, n.amount)
          : "subscriber" === r && "subscriber" === C
          ? o(C, 1)
          : (("superchat" === r && "superchat" === C) ||
              ("tip" === r && "tip" === C)) &&
            o(C, n.amount));
  });