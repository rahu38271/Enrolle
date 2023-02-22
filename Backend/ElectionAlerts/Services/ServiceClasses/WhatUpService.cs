using ElectionAlerts.Model;
using ElectionAlerts.Repository.Interface;
using ElectionAlerts.Services.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Services.ServiceClasses
{
    public class WhatUpService : IWhatUpService
    {
        private readonly IWhatRespository _whatRepository;

        public WhatUpService(IWhatRespository whatRepository)
        {
            _whatRepository = whatRepository;
        }
        public int CreateUpdateWhatUp(WhatUpSetting whatUpSetting)
        {
           return _whatRepository.CreateUpdateWhatUp(whatUpSetting);
        }

        public WhatUpSetting GetWhatUpSetting()
        {
            return _whatRepository.GetWhatUpSetting();
        }
    }
}
