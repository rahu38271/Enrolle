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

        public IEnumerable<Appointment> GetAppointmentbyDate(int UserId, int RoleId, string dateTime)
        {
            return _appointmentRepository.GetAppointmentbyDate(UserId,RoleId, dateTime);
        }

        public IEnumerable<Appointment> GetAppointmentbyStatus(int UserId, int RoleId, string Status)
        {
            return _appointmentRepository.GetAppointmentbyStatus(UserId,RoleId, Status);
        }

        public IEnumerable<Appointment> GetAppointmentbyUserId(int UserId)
        {
            return _appointmentRepository.GetAppointmentbyUserId(UserId);
        }

        public IEnumerable<AppointmentCount> GetAppointmentCount(int UserId, int RoleId)
        {
            return _appointmentRepository.GetAppointmentCount(UserId, RoleId);
        }

        public IEnumerable<AppointmentCountbyUser> GetAppointmentCountbyUser()
        {
            return _appointmentRepository.GetAppointmentCountbyUser();
        }

        public IEnumerable<Appointment> GetAppointmentFromToDate(int UserId, int RoleId, string FromDate, string ToDate)
        {
            return _appointmentRepository.GetAppointmentFromToDate(UserId, RoleId, FromDate, ToDate);
        }

        public IEnumerable<Appointment> GetAppointments(int UserId, int RoleId)
        {
            return _appointmentRepository.GetAppointments(UserId, RoleId);
        }

        public IEnumerable<AppointmentDTO> GetTodayAppointment(int UserId, int RoleId)
        {
            return _appointmentRepository.GetTodayAppointment(UserId,RoleId);
        }

        public int InsertUpdateAppintment(Appointment appointment)
        {
            return _appointmentRepository.InsertUpdateAppintment(appointment);
        }

        public int UpdateApointmentStatus(int Id, string Status, string datetime)
        {
            return _appointmentRepository.UpdateApointmentStatus(Id, Status, datetime);
        }
    }
}
