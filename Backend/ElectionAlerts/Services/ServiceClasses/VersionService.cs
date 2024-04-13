using ElectionAlerts.Model;
using ElectionAlerts.Repository.Interface;
using ElectionAlerts.Services.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Services.ServiceClasses
{
    public class VersionService : IVersionService
    {
        private readonly IVersionRepository _versionRepository;

        public VersionService(IVersionRepository versionRepository)
        {
            _versionRepository = versionRepository;
        }
        public int DeleteVersionbyId(int Id)
        {
            return _versionRepository.DeleteVersionbyId(Id);
        }

        public IEnumerable<Versions> GetAllVersion()
        {
            return _versionRepository.GetAllVersion();
        }

        public IEnumerable<Versions> GetVersionbyId(int Id)
        {
            return _versionRepository.GetVersionbyId(Id);
        }

        public int InsertUpdateVersion(Versions version)
        {
            return _versionRepository.InsertUpdateVersion(version);
        }
    }
}
