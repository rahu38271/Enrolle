using ElectionAlerts.Model;
using ElectionAlerts.Model.Data;
using ElectionAlerts.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Repository.RepositoryClasses
{
    public class SmsSettingRepository : ISmsSettingRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private CustomContext _custonContext;
        public SmsSettingRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _custonContext = new CustomContext(_httpContextAccessor);
        }
        public int DeleteSmsSettingbyId(int Id)
        {
            try
            {
                return _custonContext.Database.ExecuteSqlRaw("Exec Usp_DeleteSmsSettingbyId {0}", Id);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<SmsSetting> GetAllSmsSetting()
        {
            try
            {
                return _custonContext.Set<SmsSetting>().FromSqlRaw("Exec USP_GetAllSmsSetting");
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<SmsSetting> GetSmsSettingbyId(string MType)
        {
            try
            {
                return _custonContext.Set<SmsSetting>().FromSqlRaw("Exec USP_GetSmsSettingbyId {0}", MType);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public int InsertUpdateSmsSetting(SmsSetting smsSetting)
        {
            try
            {
                return _custonContext.Database.ExecuteSqlRaw("Exec Usp_InsertUpdateSmsSetting {0},{1},{2},{3},{4},{5},{6},{7},{8}", smsSetting.Id, smsSetting.Url, smsSetting.UserName, smsSetting.Password, smsSetting.SenderId, smsSetting.Type, smsSetting.Text, smsSetting.PeId, smsSetting.MType);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
