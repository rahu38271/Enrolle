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
    public class VoterService : IVoterService
    {
        private readonly IVoterRepository _voterRepository;

        public VoterService(IVoterRepository voterRepository )
        {
            _voterRepository = voterRepository;
        }

        public int AddCastName(List<Caste> castes)
        {
            return _voterRepository.AddCastName(castes);
        }

        public IEnumerable<GetVoterByPartNo> AdvancedSearch(AdvanceSearchDTO searchDTO)
        {
            return _voterRepository.AdvancedSearch(searchDTO);
        }

        public int CreateVoter(Voter voter)
        {
            return _voterRepository.CreateVoter(voter);
        }

        public int DeleteVoterbyId(int Id)
        {
            return _voterRepository.DeleteVoterbyId(Id);
        }

        public IEnumerable<Table> FilterColoumnCount(VoterTable table)
        {
            return _voterRepository.FilterColoumnCount(table);
            
        }

        public IEnumerable<GetVoterByPartNo> FilterVoterbyCondition(VoterTable table)
        {
            return _voterRepository.FilterVoterbyCondition(table);
        }

        public IEnumerable<GetVoterByPartNo> FilterVoterList(VoterTable table)
        {
            return _voterRepository.FilterVoterList(table);
        }

        public IEnumerable<CastebyLanguage> GetAllCaste(string Language)
        {
            return _voterRepository.GetAllCaste(Language);
        }

        public LandingPage GetAllLandingPage(int UserId)
        {
            return _voterRepository.GetAllLandingPage(UserId);
        }

        public IEnumerable<VoterMobileNo> GetAllMobile()
        {
            return _voterRepository.GetAllMobile();
        }

        public IEnumerable<Profession> GetAllProfession()
        {
            return _voterRepository.GetAllProfession();
        }

        public IEnumerable<GetVoterByPartNo> GetAllVoter(int UserId, int RoleId ,int PageNo, int NoofRow,string Language, string SearcText)
        {
            return _voterRepository.GetAllVoter(UserId,RoleId, PageNo,NoofRow, Language, SearcText);
        }

        public IEnumerable<BoothName> GetBoothNamebyUserId(int userid,int roleid, int PageNo, int NoofRow)
        {
            return _voterRepository.GetBoothNamebyUserId(userid,roleid,PageNo,NoofRow);
        }

        public IEnumerable<VoterPPBooth> GetDistinctPartNo(int Role, int UserId)
        {
            return _voterRepository.GetDistinctPartNo(Role, UserId);
        }

        public IEnumerable<MemberDetail> GetMemberDetailsbyVId(int voterid)
        {
            return _voterRepository.GetMemberDetailsbyVId(voterid);
        }

        public IEnumerable<VoterMobile> GetMobileMatch(string VoterName)
        {
            return _voterRepository.GetMobileMatch(VoterName);
        }

        public IEnumerable<GetVoterByPartNo> GetStarVoterbyUserId(int userid,int roleid, int PageNo, int NoofRow, string Language, string SearchText)
        {
            return _voterRepository.GetStarVoterbyUserId(userid,roleid,PageNo,NoofRow,Language,SearchText);
        }

        public IEnumerable<VoterCount> GetTotalVoterCount(int userid, int roleid)
        {
            return _voterRepository.GetTotalVoterCount(userid,roleid);
        }

        public IEnumerable<GetVoterByPartNo> GetVoterAgeBetween(int Age1, int Age2, string Gender,int UserId, int RoleId, int PageNo, int NoofRow, string Language, string SearchText)
        {
            return _voterRepository.GetVoterAgeBetween(Age1, Age2, Gender, UserId, RoleId,PageNo,NoofRow,Language,SearchText);
        }

        public IEnumerable<VoterbyBooth> GetVoterbybooth(int userid,int roleid)
        {
            return _voterRepository.GetVoterbybooth(userid, roleid);
        }

        public IEnumerable<VoterDTOPartNo> GetVoterByPartNo(int partno, int PageNo, int NoofRow, string Language, string SearchText)
        {
            return _voterRepository.GetVoterByPartNo(partno,PageNo,NoofRow,Language,SearchText);
        }

        public IEnumerable<GetVoterByPartNo> GetVoterbyRelation(int Id,int UserId, int RoleId, int PageNo, int NoofRow,string Language)
        {
            return _voterRepository.GetVoterbyRelation(Id, UserId,RoleId,PageNo,NoofRow,Language);
        }

        public IEnumerable<GetVoterByPartNo> GetVoterbyRole(VoterSuperDto voterSuperDto)
        {
            return _voterRepository.GetVoterbyRole(voterSuperDto);
        }

        public IEnumerable<GetVoterByPartNo> GetVoterByUserId(int userid,int roleid, int PageNo, int NoofRow, string Language)
        {
            return _voterRepository.GetVoterByUserId(userid, roleid,PageNo,NoofRow,Language);
        }

        public IEnumerable<Table> GetVoterCountbyColoumn(int UserId, int RoleId, string Coloumn)
        {
            return _voterRepository.GetVoterCountbyColoumn(UserId, RoleId, Coloumn);
        }

        public IEnumerable<LastNameCount> GetVoterCountbyLastName(int userid,int roleid, int PageNo, int NoofRow, string Language, string SearchText)
        {
            return _voterRepository.GetVoterCountbyLastName(userid, roleid,PageNo,NoofRow,Language,SearchText);
        }

        public GetVoterByPartNo GetVoterDetailbyId(int Id, string Language)
        {
            return _voterRepository.GetVoterDetailbyId(Id,Language);
        }

        public IEnumerable<GetVoterByPartNo> GetVoterInclinationUserId(string inclination, int userid,int roleid, int PageNo, int NoofRow, string Language, string SearchText)
        {
            return _voterRepository.GetVoterInclinationUserId(inclination, userid,roleid,PageNo,NoofRow,Language,SearchText);
        }

        public WhatAppContent GetWhatAppContentbyUserId(int UserId)
        {
            return _voterRepository.GetWhatAppContentbyUserId(UserId);
        }

        public int InsertBulkMobile(List<Mobile> mobiles)
        {
            return _voterRepository.InsertBulkMobile(mobiles);
        }

        public int InsertBulkVoter(List<Voter> voters)
        {
            return _voterRepository.InsertBulkVoter(voters);
        }

        public int InsertLandingPage(string ImageName, string ImagePath, int UserId)
        {
            return _voterRepository.InsertLandingPage(ImageName, ImagePath,UserId);
        }

        public int InsertMemberDetail(MemberDetail memberDetail)
        {
            return _voterRepository.InsertMemberDetail(memberDetail);
        }

        public int InsertProfession(string ProfessionName)
        {
            return _voterRepository.InsertProfession(ProfessionName);
        }

        public int InsertSurveyDetails(VoterSurvey voterSurvey)
        {
            return _voterRepository.InsertSurveyDetails(voterSurvey);
        }

        public int InsertUpdateWhatUpContent(WhatAppContent whatAppContent)
        {
            return _voterRepository.InsertUpdateWhatUpContent(whatAppContent);
        }

        public int UpadateAltMobileVoter(int Id, string AltMobileNo)
        {
            return _voterRepository.UpadateAltMobileVoter(Id, AltMobileNo);
        }

        public int UpadateMobileVoter(int Id, string MobileNo)
        {
            return _voterRepository.UpadateMobileVoter(Id, MobileNo);
        }

        public int UpadateVoter(Voter voter)
        {
            return _voterRepository.UpadateVoter(voter);
        }

        public int UpdateAddressVoter(int Id, string Address)
        {
            return _voterRepository.UpdateAddressVoter(Id, Address);
        }

        public int UpdateColoumnTbl(int Id, string ColoumnName, string ColoumnValue)
        {
            return _voterRepository.UpdateColoumnTbl(Id, ColoumnName, ColoumnValue);
        }

        public int UpdateIsAliveVoter(int id, string YesNo)
        {
            return _voterRepository.UpdateIsAliveVoter(id, YesNo);
        }

        public int UpdateIsVoted(int id, string YesNo)
        {
            return _voterRepository.UpdateIsVoted(id, YesNo);
        }

        public int UpdateMemberDetail(MemberDetail memberDetail)
        {
            return _voterRepository.UpdateMemberDetail(memberDetail);
        }

        public int UpdateStarVoter(int Id, string YesNo)
        {
            return _voterRepository.UpdateStarVoter(Id,YesNo);
        }

        public int UpdateVoterInclination(int id, string Colour)
        {
            return _voterRepository.UpdateVoterInclination(id, Colour);
        }

        public IEnumerable<GetVoterByPartNo> VoterDetailsbyColumn(string ColoumnName, string ColoumnValue,int UserId,int RoleId, int PageNo, int NoofRow, string Language, string SearchText)
        {
            return _voterRepository.VoterDetailsbyColumn(ColoumnName, ColoumnValue,UserId, RoleId,PageNo,NoofRow,Language,SearchText);
        }

        public IEnumerable<GetVoterByPartNo> VoterDetailsbyLastName(string LName, int UserId,int RoleId, int PageNo, int NoofRow, string Language, string SearchText)
        {
            return _voterRepository.VoterDetailsbyLastName(LName, UserId, RoleId,PageNo,NoofRow,Language,SearchText);
        }

        public IEnumerable<VoterInclination> VoterInclination(int userid,int roleid)
        {
            return _voterRepository.VoterInclination(userid, roleid);
        }

        public IEnumerable<GetVoterByPartNo> VoterwithMobileNo(int userid,int roleid, int PageNo, int NoofRow, string Language, string SearchText)
        {
            return _voterRepository.VoterwithMobileNo(userid, roleid,PageNo,NoofRow,Language,SearchText);
        }
    }
}
