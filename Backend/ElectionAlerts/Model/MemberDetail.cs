using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Model
{
    public class MemberDetail
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Education { get; set; }
        public int? Age { get; set; }
        public string MobileNo { get; set; }
        public string Gender { get; set; }
        public int? VoterId { get; set; }

    }
}
