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
        IEnumerable<Society> GetAllSociety();
        int DeleteSocietybuId(int Id);
        int InsertUpdateSocietyComplaint(SocietyModel societyModel);
        IEnumerable<SocietyComplaint> GetSocietyComplaints();
        SocietyComplaint GetSocietyComplaintbyId(int UserId);
        int UpdateComplaintStatus(int Id, string Status);
        IEnumerable<SocietyComplaint> GetComplaintsbyStatus(string Status);
        IEnumerable<SocietyComplaint> GetTodayComplaint();
        IEnumerable<ComplaintCount> GetComplaintCount();
        int DeleteSocietyComplaintbyId(int Id);
    }
}
