using ElectionAlerts.Dto;
using ElectionAlerts.Model;
using ElectionAlerts.Repository.Interface;
using ElectionAlerts.Services.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Services.ServiceClasses
{
    public class DailyNewsService : IDailyNewsService
    {
        private readonly IDailyNewsRepository _dailyNewsRepository;

        public DailyNewsService(IDailyNewsRepository dailyNewsRepository)
        {
            _dailyNewsRepository = dailyNewsRepository;
        }

        public IEnumerable<DailyNewsDTO> GetAllDailyNews(int UserId, int RoleId, int PageNo, int NoofRow, string SearchText)
        {
            return _dailyNewsRepository.GetAllDailyNews(UserId, RoleId, PageNo, NoofRow, SearchText);
        }

        public DailyNews GetDailyNewsbyId(int Id)
        {
            return _dailyNewsRepository.GetDailyNewsbyId(Id);
        }

        public int InsetUpdateDailyNews(DailyNews dailyNews)
        {
            return _dailyNewsRepository.InsetUpdateDailyNews(dailyNews);
        }
    }
}
