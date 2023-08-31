using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ElectionAlerts.Model;
using ElectionAlerts.Repository.Interface;
using ElectionAlerts.Services.Interface;

namespace ElectionAlerts.Services.ServiceClasses
{
    public class NotificationService : INotificationService
    {
        private INotificationRepository _inotificationreposritory;
        public NotificationService(INotificationRepository notifiactionreposritory)
        {
            _inotificationreposritory = notifiactionreposritory;
        }

        public IEnumerable<Contact> GetNotificationbyDate(string NotifiactionType, string Date, int PageNo, int NoofRow, string SearchText)
        {
            try
            {
                return _inotificationreposritory.GetNotificationbyDate(NotifiactionType, Date,PageNo,NoofRow, SearchText);
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
                return _inotificationreposritory.GetTodaysNotifications(NotifiactionType);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string SendNotifications(Contact cnt)
        {
            try
            {
                return _inotificationreposritory.SendNotifications(cnt);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
