using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Model
{
    public class Mobile
    {
        public int Id { get; set; }
        public string CName { get; set; }
        public string MName { get; set; }
        public string MobileNo { get; set; }
        public string Address { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
