using ElectionAlerts.Model;
using ElectionAlerts.Repository.Interface;
using ElectionAlerts.Services.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Services.ServiceClasses
{
    public class LoginService : ILoginService
    {
        private readonly ILoginRepository _loginRepository;

        public LoginService(ILoginRepository loginRepository)
        {
            _loginRepository = loginRepository;
        }
        public SuperAdmin Login(string username, string password)
        {
            return _loginRepository.Login(username, password);
        }

        public ConfigureDB GetConfigureDBbyUser(int SuperAdmin)
        {
            return _loginRepository.GetConfigureDBbyUser(SuperAdmin);
        }

        public int InsertConfigureDBbyUser(ConfigureDB configureDB)
        {
            return _loginRepository.InsertConfigureDBbyUser(configureDB);
        }

        public int InsertUser(AdminUser user)
        {
            return _loginRepository.InsertUser(user);
        }

        public int DeleteUser(int Id)
        {
            return _loginRepository.DeleteUser(Id);
        }

        public int ChangeUserPassword(int id, string password)
        {
            return _loginRepository.ChangeUserPassword(id, password);
        }

        public AdminUser LoginUser(string username, string password)
        {
            return _loginRepository.LoginUser(username, password);
        }

        public IEnumerable<AdminUser> GetAllUser()
        {
            return _loginRepository.GetAllUsers();
        }

        public int DeleteConfigureDBbyUser(int Id)
        {
            return _loginRepository.DeleteConfigureDBbyUser(Id);
        }

        public IEnumerable<AdminUser> GetAllAdminbySuperAdminId(int superid)
        {
            return _loginRepository.GetAllAdminbySuperAdminId(superid);
        }

        public IEnumerable<AdminUser> GetAllVolunterbyAdminId(int adminid)
        {
            return _loginRepository.GetAllVolunterbyAdminId(adminid);
        }

        public IEnumerable<Village> GetVillage(string taluka)
        {
            return _loginRepository.GetVillage(taluka);
        }

        public List<Districts> GetAllDistricts()
        {
            return _loginRepository.GetAllDistricts();
        }

        public List<Taluka> GetAllTaluka(int DId)
        {
            return _loginRepository.GetAllTaluka(DId);
        }

        public IEnumerable<Assembly> GetAssembly()
        {
            return _loginRepository.GetAssembly();
        }

        public IEnumerable<ConfigureDB> GetConfigureDB()
        {
            return _loginRepository.GetConfigureDB();
        }
    }
}
