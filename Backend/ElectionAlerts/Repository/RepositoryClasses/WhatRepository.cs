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
    public class WhatRepository : IWhatRespository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private CustomContext _customContext;
        public WhatRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _customContext = new CustomContext(_httpContextAccessor);
        }
        public int CreateUpdateWhatUp(WhatUpSetting whatUpSetting)
        {
            try
            {
               return _customContext.Database.ExecuteSqlRaw("EXEC USP_InsertUpdateWhatUpSetting {0},{1},{2},{3},{4},{5},{6},{7},{8},{9}", whatUpSetting.Id, whatUpSetting.URL, whatUpSetting.BirthDMessage, whatUpSetting.AnniverDMessage, whatUpSetting.BithDayMediaurl, whatUpSetting.AnniverDayMediaurl, whatUpSetting.BithDayFileName, whatUpSetting.AnniverDayFileName, whatUpSetting.InstanceId, whatUpSetting.AccessToken);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public WhatUpSetting GetWhatUpSetting()
        {
            try
            {
                return _customContext.Set<WhatUpSetting>().FromSqlRaw("EXEC USP_GetWhatUpSetting").ToList().FirstOrDefault();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
