using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Dto
{
    public class GeneralEnquirySearch
    {
        public string TypeofWork { get; set; }
        public string FullName { get; set; }
        public string MobileNo { get; set; }
        public string Society_BuildingName { get; set; }
        public string Area { get; set; }
        public string AaddharCardNumber { get; set; }
        public string Reference { get; set; }
        public string TypeofForm { get; set; }
        public string TypeofComplaints { get; set; }
        public string PersonEnteringData { get; set; }
        public int UserId { get; set; }
        public int RoleId { get; set; }
        public int PageNo { get; set; }
        public int NoofRow { get; set; }

    }
}
