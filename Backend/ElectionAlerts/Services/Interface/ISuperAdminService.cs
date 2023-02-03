using ElectionAlerts.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Services.Interface
{
    public interface ISuperAdminService
    {
        int InsertSuperAdmin(SuperAdmin superAdmin);

        int UpdateSuperAdmin(SuperAdmin superAdmin);
        IEnumerable<SuperAdmin> GetAllSuperAdmin();

    }
}
