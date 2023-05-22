﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Dto
{
    public class ActivityLogDTO
    {
        public int Id { get; set; }
        public string Module { get; set; }
        public string Action { get; set; }
        public string Description { get; set; }
        public int? RecordsId { get; set; }
        public int? UserId { get; set; }
        public int? AdminId { get; set; }
        public DateTime? Date { get; set; }
        public int? TotalCount { get; set; }
        public string UserName { get; set; }

    }
}
