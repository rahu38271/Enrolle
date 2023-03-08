using ElectionAlerts.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Services.Interface
{
    public interface IWhatUpService
    {
        int CreateUpdateWhatUp(WhatUpSetting whatUpSetting);
        WhatUpSetting GetWhatUpSetting();
    }
}
