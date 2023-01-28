using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Dto
{
    public class VoterSurvey
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public DateTime? BirthDate { get; set; }
        public int? Age { get; set; }
        public string Gender { get; set; }
        public string HouseNo { get; set; }
        public string MobileNo { get; set; }
         public string Caste { get; set; }
        public string Address { get; set; }
        public string Occupation { get; set; }
        public string ExtraInfo { get; set; }
        public string WorkLeft { get; set; }
        public string HappywithService { get; set; }
        public string IsDisable { get; set; }
        public string AlternateMobileNo { get; set; }
        public string Education { get; set; }
        public string FamilyMember { get; set; }
        public string IsSurvey { get; set; }
        public DateTime? CreatedDate { get; set; }

        public string MemberName { get; set; }
        public string MemberEducation { get; set; }
        public int? MemberAge { get; set; }
        public string MemberMobileNo { get; set; }
        public string MemberGender { get; set; }
    }

}
