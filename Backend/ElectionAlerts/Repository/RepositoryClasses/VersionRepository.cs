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
    public class VersionRepository : IVersionRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private CustomContext _custonContext;
        public VersionRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _custonContext = new CustomContext(_httpContextAccessor);
        }
        public int DeleteVersionbyId(int Id)
        {
            try
            {
                return _custonContext.Database.ExecuteSqlRaw("Exec Usp_DeleteVersionbyId {0}", Id);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Versions> GetAllVersion()
        {
            try
            {
                return _custonContext.Set<Versions>().FromSqlRaw("Exec Usp_GetAllVersion");
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Versions> GetVersionbyId(int Id)
        {
            try
            {
                return _custonContext.Set<Versions>().FromSqlRaw("Exec Usp_GetVersionsbyVid {0}", Id);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public int InsertUpdateVersion(Versions version)
        {
            try
            {
               return _custonContext.Database.ExecuteSqlRaw("Exec Usp_InsertUpdateVersion {0},{1},{2},{3}",version.Id,version.Installedversion,version.NewVersion,version.NewVersionDate);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
