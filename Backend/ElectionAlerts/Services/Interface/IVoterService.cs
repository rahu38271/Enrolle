using ElectionAlerts.Dto;
using ElectionAlerts.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Services.Interface
{
    public interface IVoterService
    {
        IEnumerable<VoterDTO> GetAllVoter(int UserId, int RoleId, int PageNo, int NoofRow,string Language);
        int CreateVoter(Voter voter);
        int UpadateVoter(Voter voter);
        int InsertBulkVoter(List<Voter> voters);
        int InsertBulkMobile(List<Mobile> mobiles);
        int DeleteVoterbyId(int Id);
        IEnumerable<VoterDTO> FilterVoterbyCondition(VoterTable table);
        IEnumerable<VoterDTO> FilterVoterList(VoterTable table);
        VoterDTO GetVoterDetailbyId(int Id, string Language);
        IEnumerable<VoterDTO> GetVoterbyRelation(int Id,int UserId,int RoleId, int PageNo, int NoofRow,string Language);
        IEnumerable<Table> FilterColoumnCount(VoterTable table);
        IEnumerable<LastNameCount> GetVoterCountbyLastName(int userid, int RoleId,int PageNo, int NoofRow, string Language);
        IEnumerable<VoterDTO> VoterDetailsbyColumn(string ColoumnName, string ColoumnValue, int UserId,int RoleId, int PageNo, int NoofRow, string Language);
        IEnumerable<VoterDTO> VoterDetailsbyLastName(string LName, int UserId,int RoleId, int PageNo, int NoofRow, string Language);
        IEnumerable<VoterDTO> VoterwithMobileNo(int UserId,int RoleId, int PageNo, int NoofRow, string Language);
        IEnumerable<VoterDTO> GetVoterbyRole(VoterSuperDto voterSuperDto);
        int UpadateMobileVoter(int Id, string MobileNo);
        int UpadateAltMobileVoter(int Id, string AltMobileNo);
        int UpdateAddressVoter(int Id, string Address);
        int InsertSurveyDetails(VoterSurvey voterSurvey);
        int InsertMemberDetail(MemberDetail memberDetail);
        int UpdateMemberDetail(MemberDetail memberDetail);
        int UpdateStarVoter(int Id, string YesNo);
        int UpdateVoterInclination(int id, string Colour);
        int UpdateIsAliveVoter(int id, string YesNo);
        int UpdateIsVoted(int id, string YesNo);
        IEnumerable<VoterPPBooth> GetDistinctPartNo(int Role, int UserId);
        IEnumerable<MemberDetail> GetMemberDetailsbyVId(int voterid);
        IEnumerable<VoterDTO> GetVoterByUserId(int userid,int roleid, int PageNo, int NoofRow, string Language);
        IEnumerable<VoterDTO> GetVoterAgeBetween(int Age1, int Age2,string Gender, int UserId,int RoleId, int PageNo, int NoofRow, string Language);
        IEnumerable<VoterCount> GetTotalVoterCount(int userid, int roleid);
        IEnumerable<VoterbyBooth> GetVoterbybooth(int userid,int roleid);
        IEnumerable<VoterInclination> VoterInclination(int userid,int roleid);
        IEnumerable<VoterDTO> AdvancedSearch(AdvanceSearchDTO searchDTO);
        IEnumerable<VoterDTO> GetVoterInclinationUserId(string inclination, int userid,int roleid, int PageNo, int NoofRow, string Language);
        IEnumerable<VoterDTO> GetStarVoterbyUserId(int userid,int roleid, int PageNo, int NoofRow, string Language);
        IEnumerable<BoothName> GetBoothNamebyUserId(int userid,int roleid, int PageNo, int NoofRow);
        IEnumerable<VoterDTO> GetVoterByPartNo(int partno, int PageNo, int NoofRow, string Language);
        IEnumerable<Table> GetVoterCountbyColoumn(int UserId, int RoleId, string Coloumn);
        int UpdateColoumnTbl(int Id, string ColoumnName, string ColoumnValue);
        int AddCastName(string CasteName);
        IEnumerable<Caste> GetAllCaste();
    }

}
