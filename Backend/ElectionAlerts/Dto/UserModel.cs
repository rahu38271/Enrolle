﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Dto
{
    public class UserModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public int? RoleId { get; set; }
        public string Contact { get; set; }
        public string Email { get; set; }
        public string RoleName { get; set; }


    }
}
