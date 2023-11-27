using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Dto
{
    public class LetterDTO
    {
        public int Id { get; set; }
        public string CaseNo { get; set; }
        public string Letter_Request_Person { get; set; }
        public string Subject { get; set; }
        public string Mobile_No { get; set; }
        public string Office { get; set; }
        public string Department { get; set; }
        public DateTime? BirthDate { get; set; }
        public string Refference_Name { get; set; }
        public string Address { get; set; }
        public string District { get; set; }
        public string Taluka { get; set; }
        public string Village { get; set; }
        public string Letter_Outward_No { get; set; }
        public DateTime? Letter_Release_Date { get; set; }
        public DateTime? Letter_Submit_Date { get; set; }
        public string Status { get; set; }
        public string FileName { get; set; }
        public int UserId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string UserName { get; set; }
        public int TotalCount { get; set; }

    }
}
