using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Model
{
    public class NewVoter
    {
        public int Id { get; set; }
        public int? AssemblyNo { get; set; }
        public int? PartNo { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string MobileNo { get; set; }
        public string AltMobileNo { get; set; }
        public DateTime? DOB { get; set; }
        public string HouseNo { get; set; }
        public string EpicNo { get; set; }
        public string Gender { get; set; }
        public int? Age { get; set; }
        public string SocietyName { get; set; }
        public string Zone { get; set; }
        public string Address { get; set; }
        public string NewAddress { get; set; }
        public string Area { get; set; }
        public string Favour { get; set; }
        public string Remark { get; set; }
        public string ReferenceName { get; set; }
        public string Position { get; set; }
        public string VotingCard { get; set; }
        public string PersonalRelation { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? UserId { get; set; }
        public int? AdminId { get; set; }
        public string UserName { get; set; }

    }
}
