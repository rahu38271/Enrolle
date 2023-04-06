using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Model
{
    public class Family
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string ContactNo { get; set; }
        public string AltContactNo { get; set; }
        public string Address { get; set; }
        public int ANPId { get; set; }
        public string Relation { get; set; }

    }
}
