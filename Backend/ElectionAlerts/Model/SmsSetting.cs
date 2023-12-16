using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Model
{
    public class SmsSetting
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string SenderId { get; set; }
        public int? Type { get; set; }
        public string Text { get; set; }
        public string PeId { get; set; }
        public string MType { get; set; }

    }
}
