using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Dto
{
    public class ActivityLogCountDTO
    {
        public int? UserId { get; set; }
        public int? TotalCount { get; set; }
        public string UserName { get; set; }
    }
}
