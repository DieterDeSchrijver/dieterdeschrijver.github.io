let summoners = ["Chronosite", "Jerichi", "Thebooman", "LitCrit", "Exadice", "Demonic Snake","Filthy Juan", "IMaverick"];
let counter = 0;

let apiKeyRiot = `RGAPI-d1a11dfd-39c5-4e59-ac88-ddf5814ba544`
let corsKey = `https://cors-anywhere.herokuapp.com/`

let realSummoners = [];



getSummonerStats(summoners);






class Summoner{
    constructor(name, id){
        this.name = name;
        this.id = id;
        this.wins = 0;
        this.losses = 0;
        this.winrate = 0;
    }

    calcWinrate(){
        let wr1 = this.wins / (this.wins + this.losses)*100
        let wr2 = wr1.toFixed(2)
        this.winrate = wr2
    }
    

    printWinrate(){
        console.log(`Winrate: ${this.winrate}%`)
    }
}



function getSummonerStats(summoners){
    if(summoners === null) {
        console.log('no tasks')
      } else {
        summoners.forEach(function(summoner){
            fetchProfile(summoner);
        });
      }
}



function fetchProfile(summoner){
    fetch(`https://cors-anywhere.herokuapp.com/https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=${apiKeyRiot}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      summoner = new Summoner(myJson.name, myJson.id, myJson.accountId)

      fetchWinRate(summoner);
      
    });
}

  function fetchWinRate(summoner){
    fetch(`https://cors-anywhere.herokuapp.com/https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summoner.id}?api_key=${apiKeyRiot}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {

      if(myJson[0].queueType === 'RANKED_FLEX_SR'){
        summoner.wins = myJson[1].wins
        summoner.losses = myJson[1].losses
      }else{
        summoner.wins = myJson[0].wins
        summoner.losses = myJson[0].losses
      }
        summoner.calcWinrate();
        realSummoners.push(summoner)
        console.log(`created summoner:${summoner.name}. Summoner was added to the list.`)
        counter++; 
        if (counter === summoners.length) {
            printListSummoners();
        }
    });
}

function printListSummoners(){
    console.log(realSummoners)

    sortWinrates()
}

function sortWinrates(){
    summonersSortedOnWinrate = realSummoners.slice();
    summonersSortedOnWinrate.sort((a, b) => (a.winrate > b.winrate) ? -1 : 1)

    console.log(summonersSortedOnWinrate)
    summonersSortedOnWinrate.forEach(function(summoner){
        winrateToHtml(summoner)
    })
    
}

function winrateToHtml(summoner){
    var div = document.createElement("div");
    div.className = 'col-6 col-sm-3';
    div.innerHTML = `${summoner.name}`;
    document.getElementById("rankingsWr").appendChild(div);
    
    var div = document.createElement("div");
    div.className = 'col-6 col-sm-3';
    div.innerHTML = `${summoner.winrate}`;
    document.getElementById("rankingsWr").appendChild(div);

    var div = document.createElement("div");
    div.className = 'w-100';
    document.getElementById("rankingsWr").appendChild(div);
}
