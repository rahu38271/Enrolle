
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Dto
{
    public class AnnapurnaDTO
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string PhoneNo { get; set; }
        public string AltPhoneNo { get; set; }
        public string Chal_SocietyName { get; set; }
        public string PresentAddress { get; set; }
        public string Area { get; set; }
        public int? YadiNo_PartNo { get; set; }
        public int? SrNo { get; set; }
        public string EpicNo { get; set; }
        public string VoterNo { get; set; }
        public DateTime? TokenDate { get; set; }
        public int? TokenNo { get; set; }
        public string VolunterName { get; set; }
        public string CardDone { get; set; }
        public string NewEntry_Remarks { get; set; }
        public int ANPId { get; set; }
        public string Relation { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? TotalCount { get; set; }

    }
}
