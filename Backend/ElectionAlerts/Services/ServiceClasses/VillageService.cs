using ElectionAlerts.Model;
using ElectionAlerts.Repository.Interface;
using ElectionAlerts.Services.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Services.ServiceClasses
{
    public class VillageService : IVillageService
    {
        private readonly IVillageRepository _villageRepository;

        public VillageService(IVillageRepository villageRepository)
        {
            _villageRepository = villageRepository;
        }
        public IEnumerable<Village> GetVillage(string taluka)
        {
           return _villageRepository.GetVillage(taluka);
        }

        public int InsertBulkVillageList(List<Village> villages)
        {
            return _villageRepository.InsertBulkVillageList(villages);
        }
    }
}
