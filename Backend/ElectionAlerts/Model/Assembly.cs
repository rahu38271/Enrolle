using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Model
{
    public class Assembly
    {
        public int Id { get; set; }
        public string State { get; set; }
        public string AssemblyName { get; set; }
        public int AssemblyNo { get; set; }
        public string District { get; set; }

    }
}
