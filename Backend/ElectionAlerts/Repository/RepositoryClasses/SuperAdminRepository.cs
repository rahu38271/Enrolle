using ElectionAlerts.Model;
using ElectionAlerts.Model.Data;
using ElectionAlerts.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Repository.RepositoryClasses
{
    public class SuperAdminRepository : ISuperAdminRepository
    {
        private CustomContext _customContext = new CustomContext();
        public IEnumerable<SuperAdmin> GetAllSuperAdmin()
        {
            try
            {
                return _customContext.Set<SuperAdmin>().FromSqlRaw("USP_GetAllSuperAdmin").ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int InsertSuperAdmin(SuperAdmin superAdmin)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("EXEC USP_InsertSuperAdmin {0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11}", superAdmin.Name, superAdmin.UserRole, superAdmin.Mobile_Id, superAdmin.Password, superAdmin.State, superAdmin.AssemblyName,superAdmin.District,superAdmin.AssemblyNo,superAdmin.Taluka,superAdmin.Village, superAdmin.Validity, superAdmin.IsDeleted);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        public int UpdateSuperAdmin(SuperAdmin superAdmin)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("EXEC Usp_UpdateSuperAdmin {0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11},{12}", superAdmin.Id, superAdmin.Name, superAdmin.UserRole, superAdmin.Mobile_Id, superAdmin.Password, superAdmin.State, superAdmin.AssemblyName, superAdmin.District, superAdmin.AssemblyNo, superAdmin.Taluka, superAdmin.Village, superAdmin.Validity, superAdmin.IsDeleted);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
    }
}
