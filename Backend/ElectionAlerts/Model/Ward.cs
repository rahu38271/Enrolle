using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Model
{
    public class Ward
    {
        public int Id { get; set; }
        public int BoothNo { get; set; }
        public string BoothName { get; set; }
        public string WardName { get; set; }
        public int WardNo { get; set; }

    }
}
