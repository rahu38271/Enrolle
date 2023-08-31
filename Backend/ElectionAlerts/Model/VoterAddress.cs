using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Model
{
    public class VoterAddress
    {
        public int Id { get; set; }
        public int? VoterId { get; set; }
        public string FullName { get; set; }
        public string Address { get; set; }
        public int? UserId { get; set; }
        public DateTime? CreatedDate { get; set; }

    }
}
