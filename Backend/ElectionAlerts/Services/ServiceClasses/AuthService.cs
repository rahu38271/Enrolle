using ElectionAlerts.Dto;
using ElectionAlerts.Model;
using ElectionAlerts.Repository.Interface;
using ElectionAlerts.Services.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Services.ServiceClasses
{
    
    public class AuthService:IAuthService
    {
        private readonly IAuthRepository _iauthRepo;

        public AuthService(IAuthRepository iauthRepo)
        {
            _iauthRepo = iauthRepo;
        }

        public int ChangeUserPassword(int id, string password)
        {
            return _iauthRepo.ChangeUserPassword(id, password);
        }

        public int DeleteUser(int id)
        {
            return _iauthRepo.DeleteUser(id);
        }

        public IEnumerable<User> FilterUserList(Table table)
        {
            return _iauthRepo.FilterUserList(table);
        }
   
        public IEnumerable<UserDetail> GetAllUser()
        {
            return _iauthRepo.GetAllUser();
        }
        public string GetOtp(string contact)
        {
            return _iauthRepo.GetOtp(contact);
        }

        public PartNoAssigned GetPartNoAssigned()
        {
            return _iauthRepo.GetPartNoAssigned();
        }

        public string GetPartNobyId(int userid)
        {
            return _iauthRepo.GetPartNobyId(userid);
        }

        public User GetUserbyId(int Id)
        {
            return _iauthRepo.GetUserbyId(Id);
        }

       
        public int InsertUser(User user)
        {
            return _iauthRepo.InsertUser(user);
        }

        public int InsertUserAssigned(UserAssigned userAssigned)
        {
            return _iauthRepo.InsertUserAssigned(userAssigned);
        }

        public IEnumerable<UserModel> Login(string username, string password)
        {
            return _iauthRepo.Login(username, password);
        }

        public int UpdateUser(User user)
        {
            return _iauthRepo.UpdateUser(user);
        }
    }
}
