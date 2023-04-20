using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Dto
{
    public class LastNameCount
    {
        public int TotalCount { get; set; }
        public string LastName { get; set; }
        public int Counts { get; set; }
    }
}
