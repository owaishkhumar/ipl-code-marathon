using IplBackendApplication.Dao;
using IplBackendApplication.Models;
using IplBackendApplication.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IplBackendApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IplController : ControllerBase
    {
        private readonly IPlayerDao _playerDao;
        public IplController(IPlayerDao playerDao)
        {
            _playerDao = playerDao;
        }



        [HttpPost]
        public async Task<ActionResult<Player>> PlayerInserted(Player player)
        {
            if (player != null)
            {
                if (ModelState.IsValid)
                {
                    int res = await _playerDao.InsertPlayer(player);
                    if (res > 0)
                    {
                        return Ok(res);
                    }
                }
                return BadRequest("Failed to add player");

            }
            else
            {
                return BadRequest("Not Found");
            }
        }

        [HttpGet("matchstats")]
        public async Task<ActionResult<List<EachMatchStats>>> AllMatchStats()
        {
            List<EachMatchStats> matchStats = await _playerDao.GetEachMatchStats();
            if (matchStats == null)
            {
                return NotFound();
            }

            return Ok(matchStats);
        }

        [HttpGet("highestplayer")]
        public async Task<ActionResult<List<HighesPlayer>>> HighestPlayers()
        {
            List<HighesPlayer> players = await _playerDao.GetHighestPlayerStats();
            if (players == null)
            {
                return NotFound();
            }

            return Ok(players);
        }

        [HttpGet("matchbydates")]
        public async Task<ActionResult<List<EachMatchStats>>> MatchDates([FromQuery] string fromDate, [FromQuery] string toDate)
        {
            List<MatchesDates> match = await _playerDao.GetMatchByDates(fromDate, toDate);
            if (match == null)
            {
                return NotFound();
            }

            return Ok(match);
        }
    }
}
