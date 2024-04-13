using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Model
{
    public class AnnapurnaBeneficiary
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Relation { get; set; }
        public string PhoneNo { get; set; }
        public DateTime? BenefittedDate { get; set; }
        public string SupplyGiven { get; set; }
        public int ANPId { get; set; }

    }
}
