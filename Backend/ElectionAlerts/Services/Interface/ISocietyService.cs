using ElectionAlerts.Dto;
using ElectionAlerts.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Services.Interface
{
    public interface ISocietyService
    {
        int CreateUpdateSociety(Society society);
        IEnumerable<SocietyDTO> GetAllSociety(int PageNo, int NoofRow, string SearchText);
        int DeleteSocietybuId(int Id);
        int InsertUpdateSocietyComplaint(SocietyComplaint societyModel);
        IEnumerable<SocietyComplaintDTO> GetSocietyComplaints(int UserId,int RoleId,int PageNo, int NoofRow, string SearchText);
        IEnumerable<SocietyComplaintDTO> GetSocietyComplaintbyUserId(int UserId);
        SocietyComplaint GetSocietyComplaintbyId(int Id);
        int UpdateComplaintStatus(int Id, string Status);
        IEnumerable<SocietyComplaintDTO> GetComplaintsbyStatus(int UserId, int RoleId, string Status,int PageNo, int NoofRow, string SearchText);
        IEnumerable<SocietyComplaintDTO> GetTodayComplaint(int UserId, int RoleId, int PageNo, int NoofRow, string SearchText);
        IEnumerable<ComplaintCount> GetComplaintCount();
        IEnumerable<ComplaintCount> GetComplaintCountbyUserId(int UserId, int RoleId);
        int DeleteSocietyComplaintbyId(int Id);
        IEnumerable<SocietyComplaintDTO> GetSocietyComplaintbyDate(int UserId, int RoleId, string Subject, string FromDate, string ToDate, string UserName);
        IEnumerable<SocietyComplaintDTO> GetSocietyComplaintFromDate(int UserId, int RoleId, string FromDate, string ToDate, string Status);
    }
}
