using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Dto
{
    public class SubLetterDTO
    {
        public int Id { get; set; }
        public string Letter_No { get; set; }
        public DateTime? Letter_Realese_Date { get; set; }
        public DateTime? To_Other_Department { get; set; }
        public string Department_Name { get; set; }
        public string Office_Name { get; set; }
        public string Remark { get; set; }
        public string FileName { get; set; }
        public string Status { get; set; }
        public int? UserId { get; set; }
        public string UserName { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int TotalCount { get; set; }

    }
}
