using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Dto
{
    public class LetterDashBoard
    {
        public int? TotalCount { get; set; }
        public int? Completed { get; set; }
        public int? Pending { get; set; }
        public int? TodayCount { get; set; }
    }
}
