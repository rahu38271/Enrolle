using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Model
{
    public class ErrorLog
    {
        public int Id { get; set; }
        public string ExMessage { get; set; }
        public string StackTrace { get; set; }
        public string LogType { get; set; }
        public string ExLocation { get; set; }
        public string UseId { get; set; }
        public string CreatedDate { get; set; }
    }
}
