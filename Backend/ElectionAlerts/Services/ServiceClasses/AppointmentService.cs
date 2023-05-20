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

        public Appointment GetAppointmentbyId(int Id)
        {
            return _appointmentRepository.GetAppointmentbyId(Id);
        }

        public IEnumerable<AppointmentDTO> GetAppointmentbyStatus(int UserId, int RoleId, string Status, int PageNo, int NoofRow, string SearchText)
        {
            return _appointmentRepository.GetAppointmentbyStatus(UserId,RoleId, Status,PageNo,NoofRow,SearchText);
        }

        public IEnumerable<AppointmentDTO> GetAppointmentbyUserId(int UserId, int PageNo, int NoofRow, string SearchText)
        {
            return _appointmentRepository.GetAppointmentbyUserId(UserId,PageNo,NoofRow,SearchText);
        }

        public IEnumerable<AppointmentCount> GetAppointmentCount(int UserId, int RoleId)
        {
            return _appointmentRepository.GetAppointmentCount(UserId, RoleId);
        }

        public IEnumerable<AppointmentCountbyUser> GetAppointmentCountbyUser()
        {
            return _appointmentRepository.GetAppointmentCountbyUser();
        }

        public IEnumerable<AppointmentDTO> GetAppointmentFromToDate(int UserId, int RoleId, string FromDate, string ToDate, int PageNo, int NoofRow, string SearchText)
        {
            return _appointmentRepository.GetAppointmentFromToDate(UserId, RoleId, FromDate, ToDate,PageNo,NoofRow,SearchText);
        }

        public IEnumerable<AppointmentDTO> GetAppointments(int UserId, int RoleId, int PageNo, int NoofRow, string SearchText)
        {
            return _appointmentRepository.GetAppointments(UserId, RoleId,PageNo,NoofRow,SearchText);
        }

        public IEnumerable<AppointmentDTO> GetTodayAppointment(int UserId, int RoleId, int PageNo, int NoofRow, string SearchText)
        {
            return _appointmentRepository.GetTodayAppointment(UserId,RoleId,PageNo,NoofRow,SearchText);
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
