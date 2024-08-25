using IplBackendApplication.Models;
using IplBackendApplication.ViewModels;

namespace IplBackendApplication.Dao
{
    public interface IPlayerDao
    {
        Task<int> InsertPlayer(Player p);
        Task<List<EachMatchStats>> GetEachMatchStats();
        Task<List<HighesPlayer>> GetHighestPlayerStats();
        Task<List<MatchesDates>> GetMatchByDates(string FromDate, string ToDate);
    }
}
