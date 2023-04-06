using ElectionAlerts.Dto;
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

        public int DeleteAppointmentbyId(int Id)
        {
            return _appointmentRepository.DeleteAppointmentbyId(Id);
        }

        public int DownloadFile(int Id, string FileName)
        {
            return _appointmentRepository.DownloadFile(Id,FileName);
        }

        public IEnumerable<Appointment> GetAppointmentbyDate(DateTime dateTime)
        {
            return _appointmentRepository.GetAppointmentbyDate(dateTime);
        }

        public IEnumerable<Appointment> GetAppointmentbyStatus(string Status)
        {
            return _appointmentRepository.GetAppointmentbyStatus(Status);
        }

        public IEnumerable<Appointment> GetAppointments()
        {
            return _appointmentRepository.GetAppointments();
        }

        public IEnumerable<AppointmentDTO> GetTodayAppointment()
        {
            return _appointmentRepository.GetTodayAppointment();
        }

        public int InsertUpdateAppintment(Appointment appointment)
        {
            return _appointmentRepository.InsertUpdateAppintment(appointment);
        }

        public int UpdateApointmentStatus(int Id, string Status, DateTime? datetime)
        {
            return _appointmentRepository.UpdateApointmentStatus(Id, Status, datetime);
        }
    }
}
