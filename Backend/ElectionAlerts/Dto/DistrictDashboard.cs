using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Dto
{
    public class DistrictDashboard
    {
        public string District { get; set; }
        public int DistrictCount { get; set; }
        public int TotalCount { get; set; }
    }
}
