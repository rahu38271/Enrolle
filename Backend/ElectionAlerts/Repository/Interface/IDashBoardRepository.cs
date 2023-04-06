using ElectionAlerts.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Repository.Interface
{
    public interface IDashBoardRepository
    {
        IEnumerable<DistrictDashboard> GetDistrictCount(string Type);
        IEnumerable<AssemblyDashboard> GetAssemblyCount(string Type);

    }
}
