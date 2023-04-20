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
        IEnumerable<VoterDTO> GetAllVoter(int userid,int RoleId, int PageNo, int NoofRow,string Language);
        int CreateVoter(Voter voter);
        int InsertBulkVoter(List<Voter> voters);
        int InsertBulkMobile(List<Mobile> mobiles);
        int UpadateVoter(Voter voter);
        int DeleteVoterbyId(int Id);
        IEnumerable<VoterDTO> FilterVoterList(VoterTable table);
        IEnumerable<VoterDTO> FilterVoterbyCondition(VoterTable table);
        VoterDTO  GetVoterDetailbyId(int Id, string Language);
        IEnumerable<VoterDTO> GetVoterbyRelation(int Id,int UserId,int RoleId, int PageNo, int NoofRow,string Language);
        IEnumerable<Table> FilterColoumnCount(VoterTable table);
        IEnumerable<LastNameCount> GetVoterCountbyLastName(int UserId,int RoleId, int PageNo, int NoofRow, string Language);
        IEnumerable<VoterDTO> GetVoterbyRole(VoterSuperDto voterSuperDto);
        IEnumerable<VoterDTO> VoterDetailsbyLastName(string LName, int UserId,int RoleId, int PageNo, int NoofRow, string Language);
        IEnumerable<VoterDTO> VoterDetailsbyColumn(string ColoumnName,string ColoumnValue, int UserId,int RoleId, int PageNo, int NoofRow, string Language);
        IEnumerable<VoterDTO> VoterwithMobileNo(int UserId,int RoleId, int PageNo, int NoofRow, string Language);
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
        IEnumerable<VoterDTO> GetVoterByUserId(int userid,int roleid, int PageNo, int NoofRow, string Language);
        IEnumerable<VoterDTO> GetVoterAgeBetween(int Age1, int Age2,string Gender, int UserId,int RoleId, int PageNo, int NoofRow, string Language);
        IEnumerable<VoterCount> GetTotalVoterCount(int userid, int roleid);
        IEnumerable<VoterDTO> AdvancedSearch(AdvanceSearchDTO searchDTO);
        IEnumerable<VoterDTO> GetVoterInclinationUserId(string inclination, int userid,int roleid,int PageNo, int NoofRow, string Language);
        IEnumerable<VoterDTO> GetStarVoterbyUserId(int userid,int roleid, int PageNo, int NoofRow, string Language);
        IEnumerable<BoothName> GetBoothNamebyUserId(int userid,int roleid, int PageNo, int NoofRow);
        IEnumerable<VoterDTO> GetVoterByPartNo(int partno, int PageNo, int NoofRow, string Language);
        IEnumerable<Table> GetVoterCountbyColoumn(int UserId, int RoleId, string Coloumn);
        int UpdateColoumnTbl(int Id, string ColoumnName, string ColoumnValue);
        int AddCastName(string CasteName);
        IEnumerable<Caste> GetAllCaste();

    }
}
