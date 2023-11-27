using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ElectionAlerts.Dto;
using ElectionAlerts.Model;
using ElectionAlerts.Model.Data;
using ElectionAlerts.Repository.Interface;
using ElectionAlerts.Services.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace ElectionAlerts.Repository.RepositoryClasses
{
    public class NotificationRepository: INotificationRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private CustomContext _customContext;
        public NotificationRepository(IHttpContextAccessor httpContextAccessor)
        {
             _httpContextAccessor = httpContextAccessor;
            _customContext = new CustomContext(_httpContextAccessor);
        }

        public IEnumerable<ContactwithCount> GetNotificationbyDate(string NotifiactionType, string Date,string Name, int PageNo, int NoofRow, string SearchText)
        {
            try
            {
                return _customContext.Set<ContactwithCount>().FromSqlRaw("Exec USP_GetNotificationsbyDate {0},{1},{2},{3},{4},{5}", NotifiactionType, Date,Name,PageNo,NoofRow, SearchText);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }


        public IEnumerable<Contact> GetTodaysNotifications(string NotifiactionType)
        {
            try
            {
              return _customContext.Set<Contact>().FromSqlRaw("EXEC USP_GetTodaysNotifications {0}",NotifiactionType).ToList();
            }
            catch(Exception ex)
            {
                throw ex;
            }
            
        }

        public string SendNotifications(Contact cnt)
        {
            try
            {
                return "Sent Notification";
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

    }
}
