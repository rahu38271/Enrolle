using ElectionAlerts.Dto;
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
    public class DailyNewsRepository : IDailyNewsRepository
    {
        private CustomContext _customContext = new CustomContext();

        public int DeleteDailyNews(int Id)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("Exec USP_DeleteDailyNewsId {0}", Id);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<DailyNewsDTO> GetAllDailyNews(int UserId, int RoleId, int PageNo, int NoofRow, string SearchText)
        {
            try
            {
                return _customContext.Set<DailyNewsDTO>().FromSqlRaw("Exec USP_GetAllDailyNews {0},{1},{2},{3},{4}", UserId, RoleId, PageNo, NoofRow, SearchText);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public DailyNews GetDailyNewsbyId(int Id)
        {
            try
            {
                return _customContext.Set<DailyNews>().FromSqlRaw("Exec USP_GetDailyNewsbyId {0}", Id).ToList().FirstOrDefault();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public int InsetUpdateDailyNews(DailyNews dailyNews)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("Exec USP_InsertUpdateDailyNews {0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11},{12}", dailyNews.Id, dailyNews.Subject, dailyNews.Date, dailyNews.AboutNews, dailyNews.Medium, dailyNews.NameMedium, dailyNews.Jounalist, dailyNews.FileName, dailyNews.NewsLink, dailyNews.InFavour, dailyNews.UserId, dailyNews.AdminId, DateTime.Now);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
