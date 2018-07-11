function chekedCoins() {
    var xhr = new XMLHttpRequest();

    var obj = [];

    xhr.open("GET", "https://api.coinmarketcap.com/v2/ticker/", false);

    xhr.send();

    if (xhr.status !== 200) {
        alert(xhr.status + ':' + xhr.statusText);
    } else {
        var coins = JSON.parse(xhr.responseText);

        console.log(coins);
        for (var i in coins.data) {
            if ("BTC" == coins.data[i].symbol || coins.data[i].symbol == "BCH" || coins.data[i].symbol == "ETH") {
                obj.push(coins.data[i]);
                console.log("I " + i + ": ", coins.data[i]);
            }
        }
    }


    var doc = document.getElementsByClassName('valuta-item');
    console.log(doc);

    for (var i in doc) {
        var cild = doc[i].children;

        for (var j in cild) {
            switch(j) {
                case '0': {
                    cild[j].innerText = obj[i].name + "";
                    break;
                }
                case '1': {
                    cild[j].innerText = obj[i].quotes.USD.price + "$";
                    break;
                }
                case '2': {
                    cild[j].innerText = "24h: " + obj[i].quotes.USD.percent_change_24h + "%";
                    break;
                }
                case '3': {
                    cild[j].innerText = "7day: "+ obj[i].quotes.USD.percent_change_7d + "%";
                    break;
                }
                default:
            }
        }
    }
}

window.setInterval(chekedCoins, 2000);