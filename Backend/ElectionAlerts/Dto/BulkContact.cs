using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Dto
{
    public class BulkContact
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string VilageName { get; set; }
        public string BirthDate { get; set; }
        public string Anniversary { get; set; }
        public string MobileNo { get; set; }
        public string AlternativeMobileNo { get; set; }
        public string Address { get; set; }
        public string Taluka { get; set; }
        public string District { get; set; }
        public int? LoginUserId { get; set; }
        public int? PartNo { get; set; }
        public DateTime OtherDate { get; set; }
    }
}
