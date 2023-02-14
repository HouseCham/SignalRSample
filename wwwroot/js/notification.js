
let sendNotificationBtn = document.getElementById("sendButton");
let notificationInput = document.getElementById("notificationInput");
let messageList = document.getElementById("messageList");
let notificationCounter = document.getElementById("notificationCounter");

// create connection to the hub
let connectionNotification = new signalR.HubConnectionBuilder()
    .withUrl("/hubs/notification").build();


function addNewNotification(innerText){
    let newNotification = document.createElement("li");
    newNotification.innerHTML = innerText;
    messageList.appendChild(newNotification);
}

sendNotificationBtn.addEventListener("click", (event) => {
    connectionNotification.send("sendNotification", notificationInput.value);
    notificationInput.value = "";
    event.preventDefault();
});

// load notifications functions
connectionNotification.on("loadNotifications", (notificationList) => {
    notificationCounter.innerText = notificationList.length;
    notificationList.forEach(notification => {
        addNewNotification(notification);
    });
});

connectionNotification.on("updateNotificationList", (notification) => {
    addNewNotification(notification);
    notificationCounter.innerText = parseInt(notificationCounter.innerText) + 1;
});

//start connection
function fulfilled(){
    //do something on start
    connectionNotification.send("LoadNotifications");
    console.log("Connection to Notification Hub Successful");
}
function rejected(){
    //rejected logs
    console.log("Something went wrong");
}

connectionNotification.start().then(fulfilled, rejected);