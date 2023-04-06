using ElectionAlerts.Dto;
using ElectionAlerts.Repository.Interface;
using ElectionAlerts.Services.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Services.ServiceClasses
{
    public class DashBoardService : IDashBoardService
    {
        private readonly IDashBoardRepository _dashBoardRepository;

        public DashBoardService(IDashBoardRepository dashBoardRepository)
        {
            _dashBoardRepository = dashBoardRepository;
        }

        public IEnumerable<AssemblyDashboard> GetAssemblyCount(string Type)
        {
            return _dashBoardRepository.GetAssemblyCount(Type);
        }

        public IEnumerable<DistrictDashboard> GetDistrictCount(string Type)
        {
            return _dashBoardRepository.GetDistrictCount(Type);
        }
    }
}
