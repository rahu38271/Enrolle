﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ElectionAlerts.Dto;
using ElectionAlerts.Model;

namespace ElectionAlerts.Repository.Interface
{
    public interface INotificationRepository
    {
        IEnumerable<Contact> GetTodaysNotifications(string NotifiactionType);
        string SendNotifications(Contact cnt);
        IEnumerable<ContactwithCount> GetNotificationbyDate(string NotifiactionType, string Date, string Name,int PageNo, int NoofRow, string SearchText);
        IEnumerable<LastSevenDayCount> LastSevenDayCountsbyEvent(string Type);
    }
}
