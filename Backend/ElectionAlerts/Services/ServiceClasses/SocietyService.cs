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

        public IEnumerable<Society> GetAllSociety()
        {
            return _societyRepository.GetAllSociety();
        }

        public IEnumerable<ComplaintCount> GetComplaintCount()
        {
            return _societyRepository.GetComplaintCount();
        }

        public IEnumerable<SocietyComplaint> GetComplaintsbyStatus(string Status)
        {
            return _societyRepository.GetComplaintsbyStatus(Status);
        }

        public SocietyComplaint GetSocietyComplaintbyId(int UserId)
        {
            return _societyRepository.GetSocietyComplaintbyId(UserId);
        }

        public IEnumerable<SocietyComplaint> GetSocietyComplaints()
        {
            return _societyRepository.GetSocietyComplaints();
        }

        public IEnumerable<SocietyComplaint> GetTodayComplaint()
        {
            return _societyRepository.GetTodayComplaint();
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
