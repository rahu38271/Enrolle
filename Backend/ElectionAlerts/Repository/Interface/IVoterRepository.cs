using ElectionAlerts.Dto;
using ElectionAlerts.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Repository.Interface
{
    public interface IVoterRepository
    {
        IEnumerable<GetVoterByPartNo> GetAllVoter(int userid,int RoleId, int PageNo, int NoofRow,string Language, string SearcText);
        int CreateVoter(Voter voter);
        int InsertBulkVoter(List<Voter> voters);
        int InsertBulkMobile(List<Mobile> mobiles);
        int UpadateVoter(Voter voter);
        int DeleteVoterbyId(int Id);
        IEnumerable<GetVoterByPartNo> FilterVoterList(VoterTable table);
        IEnumerable<GetVoterByPartNo> FilterVoterbyCondition(VoterTable table);
        GetVoterByPartNo  GetVoterDetailbyId(int Id, string Language);
        IEnumerable<GetVoterByPartNo> GetVoterbyRelation(int Id,int UserId,int RoleId, int PageNo, int NoofRow,string Language);
        IEnumerable<Table> FilterColoumnCount(VoterTable table);
        IEnumerable<LastNameCount> GetVoterCountbyLastName(int UserId,int RoleId, int PageNo, int NoofRow, string Language, string SearchText);
        IEnumerable<GetVoterByPartNo> GetVoterbyRole(VoterSuperDto voterSuperDto);
        IEnumerable<GetVoterByPartNo> VoterDetailsbyLastName(string LName, int UserId,int RoleId, int PageNo, int NoofRow, string Language,string SearchText);
        IEnumerable<GetVoterByPartNo> VoterDetailsbyColumn(string ColoumnName,string ColoumnValue, int UserId,int RoleId, int PageNo, int NoofRow, string Language, string SearchText);
        IEnumerable<GetVoterByPartNo> VoterwithMobileNo(int UserId,int RoleId, int PageNo, int NoofRow, string Language, string SearchText);
        IEnumerable<VoterInclination> VoterInclination(int userid,int RoleId);
        int UpadateMobileVoter(int Id,string MobileNo);
        int UpadateAltMobileVoter(int Id, string AltMobileNo);
        int UpdateAddressVoter(int Id, string Address);
        int InsertSurveyDetails(VoterSurvey voterSurvey);
        int InsertMemberDetail(MemberDetail memberDetail);   
        int UpdateMemberDetail(MemberDetail memberDetail);
        int UpdateStarVoter(int Id,string YesNo);
        int UpdateVoterInclination(int id, string Colour);
        int UpdateIsAliveVoter(int id, string YesNo);
        int UpdateIsVoted(int id, string YesNo);
        IEnumerable<MemberDetail> GetMemberDetailsbyVId(int voterid);
        IEnumerable<VoterPPBooth> GetDistinctPartNo(int Role, int UserId);
        IEnumerable<VoterbyBooth> GetVoterbybooth(int userid,int RoleId);
        IEnumerable<GetVoterByPartNo> GetVoterByUserId(int userid,int roleid, int PageNo, int NoofRow, string Language);
        IEnumerable<GetVoterByPartNo> GetVoterAgeBetween(int Age1, int Age2,string Gender, int UserId,int RoleId, int PageNo, int NoofRow, string Language,string SearchText);
        IEnumerable<VoterCount> GetTotalVoterCount(int userid, int roleid);
        IEnumerable<GetVoterByPartNo> AdvancedSearch(AdvanceSearchDTO searchDTO);
        IEnumerable<GetVoterByPartNo> GetVoterInclinationUserId(string inclination, int userid,int roleid,int PageNo, int NoofRow, string Language, string SearchText);
        IEnumerable<GetVoterByPartNo> GetStarVoterbyUserId(int userid,int roleid, int PageNo, int NoofRow, string Language, string SearchText);
        IEnumerable<BoothName> GetBoothNamebyUserId(int userid,int roleid, int PageNo, int NoofRow);
        IEnumerable<VoterDTOPartNo> GetVoterByPartNo(int partno, int PageNo, int NoofRow, string Language, string SearchText);
        IEnumerable<Table> GetVoterCountbyColoumn(int UserId, int RoleId, string Coloumn);
        int UpdateColoumnTbl(int Id, string ColoumnName, string ColoumnValue);
        int AddCastName(List<Caste> castes);
        IEnumerable<CastebyLanguage> GetAllCaste(string Language);
        IEnumerable<VoterMobileNo> GetAllMobile();
        IEnumerable<Profession> GetAllProfession();
        int InsertProfession(string ProfessionName);
        int InsertLandingPage(string ImageName, string ImagePath,int UserId);
        LandingPage GetAllLandingPage(int UserId);
        int InsertUpdateWhatUpContent(WhatAppContent whatAppContent);
        WhatAppContent GetWhatAppContentbyUserId(int UserId);
        IEnumerable<VoterMobile> GetMobileMatch(string VoterName);   
    }
}
