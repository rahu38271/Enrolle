using ElectionAlerts.Dto;
using ElectionAlerts.Model;
using ElectionAlerts.Repository.Interface;
using ElectionAlerts.Services.Interface;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Services.ServiceClasses
{
    public class AssemblyService : IAssemblyService
    {
        private readonly IAssemblyRepository _assembly;

        public AssemblyService(IAssemblyRepository assembly)
        {
            _assembly = assembly;
        }

        public int DeleteAssemblybyId(int id)
        {
            return _assembly.DeleteAssemblybyId(id);
        }

        public IEnumerable<Assembly> FilterAssemblyList(Table table)
        {
            return _assembly.FilterAssemblyList(table);
        }

        public IEnumerable<Assembly> GetAssembly()
        {
            return _assembly.GetAssembly();
        }

        public IEnumerable<Assembly> GetAssemblyDistrictwise(string district)
        {
            return _assembly.GetAssemblyDistrictwise(district);

        }

        public int InsertAssembly(Assembly assembly)
        {
            return _assembly.InsertAssembly(assembly);
        }

        public int InsertBulkAssembly(DataTable dt)
        {
            return _assembly.InsertBulkAssembly(dt);
        }

        public int InsertBulkAssemblyList(List<Assembly> assemblies)
        {
            return _assembly.InsertBulkAssemblyList(assemblies);
        }
    }
}
