using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Dto
{
    public class ContactDTO
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string VillageName { get; set; }
        public DateTime Anniversary { get; set; }
        public string MobileNo { get; set; }
        public string AlternativeMobileNo { get; set; }
    }
}
