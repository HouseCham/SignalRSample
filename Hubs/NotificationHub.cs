
using Microsoft.AspNetCore.SignalR;

namespace SignalRSample.Hubs
{
    public class NotificationHub : Hub
    {
        public static List<string> notificationList = new List<string>();

        public async Task sendNotification(string notificationMessage)
        {
            notificationList.Add(notificationMessage);
            await Clients.All.SendAsync("updateNotificationList", notificationMessage);
        }
        public async Task LoadNotifications()
        {
            await Clients.Caller.SendAsync("loadNotifications", notificationList);
        }
    }
}