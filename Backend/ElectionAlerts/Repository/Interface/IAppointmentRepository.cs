using ElectionAlerts.Dto;
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
        IEnumerable<Appointment> GetAppointments(int UserId,int RoleId);
        IEnumerable<Appointment> GetAppointmentbyDate(int UserId, int RoleId,string dateTime);
        int DeleteAppointmentbyId(int Id);
        int UpdateApointmentStatus(int Id, string Status, string datetime);
        IEnumerable<AppointmentDTO> GetTodayAppointment(int UserId, int RoleId);
        IEnumerable<Appointment> GetAppointmentbyStatus(int UserId, int RoleId,string Status);
        int DownloadFile(int Id,string FileName);
        IEnumerable<Appointment> GetAppointmentFromToDate(int UserId, int RoleId, string FromDate,string ToDate);
        IEnumerable<AppointmentCount> GetAppointmentCount(int UserId, int RoleId);
        IEnumerable<AppointmentCountbyUser> GetAppointmentCountbyUser();
        IEnumerable<Appointment> GetAppointmentbyUserId(int UserId);
    }
}
