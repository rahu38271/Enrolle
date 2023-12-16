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
    public class SocietyService : ISocietyService
    {
        private readonly ISocietyRepository _societyRepository;

        public SocietyService(ISocietyRepository societyRepository)
        {
            _societyRepository = societyRepository;
        }
        public int CreateUpdateSociety(Society society)
        {
            return _societyRepository.CreateUpdateSociety(society);
        }

        public int DeleteSocietybuId(int Id)
        {
            return _societyRepository.DeleteSocietybuId(Id);
        }

        public int DeleteSocietyComplaintbyId(int Id)
        {
            return _societyRepository.DeleteSocietyComplaintbyId(Id);
        }

        public IEnumerable<SocietyDTO> GetAllSociety(int PageNo, int NoofRow, string SearchText)
        {
            return _societyRepository.GetAllSociety(PageNo,NoofRow,SearchText);
        }

        public IEnumerable<ComplaintCount> GetComplaintCount()
        {
            return _societyRepository.GetComplaintCount();
        }

        public IEnumerable<ComplaintCount> GetComplaintCountbyUserId(int UserId, int RoleId)
        {
            return _societyRepository.GetComplaintCountbyUserId(UserId, RoleId);
        }

        public IEnumerable<SocietyComplaintDTO> GetComplaintsbyStatus(int UserId, int RoleId,string Status, int PageNo, int NoofRow, string SearchText)
        {
            return _societyRepository.GetComplaintsbyStatus( UserId, RoleId,Status,PageNo,NoofRow,SearchText);
        }

        public IEnumerable<SocietyComplaintDTO> GetSocietyComplaintbyDate(int UserId, int RoleId, string Subject, string FromDate, string ToDate, string UserName)
        {
            return _societyRepository.GetSocietyComplaintbyDate( UserId, RoleId,Subject, FromDate, ToDate, UserName);
        }

        public SocietyComplaint GetSocietyComplaintbyId(int Id)
        {
            return _societyRepository.GetSocietyComplaintbyId(Id);
        }

        public IEnumerable<SocietyComplaintDTO> GetSocietyComplaintbyUserId(int UserId)
        {
            return _societyRepository.GetSocietyComplaintbyUserId(UserId);
        }

        public IEnumerable<SocietyComplaintDTO> GetSocietyComplaintFromDate(int UserId, int RoleId, string FromDate, string ToDate, string Status)
        {
            return _societyRepository.GetSocietyComplaintFromDate(UserId, RoleId,FromDate, ToDate, Status);
        }

        public IEnumerable<SocietyComplaintDTO> GetSocietyComplaints(int UserId, int RoleId,int PageNo, int NoofRow, string SearchText)
        {
            return _societyRepository.GetSocietyComplaints(UserId, RoleId,PageNo, NoofRow,SearchText);
        }

        public IEnumerable<SocietyComplaintDTO> GetTodayComplaint(int UserId, int RoleId, int PageNo, int NoofRow, string SearchText)
        {
            return _societyRepository.GetTodayComplaint(UserId, RoleId, PageNo, NoofRow, SearchText);
        }

        public int InsertUpdateSocietyComplaint(SocietyComplaint societyModel)
        {
            return _societyRepository.InsertUpdateSocietyComplaint(societyModel);
        }

        public int UpdateComplaintStatus(int Id, string Status)
        {
            return _societyRepository.UpdateComplaintStatus(Id, Status);
        }
    }
}
