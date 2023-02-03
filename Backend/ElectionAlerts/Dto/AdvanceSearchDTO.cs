using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Dto
{
    public class AdvanceSearchDTO
    {
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string VotingCardNo { get; set; }
        public string PartNo { get; set; }
        public string MobileNo { get; set; }
        public string HouseNo { get; set; }
        public int? FromAge { get; set; }
        public int? ToAge { get; set; }
        public string Gender { get; set; }
        public string Village { get; set; }
        public int UserId { get; set; }

    }
}
