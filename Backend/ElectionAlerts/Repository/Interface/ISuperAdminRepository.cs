using ElectionAlerts.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Repository.Interface
{
    public interface ISuperAdminRepository
    {
        int InsertSuperAdmin(SuperAdmin superAdmin);

        int UpdateSuperAdmin(SuperAdmin superAdmin);
        IEnumerable<SuperAdmin> GetAllSuperAdmin();
       

    }
}
