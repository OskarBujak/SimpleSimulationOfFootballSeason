let TeamNames = ["tangible","yawn","smash","veil","chance","attack","bucket","reply","race","grass","son","paddle","volcano","train","absorbed","brief","wind","excite","top","measure","teeth","low","lighten","foot"];
let InputRef = document.getElementById("NumberOfTeams"); 
    
let MinInput = 4;
let MaxInput = TeamNames.length;
InputRef.max = MaxInput;
InputRef.min = MinInput;

let bodyRef = document.body;
let GameLog = document.getElementById("GameLog");

CalculateGames();

function StartSimulation(){
    ClearShit();
    let TeamsInLeague = [];
    n = ChechInput();
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
    TeamsInLeague = SortTeamTable(TeamsInLeague);
    DrawTeamTable(TeamsInLeague);
}
function ChechInput(){
    let input = InputRef.value;
    if(input>MaxInput)
        input = MaxInput;
    if(input<MinInput)
        input = MinInput;
    
    InputRef.value = input;
    return InputRef.value;
}

let IDcounter = 0;
class TeamCreator {
    constructor(Name) {
        this.TeamName = Name.toUpperCase() + " FC";
        this.TeamID = IDcounter++;
        this.TeamSkill = rand(1, 99);
        this.TeamWinCounter = 0;
        this.TeamLoseCounter = 0;
        this.TeamDrawsCounter = 0;
        this.TeamLeaguePoints = 0;
        this.ScoredGoals = 0;
    }
}

function Game(Team1,Team2){
    if(Team1 == "wild" || Team2 == "wild")
        return;

    let Score1 = 0;
    let Score2 = 0;
    
    //NEW GAME SYSTEM
    let GameTurns_N = 0;
    if(Team1.TeamSkill>Team2.TeamSkill)
        GameTurns_N = rand(1,(Team1.TeamSkill-Team2.TeamSkill)%10);
    else if(Team1.TeamSkill<Team2.TeamSkill)
        GameTurns_N = rand(1,(Team2.TeamSkill-Team1.TeamSkill)%10);
    else
        GameTurns_N = rand(1,10);
    //<d> is just to make clearing page easier
    GameLog.innerHTML += ("<d><i>"+Team1.TeamName+" plays with "+Team2.TeamName+"</i><br></d>");
    for(let i = 0;i<GameTurns_N;i++){
        let Team1_temp = 150 - Team1.TeamSkill;
        let Team2_temp = 150 - Team2.TeamSkill;
        while(Team1_temp>=0 && Team2_temp>=0){
            Team1_temp -= rand(1,5);
            Team2_temp -= rand(1,5);
        }
        if(Team1_temp<=0 && Team2_temp<=0)
            continue;
        else if(Team1_temp<Team2_temp){
            Team1.ScoredGoals++;
            Score1++;
            GameLog.innerHTML += "<d>"+Team1.TeamName+" scores! It's "+Score1+"-"+Score2+"!<br></d>";
        }
        else{
            Team2.ScoredGoals++;
            Score2++;
            GameLog.innerHTML += "<d>"+Team2.TeamName+" scores! It's "+Score1+"-"+Score2+"!<br></d>";
        }
    }
    /*
    //OLD GAME SYSTEM (so random lmao)
    let Team1Chance = Math.ceil(Team1.TeamSkill/5);
    let Team2Chance = Math.ceil(Team2.TeamSkill/5);

    GameLog.innerHTML += ("<d><i>"+Team1.TeamName+" plays with "+Team2.TeamName+"</i><br></d>");
    for(let i = 0;i<9;i++){
        if(Team1Chance>=rand(1, 100)){
            Team1.ScoredGoals++;
            Score1++;
            GameLog.innerHTML += "<d>"+Team1.TeamName+" scores! It's "+Score1+"-"+Score2+"!<br></d>";
        }
        if(Team1Chance>=rand(1, 100)){
            Team2.ScoredGoals++;
            Score2++;
            GameLog.innerHTML += "<d>"+Team2.TeamName+" scores! It's "+Score1+"-"+Score2+"!<br></d>";
        }
    }
    */
    
    if(Score1>Score2){
        Team1.TeamWinCounter++;
        Team1.TeamLeaguePoints+=3;
        Team2.TeamLoseCounter++;

        /*
        //Pointless in more amout of games
        if(!(Team1.TeamSkill+1>99))
            Team1.TeamSkill++;
        if(!(Team2.TeamSkill-1<1))
            Team2.TeamSkill--;
        */

        GameLog.innerHTML += "<b>"+Team1.TeamName+" wins "+Score1+" to "+Score2+"!</b><br>";
    }
    else if(Score1===Score2){
        Team1.TeamDrawsCounter++;
        Team1.TeamLeaguePoints++;

        Team2.TeamDrawsCounter++;
        Team2.TeamLeaguePoints++;
        GameLog.innerHTML += "<b>It's a draw! "+Score1+"-"+Score2+"</b><br>";
    }
    else{
        Team2.TeamWinCounter++;
        Team2.TeamLeaguePoints+=3;
        Team1.TeamLoseCounter++;

        /*
        //Pointless in more amout of games
        if(!(Team2.TeamSkill+1>99))
            Team2.TeamSkill++;
        if(!(Team1.TeamSkill-1<1))
            Team1.TeamSkill--;
        */

        GameLog.innerHTML += "<b>"+Team2.TeamName+" wins "+Score2+" to "+Score1+"!</b><br>";
    }
    GameLog.innerHTML += "<br>";
    if(Score1>Score2)
        return Team1;
    if(Score1<Score2)
        return Team2;
    if(Score1===Score2)
        return "draw";
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
    return RoundArray;
}

