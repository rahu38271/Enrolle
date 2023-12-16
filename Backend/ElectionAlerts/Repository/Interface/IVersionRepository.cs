using ElectionAlerts.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Repository.Interface
{
    public interface IVersionRepository
    {
        int InsertUpdateVersion(Versions version);
        IEnumerable<Versions> GetAllVersion();
        IEnumerable<Versions> GetVersionbyId(int Id);
        int DeleteVersionbyId(int Id);

    }
}
