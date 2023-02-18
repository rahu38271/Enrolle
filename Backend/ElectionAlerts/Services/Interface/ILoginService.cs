using ElectionAlerts.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Services.Interface
{
    public interface ILoginService
    {
        SuperAdmin Login(string username, string password);
        ConfigureDB GetConfigureDBbyUser(int SuperAdmin);
        int InsertConfigureDBbyUser(ConfigureDB configureDB);
        int InsertUser(User user);
        int UpdateUser(User user);
        int DeleteUser(int Id);
        int ChangeUserPassword(int id, string password);
        User LoginUser(string username, string password);
    }
}
