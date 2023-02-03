using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Model
{
    public class SuperAdmin
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string UserRole { get; set; }
        public string Mobile_Id { get; set; }
        public string Password { get; set; }
        public string State { get; set; }
        public string AssemblyName { get; set; }
        public string District { get; set; }
        public int? AssemblyNo { get; set; }
        public string Taluka { get; set; }
        public string Village { get; set; }
        public int? Validity { get; set; }
        public string IsDeleted { get; set; }

    }
}
