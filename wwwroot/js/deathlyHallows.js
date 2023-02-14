let cloakCounter = document.getElementById("cloakCounter");
let stoneCounter = document.getElementById("stoneCounter");
let wandCounter = document.getElementById("wandCounter");

function updateSpans(cloak, stone, wand){
    cloakCounter.innerText = cloak.toString();
    stoneCounter.innerText = stone.toString();
    wandCounter.innerText = wand.toString();
}

//create connection
let connectionDeathlyHallows = new signalR.HubConnectionBuilder()
    //.configureLogging(signalR.LogLevel.Information)
    .withUrl("/hubs/deathlyHallows").build();

//connect to methods that hub invokes aka receive notifications from hub
connectionDeathlyHallows.on("updateDeathlyHallowsCount", (cloak, stone, wand)=> {
    updateSpans(cloak, stone, wand);
})

//invoke hub methods aka send notification to hub

//start connection
function fulfilled(){
    //do something on start
    console.log("Connection to Deathly Hub Successful");
    connectionDeathlyHallows.invoke("GetRaceStatus").then((SD) => {
        updateSpans(SD["cloak"], SD["stone"], SD["wand"])
    });
}
function rejected(){
    //rejected logs
    console.log("Something went wrong");
}
connectionDeathlyHallows.start().then(fulfilled, rejected);