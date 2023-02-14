
/* Buttons for this part */
let lbl_houseJoined = document.getElementById("lbl_houseJoined");

let btn_un_gryffindor = document.getElementById("btn_un_gryffindor");
let btn_un_slytherin = document.getElementById("btn_un_slytherin");
let btn_un_hufflepuff = document.getElementById("btn_un_hufflepuff");
let btn_un_ravenclaw = document.getElementById("btn_un_ravenclaw");
let btn_gryffindor = document.getElementById("btn_gryffindor");
let btn_slytherin = document.getElementById("btn_slytherin");
let btn_hufflepuff = document.getElementById("btn_hufflepuff");
let btn_ravenclaw = document.getElementById("btn_ravenclaw");

let trigger_gryffindor = document.getElementById("trigger_gryffindor");
let trigger_slytherin = document.getElementById("trigger_slytherin");
let trigger_hufflepuff = document.getElementById("trigger_hufflepuff");
let trigger_ravenclaw = document.getElementById("trigger_ravenclaw");

// create connection to the hub
let connectionHouseGroup = new signalR.HubConnectionBuilder()
    .withUrl("/hubs/houseGroup").build();

// join house btns
btn_gryffindor.addEventListener("click", (event) => {
    connectionHouseGroup.send("JoinHouse", "Gryffindor")
    event.preventDefault();
})
btn_slytherin.addEventListener("click", (event) => {
    connectionHouseGroup.send("JoinHouse", "Slytherin")
    event.preventDefault();
})
btn_hufflepuff.addEventListener("click", (event) => {
    connectionHouseGroup.send("JoinHouse", "Hufflepuff")
    event.preventDefault();
})
btn_ravenclaw.addEventListener("click", (event) => {
    connectionHouseGroup.send("JoinHouse", "Ravenclaw")
    event.preventDefault();
})

// leave house btns
btn_un_gryffindor.addEventListener("click", (event) => {
    connectionHouseGroup.send("LeaveHouse", "Gryffindor")
    event.preventDefault();
})
btn_un_slytherin.addEventListener("click", (event) => {
    connectionHouseGroup.send("LeaveHouse", "Slytherin")
    event.preventDefault();
})
btn_un_hufflepuff.addEventListener("click", (event) => {
    connectionHouseGroup.send("LeaveHouse", "Hufflepuff")
    event.preventDefault();
})
btn_un_ravenclaw.addEventListener("click", (event) => {
    connectionHouseGroup.send("LeaveHouse", "Ravenclaw")
    event.preventDefault();
})

// trigger notification
trigger_gryffindor.addEventListener("click", (event) => {
    connectionHouseGroup.send("TriggerNotification", "Gryffindor");
    event.preventDefault();
})
trigger_hufflepuff.addEventListener("click", (event) => {
    connectionHouseGroup.send("TriggerNotification", "Hufflepuff");
    event.preventDefault();
})
trigger_ravenclaw.addEventListener("click", (event) => {
    connectionHouseGroup.send("TriggerNotification", "Ravenclaw");
    event.preventDefault();
})
trigger_slytherin.addEventListener("click", (event) => {
    connectionHouseGroup.send("TriggerNotification", "Slytherin");
    event.preventDefault();
})

connectionHouseGroup.on("triggerHouseNotification", (houseName) => {
    toastr.success(`This is a general notification to the house ${houseName}`)
})

// unsuscribe method
connectionHouseGroup.on("subscriptionStatus", (strGroupsJoined, houseName, hasSuscribed) => {
    lbl_houseJoined.innerText = strGroupsJoined;
    if (hasSuscribed){
        // suscribe to
        switch (houseName){
            case 'Slytherin':
                btn_slytherin.style.display = "none";
                btn_un_slytherin.style.display = "";
                break;
            case 'Gryffindor':
                btn_gryffindor.style.display = "none";
                btn_un_gryffindor.style.display = "";
                break;
            case 'Hufflepuff':
                btn_hufflepuff.style.display = "none";
                btn_un_hufflepuff.style.display = "";
                break;
            case 'Ravenclaw':
                btn_ravenclaw.style.display = "none";
                btn_un_ravenclaw.style.display = "";
                break;
        };
        toastr.success(`You have suscribed succesfully to ${houseName}`)
    } else {
        // unsuscribe from
        switch (houseName){
            case 'Slytherin':
                btn_slytherin.style.display = "";
                btn_un_slytherin.style.display = "none";
                break;
            case 'Gryffindor':
                btn_gryffindor.style.display = "";
                btn_un_gryffindor.style.display = "none";
                break;
            case 'Hufflepuff':
                btn_hufflepuff.style.display = "";
                btn_un_hufflepuff.style.display = "none";
                break;
            case 'Ravenclaw':
                btn_ravenclaw.style.display = "";
                btn_un_ravenclaw.style.display = "none";
                break;
        };
        toastr.warning(`You have unsuscribed succesfully from ${houseName}`)
    }
})

// notification of suscription to other users
connectionHouseGroup.on("notificationToOtherUsers", (houseName, hasSuscribed) => {
    if (hasSuscribed){
        toastr.success(`Someone has suscribed to ${houseName}`)
    } else {
        toastr.warning(`Someone has unsuscribed from ${houseName}`)
    }
})

//start connection
function fulfilled(){
    //do something on start
    console.log("Connection to User Hub Successful");
}
function rejected(){
    //rejected logs
    console.log("Something went wrong");
}
connectionHouseGroup.start().then(fulfilled, rejected);