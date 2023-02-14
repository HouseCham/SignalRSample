using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalRSample.Hubs;
using SignalRSample.Models;

namespace SignalRSample.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly IHubContext<DeathlyHallowsHub> _deathlyHub;

    public HomeController(ILogger<HomeController> logger, IHubContext<DeathlyHallowsHub> deathHub)
    {
        _logger = logger;
        _deathlyHub = deathHub;
    }

    public IActionResult Index()
    {
        return View();
    }

    public async Task<IActionResult> DeathlyHallows(string type)
    {
        if (SD.DealthyHallowRace.ContainsKey(type)) SD.DealthyHallowRace[type]++;
        await _deathlyHub.Clients.All.SendAsync("updateDeathlyHallowsCount", 
            SD.DealthyHallowRace["cloak"],
            SD.DealthyHallowRace["stone"],
            SD.DealthyHallowRace["wand"]
        );
        return Accepted();
    }
    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
