using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Dto
{
    public class VoterTable
    {
        public string TableName { get; set; }
        public string ColumnName { get; set; }
        public string ColumnValue { get; set; }
        public string Condition { get; set; }
        public int UserId { get; set; }
    }
}
