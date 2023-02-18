﻿using ElectionAlerts.Model;
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

        public int InsertUser(User user)
        {
            return _loginRepository.InsertUser(user);
        }

        public int UpdateUser(User user)
        {
            return _loginRepository.UpdateUser(user);
        }

        public int DeleteUser(int Id)
        {
            return _loginRepository.DeleteUser(Id);
        }

        public int ChangeUserPassword(int id, string password)
        {
            return _loginRepository.ChangeUserPassword(id, password);
        }

        public User LoginUser(string username, string password)
        {
            return _loginRepository.LoginUser(username, password);
        }
    }
}
