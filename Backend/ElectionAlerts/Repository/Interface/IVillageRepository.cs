using ElectionAlerts.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Repository.Interface
{
    public interface IVillageRepository
    {
        IEnumerable<Village> GetVillage(string taluka);
        int InsertBulkVillageList(List<Village> villages);
    }
}
