using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Model
{
    public class DailyNews
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime? Date { get; set; }
        public string AboutNews { get; set; }
        public string Medium { get; set; }
        public string NameMedium { get; set; }
        public string Jounalist { get; set; }
        public string FileName { get; set; }
        public string NewsLink { get; set; }
        public string InFavour { get; set; }
        public int? UserId { get; set; }
        public int? AdminId { get; set; }
        public DateTime? CreatedDate { get; set; }

    }
}
