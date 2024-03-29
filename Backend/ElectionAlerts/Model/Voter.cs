﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Model
{
    public class Voter
    {
        public int Id { get; set; }
        public int? SrNo { get; set; }
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
        public string IsSuspisious{ get; set; }
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
        public int? PartNo { get; set; }
        public string AlternateMobileNo { get; set; }   
        public string StarVoter { get; set; }
        public string Education { get; set; }
        public string FamilyMember { get; set; }
        public string IsSurvey { get; set; }
        public int? AssemblyNo { get; set; }
        public string IsVoted { get; set; }
        public string AssemblyName_KR { get; set; }
        public string FullName_KR { get; set; }
        public string Village_KR { get; set; }
        public string Address_KR { get; set; }
        public string AssemblyName_HN { get; set; }
        public string FullName_HN { get; set; }
        public string Village_HN { get; set; }
        public string Address_HN { get; set; }
        public string Zone { get; set; }
        public string Family { get; set; }
        public string Religion { get; set; }
        public string Society { get; set; }
        public string FilePath { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int AdminId { get; set; }
        public string UserName { get; set; }
        public string BoothName { get; set; }
        public string BoothName_HN { get; set; }
        public string BoothName_RG { get; set; }
        public string PrintSlip { get; set; }

    }

}
