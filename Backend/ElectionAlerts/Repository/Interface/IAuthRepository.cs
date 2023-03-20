using ElectionAlerts.Dto;
using ElectionAlerts.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Repository.Interface
{
    public interface IAuthRepository
    {
        IEnumerable<UserModel> Login(string username, string password);
        string GetOtp(string contact);
        int InsertUser(User user);
        int UpdateUser(User user);
        int DeleteUser(int Id);
        User GetUserbyId(int Id);
        int ChangeUserPassword(int id, string password);
        IEnumerable<User> FilterUserList(Table table);
        IEnumerable<UserDetail> GetAllUser();
        int InsertUserAssigned(UserAssigned userAssigned);
        string GetPartNobyId(int userid);
        PartNoAssigned GetPartNoAssigned(int userid);
        PartNoAssigned GetPartNoAssignedOtherthanThisuser(int userid, int roleId);
    }
}
