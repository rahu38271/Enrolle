using ElectionAlerts.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Repository.Interface
{
    public interface IAppointmentRepository
    {
        int InsertUpdateAppintment(Appointment appointment);
        IEnumerable<Appointment> GetAppointments();
        IEnumerable<Appointment> GetAppointmentbyDate(DateTime dateTime);

    }
}
