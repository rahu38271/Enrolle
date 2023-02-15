using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Model
{
    public class AdminUser
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Contact { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string State { get; set; }
        public string District { get; set; }
        public string Taluka { get; set; }
        public string AssemblyName { get; set; }
        public string Village { get; set; }
        public int? RoleId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }
        public int? AdminId { get; set; }

    }
}
