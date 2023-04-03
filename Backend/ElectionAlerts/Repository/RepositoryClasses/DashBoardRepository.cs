using ElectionAlerts.Dto;
using ElectionAlerts.Model.Data;
using ElectionAlerts.Repository.Interface;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Repository.RepositoryClasses
{
    public class DashBoardRepository : IDashBoardRepository
    {
        CustomContext _customContext = new CustomContext();

        public IEnumerable<AssemblyDashboard> GetAssemblyCount(string Type)
        {
            try
            {
                return _customContext.Set<AssemblyDashboard>().FromSqlRaw("EXEC USP_GetDistrict_AssemblyCount {0}", Type).ToList();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<DistrictDashboard> GetDistrictCount(string Type)
        {
            try
            {
                return _customContext.Set<DistrictDashboard>().FromSqlRaw("EXEC USP_GetDistrict_AssemblyCount {0}",Type).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