//Calculate number of games that needs to be played to fully complete simulation
function CalculateGames(){
    let n = InputRef.value;
    let G = (n*(n-1))/2; //no. Games

    document.getElementById("GamesCalc").innerHTML = "There will be "+G+" games to simulate";
}

//Name says it all ;P
function ClearShit(){
    IDcounter = 0;

    if(GameLog.hasChildNodes()){
        let tab = GameLog.querySelectorAll("*");
        for(const a of tab){
            a.remove();
        }
    }
    CalculateGames();
}

//Drawing Table
function DrawTeamTable(TeamTable){
    let Table = document.createElement("table");

    let Tablenght = 7;

    //Creating Table header 
    let somearray = ['No.','Name','ID','Team Skill','W/L/D','Scored Goals','Points'];
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
        if(team == "wild")
            continue;
        //Tab created to move easier through the output
        let HelpTab = [n++,team.TeamName,team.TeamID,team.TeamSkill,(team.TeamWinCounter+"/"+team.TeamLoseCounter+"/"+team.TeamDrawsCounter),team.ScoredGoals,team.TeamLeaguePoints];
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

function SortTeamTable(Table){
    let lenght = Table.length-1;
    
    //BubbleSort
    for(let i=0; i<lenght;i++){
        for (let j = 0; j<lenght; j++){
            if(Table[j] == "wild" || Table[j+1] == "wild")
                continue;
            if (Table[j].TeamLeaguePoints > Table[j+1].TeamLeaguePoints){
                let tmp = Table[j];
                Table[j] = Table[j + 1];
                Table[j + 1] = tmp;
            }
            else if(Table[j].TeamLeaguePoints == Table[j+1].TeamLeaguePoints){
                if(Table[j].TeamWinCounter > Table[j+1].TeamWinCounter){
                    let tmp = Table[j];
                    Table[j] = Table[j + 1];
                    Table[j + 1] = tmp;
                }
                else if(Table[j].TeamWinCounter == Table[j+1].TeamWinCounter){
                    if(Table[j].ScoredGoals > Table[j+1].ScoredGoals){
                        let tmp = Table[j];
                        Table[j] = Table[j + 1];
                        Table[j + 1] = tmp;
                    }
                    else if(Table[j].ScoredGoals == Table[j+1].ScoredGoals){
                        if(Table[j].TeamID < Table[j+1].TeamID){
                            let tmp = Table[j];
                            Table[j] = Table[j + 1];
                            Table[j + 1] = tmp;
                        }
                    }
                }
            }
        }
    } 
    Table.reverse();
    return Table;
}

function rand(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}