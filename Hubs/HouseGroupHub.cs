
using Microsoft.AspNetCore.SignalR;

namespace SignalRSample.Hubs
{
    public class HouseGroupHub : Hub
    {
        public static List<string> GroupsJoined { get; set; } = new List<string>();

        public async Task JoinHouse(string houseName)
        {
            if(!GroupsJoined.Contains($"{Context.ConnectionId}:{houseName}"))
            {
                GroupsJoined.Add($"{Context.ConnectionId}:{houseName}");
                // do something else here
                string houseList = GetHouseList(GroupsJoined);
                await Clients.Caller.SendAsync("subscriptionStatus", houseList, houseName, true);
                await Clients.Others.SendAsync("notificationToOtherUsers", houseName, true);
                await Groups.AddToGroupAsync(Context.ConnectionId, houseName);
            }
        }
        public async Task LeaveHouse(string houseName)
        {
            if(GroupsJoined.Contains($"{Context.ConnectionId}:{houseName}"))
            {
                GroupsJoined.Remove($"{Context.ConnectionId}:{houseName}");
                // do something else here
                string houseList = GetHouseList(GroupsJoined);
                await Clients.Caller.SendAsync("subscriptionStatus", houseList, houseName, false);
                await Clients.Others.SendAsync("notificationToOtherUsers", houseName, false);
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, houseName);
            }
        }
        public async Task TriggerNotification(string houseName)
        {
            await Clients.Group(houseName).SendAsync("triggerHouseNotification", houseName);
        }
    
        private string GetHouseList(List<string> GroupsJoined)
        {
            string houseList = "";
            foreach (var str in GroupsJoined)
            {
                if(str.Contains(Context.ConnectionId)) houseList += str.Split(':')[1] + " ";
            }
            return houseList;
        }
    }
}