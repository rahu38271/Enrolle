using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Model
{
    public class ConfigureDB
    {
        public int Id { get; set; }
        public string DBName { get; set; }
        public string IPAddress { get; set; }
        public string HostName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public int? SuperAdminId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string MessageSent { get; set; }

    }
}
