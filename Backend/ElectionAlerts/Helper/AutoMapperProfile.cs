using AutoMapper;
using ElectionAlerts.Dto;
using ElectionAlerts.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Helper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<GetVoterByPartNo, Voter>().ReverseMap();
            CreateMap<User,UserModel>();
            CreateMap<Voter, VoterPPBooth>();
        }
    }
}
