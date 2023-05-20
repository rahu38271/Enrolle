using ElectionAlerts.Dto;
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
        IEnumerable<AppointmentDTO> GetAppointments(int UserId, int RoleId, int PageNo, int NoofRow, string SearchText);
        IEnumerable<Appointment> GetAppointmentbyDate(int UserId, int RoleId, string dateTime);
        int DeleteAppointmentbyId(int Id);
        int UpdateApointmentStatus(int Id, string Status, string datetime);
        IEnumerable<AppointmentDTO> GetTodayAppointment(int UserId, int RoleId, int PageNo, int NoofRow, string SearchText);
        IEnumerable<AppointmentDTO> GetAppointmentbyStatus(int UserId, int RoleId, string Status, int PageNo, int NoofRow, string SearchText);
        int DownloadFile(int Id, string FileName);
        IEnumerable<AppointmentDTO> GetAppointmentFromToDate(int UserId, int RoleId, string FromDate, string ToDate, int PageNo, int NoofRow, string SearchText);
        IEnumerable<AppointmentCount> GetAppointmentCount(int UserId, int RoleId);
        IEnumerable<AppointmentCountbyUser> GetAppointmentCountbyUser();
        IEnumerable<AppointmentDTO> GetAppointmentbyUserId(int UserId, int PageNo, int NoofRow, string SearchText);
        Appointment GetAppointmentbyId(int Id);
    }
}
