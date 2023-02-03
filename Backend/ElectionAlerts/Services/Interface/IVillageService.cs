using ElectionAlerts.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Services.Interface
{
    public interface IVillageService
    {
        IEnumerable<Village> GetVillage(string taluka);

        int InsertBulkVillageList(List<Village> villages);
    }
}
