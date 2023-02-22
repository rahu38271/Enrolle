using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Model
{
    public class WhatUpSetting
    {
        public int Id { get; set; }
        public string URL { get; set; }
        public string BirthDMessage { get; set; }
        public string AnniverDMessage { get; set; }
        public string BithDayMediaurl { get; set; }
        public string AnniverDayMediaurl { get; set; }
        public string BithDayFileName { get; set; }
        public string AnniverDayFileName { get; set; }
        public string InstanceId { get; set; }
        public string AccessToken { get; set; }
    }
}
