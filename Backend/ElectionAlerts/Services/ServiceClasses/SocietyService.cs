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

        public IEnumerable<Society> GetAllSociety()
        {
            return _societyRepository.GetAllSociety();
        }
    }
}
