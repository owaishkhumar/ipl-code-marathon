using System.ComponentModel.DataAnnotations;

namespace IplBackendApplication.Models
{
    public class Player
    {
        public int PlayerId { get; set; }

        [Required(ErrorMessage = "Provide a PLayer Name")]
        [MaxLength(50, ErrorMessage = "Player name cannot be more than 50 character")]
        public string? PlayerName { get; set; }

        [Required(ErrorMessage = "Provide a Team Id")]
        public int TeamId { get; set; }


        [Required(ErrorMessage = "Provide a role for the player")]
        [MaxLength(30, ErrorMessage = "Role cannot be more than 30 character")]
        public string? Role { get; set; }


        [Required(ErrorMessage = "Provide a age for the player")]
        public int Age { get; set; }

        public int MatchesPlayed { get; set; }
    }
}
