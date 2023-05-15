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

        public IEnumerable<SocietyComplaintDTO> GetComplaintsbyStatus(string Status, int PageNo, int NoofRow, string SearchText)
        {
            return _societyRepository.GetComplaintsbyStatus(Status,PageNo,NoofRow,SearchText);
        }

        public SocietyComplaint GetSocietyComplaintbyId(int Id)
        {
            return _societyRepository.GetSocietyComplaintbyId(Id);
        }

        public SocietyComplaint GetSocietyComplaintbyUserId(int UserId)
        {
            return _societyRepository.GetSocietyComplaintbyUserId(UserId);
        }

        public IEnumerable<SocietyComplaintDTO> GetSocietyComplaints(int PageNo, int NoofRow, string SearchText)
        {
            return _societyRepository.GetSocietyComplaints(PageNo,NoofRow,SearchText);
        }

        public IEnumerable<SocietyComplaintDTO> GetTodayComplaint(int PageNo, int NoofRow, string SearchText)
        {
            return _societyRepository.GetTodayComplaint(PageNo,NoofRow,SearchText);
        }

        public int InsertUpdateSocietyComplaint(SocietyModel societyModel)
        {
            return _societyRepository.InsertUpdateSocietyComplaint(societyModel);
        }

        public int UpdateComplaintStatus(int Id, string Status)
        {
            return _societyRepository.UpdateComplaintStatus(Id, Status);
        }
    }
}
