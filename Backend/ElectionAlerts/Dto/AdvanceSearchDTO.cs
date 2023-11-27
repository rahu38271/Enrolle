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
        public string Occupation { get; set; }
        public string Education { get; set; }
        public string Caste { get; set; }
        public string Religion { get; set; }
        public string Society { get; set; }
        public string VotingInclination { get; set; }
        public string IsVoted { get; set; }
        public string PrintSlip { get; set; }
        public int UserId { get; set; }
        public int RoleId { get; set; }
        public int PageNo { get; set; }
        public int NoofRow { get; set; }
        public string Language { get; set; }

    }
}
