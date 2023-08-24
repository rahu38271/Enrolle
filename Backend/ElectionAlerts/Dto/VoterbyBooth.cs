using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Dto
{
    public class VoterbyBooth
    {
        public int? PartNo { get; set; }
        public string Booth { get; set; }
        public int? VoterCount { get; set; }
        public int? MaleVoter { get; set; }
        public int? FemaleVoter { get; set; }
        public int? MobileNoCount { get; set; }
        public int? SurveyDone { get; set; }
        public int? matching_count { get; set; }


    }
}
