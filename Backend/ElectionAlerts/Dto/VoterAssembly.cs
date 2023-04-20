using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Dto
{
    public class VoterAssembly
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public DateTime? BirthDate { get; set; }
        public int? Age { get; set; }
        public string Gender { get; set; }
        public string HouseNo { get; set; }
        public string VotingCardNo { get; set; }
        public string MobileNo { get; set; }
        public string Caste { get; set; }
        public string District { get; set; }
        public string Assembly { get; set; }
        public string Taluka { get; set; }
        public string Ward { get; set; }
        public string Booth { get; set; }
        public string Village { get; set; }
        public int? Pincode { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string FamilyHead { get; set; }
        public string IsSuspisious { get; set; }
        public string IsOutStation { get; set; }
        public string IsAlive { get; set; }
        public string Occupation { get; set; }
        public string PartyWorker { get; set; }
        public string VotingInclination { get; set; }
        public string PoliticalParty { get; set; }
        public int? UserId { get; set; }
        public string ExtraInfo { get; set; }
        public string WorkLeft { get; set; }
        public string HappywithService { get; set; }
        public string IsDisable { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? PartNo { get; set; }
        public string StarVoter { get; set; }
        public string IsVoted { get; set; }
        public string AlternateMobileNo { get; set; }
        public int? AssemblyNo { get; set; }
        public string AssemblyName_KR { get; set; }
        public string FullName_KR { get; set; }
        public string Village_KR { get; set; }
        public string Address_KR { get; set; }

    }
}
