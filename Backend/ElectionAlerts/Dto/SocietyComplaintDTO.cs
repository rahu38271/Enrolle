using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Dto
{
    public class SocietyComplaintDTO
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string Details { get; set; }
        public string Remark { get; set; }
        public string FileName { get; set; }
        public int? UserId { get; set; }
        public int? RoleId { get; set; }
        public string UserName { get; set; }
        public int? AdminId { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Status { get; set; }
        public int TotalCount { get; set; }

    }
}
