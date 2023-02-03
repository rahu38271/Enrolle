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
        IEnumerable<VoterAssembly> GetAllVoter(int UserId);
        int CreateVoter(Voter voter);
        int UpadateVoter(Voter voter);
        int InsertBulkVoter(List<Voter> voters);
        IEnumerable<Voter> FilterVoterbyCondition(VoterTable table);
        IEnumerable<Voter> FilterVoterList(VoterTable table);
        VoterDTO GetVoterDetailbyId(int Id);
        IEnumerable<VoterDTO> GetVoterbyRelation(int Id,int UserId);
        IEnumerable<Table> FilterColoumnCount(VoterTable table);
        IEnumerable<Table> GetVoterCountbyLastName(int userid);
        IEnumerable<VoterDTO> VoterDetailsbyColumn(string ColoumnName, string ColoumnValue, int UserId);
        IEnumerable<VoterDTO> VoterDetailsbyLastName(string LName, int UserId);
        IEnumerable<VoterDTO> VoterwithMobileNo(int UserId);
        IEnumerable<Voter> GetVoterbyRole(VoterSuperDto voterSuperDto);
        int UpadateMobileVoter(int Id, string MobileNo);
        int UpadateAltMobileVoter(int Id, string AltMobileNo);
        int UpdateAddressVoter(int Id, string Address);
        int InsertSurveyDetails(VoterSurvey voterSurvey);
        int InsertMemberDetail(MemberDetail memberDetail);
        int UpdateMemberDetail(MemberDetail memberDetail);
        int UpdateStarVoter(int Id, string YesNo);
        int UpdateVoterInclination(int id, string Colour);
        IEnumerable<VoterPPBooth> GetDistinctPartNo();
        IEnumerable<MemberDetail> GetMemberDetailsbyVId(int voterid);
        IEnumerable<Voter> GetVoterByUserId(int userid);
        IEnumerable<Voter> GetVoterAgeBetween(int Age1, int Age2,string Gender, int UserId);
        VoterCount GetTotalVoterCount();
        IEnumerable<VoterbyBooth> GetVoterbybooth(int userid);
        IEnumerable<VoterInclination> VoterInclination(int userid);
        IEnumerable<Voter> AdvancedSearch(AdvanceSearchDTO searchDTO);
        IEnumerable<VoterDTO> GetVoterInclinationUserId(string inclination, int userid);
        IEnumerable<VoterDTO> GetStarVoterbyUserId(int userid);
        IEnumerable<BoothName> GetBoothNamebyUserId(int userid);
        IEnumerable<Voter> GetVoterByPartNo(int partno);

    }

}
