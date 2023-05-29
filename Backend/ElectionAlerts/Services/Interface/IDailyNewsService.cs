using ElectionAlerts.Dto;
using ElectionAlerts.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Services.Interface
{
    public interface IDailyNewsService
    {
        int InsetUpdateDailyNews(DailyNews dailyNews);
        IEnumerable<DailyNewsDTO> GetAllDailyNews(int UserId, int RoleId, int PageNo, int NoofRow, string SearchText);
        DailyNews GetDailyNewsbyId(int Id);
        int DeleteDailyNews(int Id);
    }
}
