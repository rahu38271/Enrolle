﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Model
{
    public class Society
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Chairman { get; set; }
        public string PhoneNo { get; set; }
        public string AltPhoneNo { get; set; }
        public string Address { get; set; }
        public int? PinCode { get; set; }
        public int? WardNo { get; set; }
        public string Taluka { get; set; }
        public string District { get; set; }
        public DateTime CreatedDate { get; set; }
        public int UserId { get; set; }
        public int AdminId { get; set; }
        public string UserName { get; set; }
        public string Position { get; set; }
    }
}
