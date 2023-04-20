using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Dto
{
    public class VoterDTO
    {
        public int Id { get; set; }
        public int? SrNo { get; set; }
        public string FullName { get; set; }
        public string Village { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public string Caste { get; set; }
        public string VotingCardNo { get; set; }
        public string Address { get; set; }
        public int? PartNo { get; set; }
        public string MobileNo { get; set; }
        public string IsAlive { get; set; }
        //public string ColounName { get; set; }
        public string StarVoter { get; set; }
        public string IsVoted { get; set; }
        public string AlternateMobileNo { get; set; }
        public string VotingInclination { get; set; }
        public int AssemblyNo { get; set; }
        public string Assembly { get; set; }
        public DateTime? BirthDate { get; set; }
        public string Occupation { get; set; }
        public string Email { get; set; }
        public int TotalCount { get; set; }
    }
}
