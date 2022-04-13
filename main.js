let TeamNames = ["tangible","yawn","smash","veil","chance","attack","bucket","reply","race","grass","son","paddle","volcano","train","absorbed","brief","wind","excite","top","measure","teeth","low","lighten","foot"];
let InputRef = document.getElementById("NumberOfTeams"); InputRef.max = TeamNames.length;

let NumberOfPlayOffTeams = 4;

/*
//TeamNames test loop
for(i=0;i<TeamNames.length;i++)
    console.log(i+":"+TeamNames[i]);
console.log(TeamNames.length);
*/

function CalculateGames(){
    let n = InputRef.value;
    let G = 0;

    n>4?G = (n*(n-1))/2 + NumberOfPlayOffTeams-1:n<=4?G = n-1:document.getElementById("GamesCalc").innerHTML = "Error";
    /*
    if(n>4) G = (n*(n-1))/2 + NumberOfPlayOffTeams-1;:n<=4?G = n-1:document.getElementById("GamesCalc").innerHTML = "Error";
        G = (n*(n-1))/2 + NumberOfPlayOffTeams-1;
    else if(n<=4)
        G = n-1;
    */
    
    let gameorgames = 0;
    n==2?gameorgames = " game":gameorgames = " games";
    document.getElementById("GamesCalc").innerHTML = "There will be "+G+gameorgames+" to simulate";
}