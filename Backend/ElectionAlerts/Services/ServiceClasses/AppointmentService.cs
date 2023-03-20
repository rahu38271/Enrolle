using ElectionAlerts.Model;
using ElectionAlerts.Repository.Interface;
using ElectionAlerts.Services.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Services.ServiceClasses
{
    public class AppointmentService : IAppointmentService
    {
        private readonly IAppointmentRepository _appointmentRepository;

        public AppointmentService(IAppointmentRepository appointmentRepository)
        {
            _appointmentRepository = appointmentRepository;
        }

        public IEnumerable<Appointment> GetAppointmentbyDate(DateTime dateTime)
        {
            return _appointmentRepository.GetAppointmentbyDate(dateTime);
        }

        public IEnumerable<Appointment> GetAppointments()
        {
            return _appointmentRepository.GetAppointments();
        }

        public int InsertUpdateAppintment(Appointment appointment)
        {
            return _appointmentRepository.InsertUpdateAppintment(appointment);
        }
    }
}
