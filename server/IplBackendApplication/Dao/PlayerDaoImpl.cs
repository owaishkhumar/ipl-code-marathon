using IplBackendApplication.Models;
using IplBackendApplication.ViewModels;
using Npgsql;
using System.Data;

namespace IplBackendApplication.Dao
{
    public class PlayerDaoImpl : IPlayerDao
    {
        NpgsqlConnection _connection;

        public PlayerDaoImpl(NpgsqlConnection connection)
        {
            _connection = connection;
        }


        public async Task<int> InsertPlayer(Player p)
        {
            int rowInserted = 0;
            string message;
            string insertQuery = @$"INSERT INTO ipl.players (player_name, team_id, role, age, matches_played) VALUES ('{p.PlayerName}', '{p.TeamId}', '{p.Role}', '{p.Age}', '{p.MatchesPlayed}')";

            try
            {
                using (_connection)
                {
                    await _connection.OpenAsync();
                    NpgsqlCommand insertCommand = new NpgsqlCommand(insertQuery, _connection);
                    insertCommand.CommandType = CommandType.Text;
                    rowInserted = await insertCommand.ExecuteNonQueryAsync();
                }
            }
            catch (NpgsqlException e)
            {
                message = e.Message;
                Console.WriteLine("---------Exception Insert Player--------------" + message);
            }

            Console.WriteLine(rowInserted.ToString());
            return rowInserted;
        }

        public async Task<List<EachMatchStats>> GetEachMatchStats()
        {
            string query = "select m.match_date, m.venue, t1.team_name as team1, t2.team_name as team2, t.total_number_of_fan_engagements from ipl.matches m left join ipl.teams t1 on m.team1_id = t1.team_id left join ipl.teams t2 on m.team2_id = t2.team_id join ( select count(*) as \"total_number_of_fan_engagements\" , match_id from ipl.fan_engagement group by match_id ) t on m.match_id = t.match_id";
            List<EachMatchStats> eachMatchStatList = new List<EachMatchStats>();
            EachMatchStats? eachMatchStat = null;
            try
            {
                using (_connection)
                {
                    await _connection.OpenAsync();
                    NpgsqlCommand command = new NpgsqlCommand(query, _connection);
                    command.CommandType = CommandType.Text;
                    NpgsqlDataReader reader = await command.ExecuteReaderAsync();

                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            eachMatchStat = new EachMatchStats();
                            eachMatchStat.MatchDate = reader["match_date"].ToString();
                            eachMatchStat.Venue = reader["venue"].ToString();
                            eachMatchStat.TeamName1 = reader["team1"].ToString();
                            eachMatchStat.TeamName2 = reader["team2"].ToString();
                            eachMatchStat.TotalNumberOfFanEngagements = Convert.ToInt32(reader["total_number_of_fan_engagements"]);
                            eachMatchStatList.Add(eachMatchStat);
                        }
                    }
                    reader?.Close();
                    return eachMatchStatList;
                }
            }
            catch (NpgsqlException e)
            {
                Console.WriteLine("---------Exception Get Players--------------" + e.Message);
            }
            return eachMatchStatList;
        }

        public async Task<List<HighesPlayer>> GetHighestPlayerStats()
        {
            string query = "SELECT p.player_name, p.matches_played, COALESCE(SUM(fe_count.engagement_count), 0) AS fan_engagement FROM ipl.players p JOIN ipl.matches m ON p.team_id = m.team1_id OR p.team_id = m.team2_id LEFT JOIN ( SELECT p.player_name, fe.match_id, COUNT(fe.engagement_id) AS engagement_count FROM ipl.players p JOIN ipl.matches m ON p.team_id = m.team1_id OR p.team_id = m.team2_id JOIN ipl.fan_engagement fe ON m.match_id = fe.match_id WHERE m.match_id IN ( SELECT match_id FROM ipl.fan_engagement GROUP BY match_id ORDER BY COUNT(*) DESC LIMIT 5 ) GROUP BY p.player_name, fe.match_id ) fe_count ON p.player_name = fe_count.player_name GROUP BY p.player_name, p.matches_played ORDER BY p.matches_played DESC LIMIT 5";
            List<HighesPlayer> playerList = new List<HighesPlayer>();
            HighesPlayer? highestPlayer = null;
            try
            {
                using (_connection)
                {
                    await _connection.OpenAsync();
                    NpgsqlCommand command = new NpgsqlCommand(query, _connection);
                    command.CommandType = CommandType.Text;
                    NpgsqlDataReader reader = await command.ExecuteReaderAsync();

                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            highestPlayer = new HighesPlayer();
                            highestPlayer.PlayerName = reader["player_name"].ToString();
                            highestPlayer.MatchesPLayed = Convert.ToInt32(reader["matches_played"]);
                            highestPlayer.FanEngagement = Convert.ToInt32(reader["fan_engagement"]);
                            playerList.Add(highestPlayer);
                        }
                    }
                    reader?.Close();
                    return playerList;
                }
            }
            catch (NpgsqlException e)
            {
                Console.WriteLine("---------Exception Get Players--------------" + e.Message);
            }
            return playerList;
        }

        public async Task<List<MatchesDates>> GetMatchByDates(string fromDate, string toDate)
        {
            string query = @$"select m.match_date, m.venue, t1.team_name as team1 , t2.team_name as team2  from ipl.matches m left join ipl.teams t1 on m.team1_id = t1.team_id left join ipl.teams t2	on m.team2_id = t2.team_id where m.match_date >= '{fromDate}' and m.match_date <= '{toDate}';";
            List<MatchesDates> matchList = new List<MatchesDates>();
            MatchesDates? match = null;
            try
            {
                using (_connection)
                {
                    await _connection.OpenAsync();
                    NpgsqlCommand command = new NpgsqlCommand(query, _connection);
                    command.CommandType = CommandType.Text;
                    //command.Parameters.AddWithValue("@FromDate", fromDate);
                    //command.Parameters.AddWithValue("@ToDate", toDate);
                    NpgsqlDataReader reader = await command.ExecuteReaderAsync();

                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            match = new MatchesDates();
                            match.MatchDate = reader["match_date"].ToString();
                            match.Venue = reader["venue"].ToString();
                            match.Team1 = reader["team1"].ToString();
                            match.Team2 = reader["team2"].ToString();

                            matchList.Add(match);
                        }
                    }
                    reader?.Close();
                    return matchList;
                }
            }
            catch (NpgsqlException e)
            {
                Console.WriteLine("---------Exception--------------" + e.Message);
            }
            return matchList;
        }
    }
}
