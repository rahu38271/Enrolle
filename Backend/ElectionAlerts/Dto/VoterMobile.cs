using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Dto
{
    public class VoterMobileBulk
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string BirthDate { get; set; }
        public string MobileNo { get; set; }
        public string LocalAddress { get; set; }
        public string PermanentAddress { get; set; }
        public string AltMobileNo { get; set; }
        public string Email { get; set; }
        public string DateofJoining { get; set; }
        public string CreatedDate { get; set; }
    }
}
