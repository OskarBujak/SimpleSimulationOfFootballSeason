let TeamNames = ["tangible","yawn","smash","veil","chance","attack","bucket","reply","race","grass","son","paddle","volcano","train","absorbed","brief","wind","excite","top","measure","teeth","low","lighten","foot"];
let InputRef = document.getElementById("NumberOfTeams"); InputRef.max = TeamNames.length;
let bodyRef = document.body;
let GameLog = document.getElementById("GameLog");

let NumberOfPlayOffTeams = 4;

CalculateGames();

function StartSimulation(){
    ClearShit();
    let TeamsInLeague = [];
    n = InputRef.value;
    while(n--){
        TeamsInLeague.push(new TeamCreator(TeamNames[n]));
    }
    DrawTeamTable(TeamsInLeague);
    let RoundArray = RoundCreator(TeamsInLeague);

    for(let i = 0,n=1;i<RoundArray.length;){
        if(RoundArray[i]=="Round"){
            GameLog.innerHTML += "<h5>Round "+n+"</h5>";
            i++, n++; 
        }
        else{
            Game(RoundArray[i],RoundArray[i+1])
            i+=2;
        }
    }
}

let IDcounter = 0;
class TeamCreator {
    constructor(Name) {
        this.TeamName = Name.toUpperCase() + " FC";
        this.TeamID = IDcounter++;
        this.TeamSkill = rand(1, 99);
        this.TeamWinCounter = 0;
        this.TeamLoseCounter = 0;
        this.TeamDraws = 0;
        this.TeamLeaguePoints = 0;
    }
}

function Game(Team1,Team2){
    if(Team1 == "wild" || Team2 == "wild")
        return;
    GameLog.innerHTML += (Team1.TeamName+" plays with "+Team2.TeamName+"<br>");
}

function RoundCreator(Participants){
    let RoundArray = [];
    if(Participants.length%2)
        Participants.push("wild");
    const ParticipantsLenght = Participants.length-1;

    let row1 = [];
    let row2 = [];

    //Create Rounds
    for(let i=0;i<=ParticipantsLenght/2;i++){
        row1.push(Participants[i]);
        row2.push(Participants[ParticipantsLenght-i]);
    }
    for(let i=0;i<ParticipantsLenght;i++){
        RoundArray.push("Round");
        for(let j=0;j<=row1.length-1;j++){
            RoundArray.push(row1[j],row2[j]);
        }
        row1.splice(1, 0, row2.shift());
        row2.push(row1.pop());
    }

    console.log(RoundArray);
    return RoundArray;
}

//Calculate number of games that needs to be played to fully complete simulation
function CalculateGames(){
    let n = InputRef.value;
    let G = 0; //no. Games

    n>4?G = (n*(n-1))/2 + NumberOfPlayOffTeams-1:n<=4?G = n-1:document.getElementById("GamesCalc").innerHTML = "Error";

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
    let somearray = ['No.','Name','ID','Team Skill','W/L/D','Points'];
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
        let HelpTab = [n++,team.TeamName,team.TeamID,team.TeamSkill,(team.TeamWinCounter+"/"+team.TeamLoseCounter+"/"+team.TeamDraws),team.TeamLeaguePoints];
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
    GameLog.appendChild(Table);
}

function rand(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}