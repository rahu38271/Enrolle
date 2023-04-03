using ElectionAlerts.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Services.Interface
{
    public interface IDashBoardService
    {
        IEnumerable<DistrictDashboard> GetDistrictCount(string Type);
        IEnumerable<AssemblyDashboard> GetAssemblyCount(string Type);
    }
}
