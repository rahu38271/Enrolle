﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Dto
{
    public class AppointmentDTO
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public DateTime? BirthDate { get; set; }
        public string PhoneNo { get; set; }
        public string AppointmentDate { get; set; }
        public string Category { get; set; }
        public string Work { get; set; }
        public string Other { get; set; }
        public string District { get; set; }
        public string Taluka { get; set; }
        public string HouseNo { get; set; }
        public string Soc_BldgName { get; set; }
        public int? WardNo { get; set; }
        public int? PinCode { get; set; }
        public string City_Village { get; set; }
        public string Remark { get; set; }
        public string FileName { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string Status { get; set; }
        public int? UserId { get; set; }
        public int? TotalCount { get; set; }
        public int? RoleId { get; set; }
        public string AdminName { get; set; }
    }
}
