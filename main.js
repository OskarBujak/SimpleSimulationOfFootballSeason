let TeamNames = ["tangible","yawn","smash","veil","chance","attack","bucket","reply","race","grass","son","paddle","volcano","train","absorbed","brief","wind","excite","top","measure","teeth","low","lighten","foot"];
let InputRef = document.getElementById("NumberOfTeams"); InputRef.max = TeamNames.length;
let bodyRef = document.body;

let NumberOfPlayOffTeams = 4;

function StartSimulation(){
    ClearShit();
    let TeamsInLeague = [];
    n = InputRef.value;
    while(n--){
        TeamsInLeague.push(new TeamCreator(TeamNames[n]));
    }
    DrawTeamTable(TeamsInLeague);
}

let IDcounter = 0;
class TeamCreator {
    constructor(Name) {
        this.TeamName = Name.toUpperCase() + " FC";
        this.TeamID = IDcounter++;
        this.TeamSkill = rand(1, 99);
        this.TeamWinCounter = 0;
        this.TeamLoseCounter = 0;
        this.TeamLeaguePoints = 0;
    }
}

//Calculate number of games that needs to be played to fully complete simulation
function CalculateGames(){
    let n = InputRef.value;
    let G = 0; //no. Games

    n>4?G = (n*(n-1))/2 + NumberOfPlayOffTeams-1:n<=4?G = n-1:document.getElementById("GamesCalc").innerHTML = "Error";
    /*
    //Other version of ?:: thingy
    if(n>4)
        G = (n*(n-1))/2 + NumberOfPlayOffTeams-1;
    else if(n<=4)
        G = n-1;
    */
    
    let gameorgames = 0;
    n==2?gameorgames = " game":gameorgames = " games";
    document.getElementById("GamesCalc").innerHTML = "There will be "+G+gameorgames+" to simulate";
}

//Name says it all ;P
function ClearShit(){
    IDcounter = 0;
}

//Drawing Table
function DrawTeamTable(TeamTable){
    let Table = document.createElement("table");

    let Tablenght = 6;

    //Creating Table header 
    let somearray = ['No.','Name','ID','Team Skill','W/L','Points'];
    let TableRow = document.createElement("tr");
    for(let j=0;j<Tablenght;j++){
        let TableHeader = document.createElement("th");
            TableHeader.innerHTML = somearray[j];
        TableRow.appendChild(TableHeader);
    }
    Table.appendChild(TableRow);

    //Team Position in League
    let n = 1;
    //Loop for creating row for each team
    for(const team of TeamTable){
        //Tab created to move easier through the output
        let HelpTab = [n++,team.TeamName,team.TeamID,team.TeamSkill,(team.TeamWinCounter+"/"+team.TeamLoseCounter),team.TeamLeaguePoints];
        //Creating Row
        let TableRow = document.createElement("tr");
        for(let j=0;j<Tablenght;j++){
            //Creating DataCell and adding value to it from HelpTab
            let TableDataCell = document.createElement("td");
            TableDataCell.innerHTML = HelpTab[j];
            TableRow.appendChild(TableDataCell);
        }
        Table.appendChild(TableRow);
    }
    bodyRef.appendChild(Table);
}

function rand(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}