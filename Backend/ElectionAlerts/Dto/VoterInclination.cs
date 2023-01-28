using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Dto
{
    public class VoterInclination
    {
        public int? Supporter { get; set; }
        public int? Opposition { get; set; }
        public int? Doubtful { get; set; }
        public int? Other { get; set; }

    }
}
