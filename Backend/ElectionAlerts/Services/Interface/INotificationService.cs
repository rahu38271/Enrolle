using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ElectionAlerts.Model;

namespace ElectionAlerts.Services.Interface
{
   public  interface INotificationService
    {
        IEnumerable<Contact> GetTodaysNotifications(string NotifiactionType);
        string SendNotifications(Contact cnt);
    }
}
