using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Model
{
    public class UserAssigned
    {
        public int UserId { get; set; }
        public string PartNoAssigned { get; set; }
        public DateTime CreatedDate { get; set; }
        public int AdminId { get; set; }
        public int RoleId { get; set; }

    }
}
