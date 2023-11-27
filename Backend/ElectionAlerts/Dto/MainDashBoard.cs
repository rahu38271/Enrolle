using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Dto
{
    public class MainDashBoard
    {
        public int? TotalContact { get; set; }
        public int? TodayBirthDay { get; set; }
        public int? TodayAnniversary { get; set; }
        public int? TotalAppointment { get; set; }
        public int? TodayAppointment { get; set; }
        public int? TotalComplaint { get; set; }
        public int? TodayComplaint { get; set; }
        public int? TotalLetter { get; set; }
        public int? TodayLetter { get; set; }

    }
}
