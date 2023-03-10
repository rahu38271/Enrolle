using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
