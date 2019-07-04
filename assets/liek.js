let kaka;

let summonersName = prompt("Please enter your summoners name [EUW]", "Chronosite");

let id;


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





fetch(`https://cors-anywhere.herokuapp.com/https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonersName}?api_key=RGAPI-76601c73-9cb5-4b68-889b-7da9661fe1fd`)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    kaka = new Summoner(myJson.name, myJson.id, myJson.accountId)
    console.log(kaka)
    id = myJson.id 
    fetchWinRate();
    
  });

function fetchWinRate(){
    fetch(`https://cors-anywhere.herokuapp.com/https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=RGAPI-76601c73-9cb5-4b68-889b-7da9661fe1fd`)
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




