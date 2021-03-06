let kaka;

let summonersName = prompt("Please enter your summoners name [EUW]");

let id;

let apiKeyRiot = `RGAPI-d1a11dfd-39c5-4e59-ac88-ddf5814ba544`
class Summoner{
    constructor(name, id, accountId){
        this.name = name;
        this.id = id;
        this.accountId = accountId;
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


fetchProfile(summonersName);


function fetchProfile(summoner){
  console.log('test')
  fetch(`https://cors-anywhere.herokuapp.com/https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=${apiKeyRiot}`)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    kaka = new Summoner(myJson.name, myJson.id, myJson.accountId)
    console.log(kaka)
    id = myJson.id 
    fetchWinRate(kaka);
    
  });
}


function fetchWinRate(summoner){
    fetch(`https://cors-anywhere.herokuapp.com/https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summoner.id}?api_key=${apiKeyRiot}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {

      if(myJson[0].queueType === 'RANKED_FLEX_SR'){
        kaka.wins = myJson[1].wins
        kaka.losses = myJson[1].losses
      }else{
        kaka.wins = myJson[0].wins
        kaka.losses = myJson[0].losses
      }



      
      console.log(kaka)
        kaka.calcWinrate();
        kaka.printWinrate();
        displayWinrate();
    });
}

function displayWinrate(){
    document.getElementById("winrate").innerHTML = `winrate: ${kaka.winrate}%`;
}

function searchAgain(){
  location.reload();
}



