using ElectionAlerts.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Services.Interface
{
    public interface IAppointmentService
    {
        int InsertUpdateAppintment(Appointment appointment);
        IEnumerable<Appointment> GetAppointments();
        IEnumerable<Appointment> GetAppointmentbyDate(DateTime dateTime);
        int DeleteAppointmentbyId(int Id);
    }
}
