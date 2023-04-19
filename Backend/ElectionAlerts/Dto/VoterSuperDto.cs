using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Dto
{
    public class VoterSuperDto
    {
        public string Assembly { get; set; }
        public string District { get; set; }
        public string Taluka { get; set; }
        public string Village { get; set; }
        public int PageNo { get; set; }
        public int NoofRow { get; set; }
        public string Language { get; set; }

    }
}
