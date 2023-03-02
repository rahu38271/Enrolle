using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Model
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Contact { get; set; }
        public string UserName { get; set; }
         public string Address { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string State { get; set; }
        public string District { get; set; }
        public string Taluka { get; set; }
        public string AssemblyName { get; set; }
        public string Ward { get; set; }
        public string village { get; set; }
        public string Candidate { get; set; }
        public string Quote { get; set; }
        public int? RoleId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }
        public string IsDeleted { get; set; }
        public int? AdminId { get; set; }

    }
}
