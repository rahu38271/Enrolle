using ElectionAlerts.Model;
using ElectionAlerts.Repository.Interface;
using ElectionAlerts.Services.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Services.ServiceClasses
{
    public class SuperAdminService : ISuperAdminService
    {
        private readonly ISuperAdminRepository _superAdminRepository;

        public SuperAdminService(ISuperAdminRepository superAdminRepository )
        {
            _superAdminRepository = superAdminRepository;
        }
        public IEnumerable<SuperAdmin> GetAllSuperAdmin()
        {
            return _superAdminRepository.GetAllSuperAdmin();
        }

        public int InsertSuperAdmin(SuperAdmin superAdmin)
        {
            return _superAdminRepository.InsertSuperAdmin(superAdmin);
        }

        public int UpdateSuperAdmin(SuperAdmin superAdmin)
        {
            return _superAdminRepository.UpdateSuperAdmin(superAdmin);
        }
    }
}
