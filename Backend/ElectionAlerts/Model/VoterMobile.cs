using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Model
{
    public class VoterMobile
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public DateTime? BirthDate { get; set; }
        public string MobileNo { get; set; }
        public string LocalAddress { get; set; }
        public string PermanentAddress { get; set; }
        public string AltMobileNo { get; set; }
        public string Email { get; set; }
        public DateTime? DateofJoining { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
}
