
using Microsoft.AspNetCore.SignalR;

namespace SignalRSample.Hubs
{
    public class UserHub : Hub
    {
        public static int TotalViews { get; set; }

        public async Task NewWindowLoaded()
        {
            TotalViews++;
            // Send update to all clients
            await Clients.All.SendAsync("updateTotalViews", TotalViews);
        }
    }
}