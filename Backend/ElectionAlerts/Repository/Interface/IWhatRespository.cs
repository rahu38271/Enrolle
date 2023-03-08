using ElectionAlerts.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Repository.Interface
{
    public interface IWhatRespository
    {
        int CreateUpdateWhatUp(WhatUpSetting whatUpSetting);
        WhatUpSetting GetWhatUpSetting();

    }
}
