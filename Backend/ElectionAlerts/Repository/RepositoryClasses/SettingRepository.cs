using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ElectionAlerts.Model;
using ElectionAlerts.Model.Data;
using ElectionAlerts.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace ElectionAlerts.Repository.RepositoryClasses
{
    public class SettingRepository: ISettingRepository
    {
        private CustomContext _customContext = new CustomContext();
        public List<Districts> GetAllDistricts()
        {
            try
            {
                return _customContext.Set<Districts>().FromSqlRaw("EXEC USP_GetAllDistricts").ToList();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

       public List<Taluka> GetAllTaluka(int DId)
        {
            try
            {
                return _customContext.Set<Taluka>().FromSqlRaw("EXEC USP_GetAllTaluka {0}",DId).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
