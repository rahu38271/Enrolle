using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Dto
{
    public class AppointmentCount
    {
        public int TotalAppointment { get; set; }
        public int TodayAppointment { get; set; }
        public int Approved { get; set; }
        public int Rejected { get; set; }

    }
}
