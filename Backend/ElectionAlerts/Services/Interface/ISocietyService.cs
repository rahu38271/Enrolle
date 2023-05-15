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
        int InsertUpdateSocietyComplaint(SocietyModel societyModel);
        IEnumerable<SocietyComplaintDTO> GetSocietyComplaints(int PageNo, int NoofRow, string SearchText);
        SocietyComplaint GetSocietyComplaintbyUserId(int UserId);
        SocietyComplaint GetSocietyComplaintbyId(int Id);
        int UpdateComplaintStatus(int Id, string Status);
        IEnumerable<SocietyComplaintDTO> GetComplaintsbyStatus(string Status,int PageNo, int NoofRow, string SearchText);
        IEnumerable<SocietyComplaintDTO> GetTodayComplaint(int PageNo, int NoofRow, string SearchText);
        IEnumerable<ComplaintCount> GetComplaintCount();
        int DeleteSocietyComplaintbyId(int Id);
    }
}
