using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Model
{
    public class Versions
    {
        public int Id { get; set; }
        public string Installedversion { get; set; }
        public string NewVersion { get; set; }
        public string NewVersionDate { get; set; }

    }
}
