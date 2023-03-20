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

        public IEnumerable<Voter> AdvancedSearch(AdvanceSearchDTO searchDTO)
        {
            return _voterRepository.AdvancedSearch(searchDTO);
        }

        public int CreateVoter(Voter voter)
        {
            return _voterRepository.CreateVoter(voter);
        }

        public IEnumerable<Table> FilterColoumnCount(VoterTable table)
        {
            return _voterRepository.FilterColoumnCount(table);
            
        }

        public IEnumerable<Voter> FilterVoterbyCondition(VoterTable table)
        {
            return _voterRepository.FilterVoterbyCondition(table);
        }

        public IEnumerable<Voter> FilterVoterList(VoterTable table)
        {
            return _voterRepository.FilterVoterList(table);
        }

        public IEnumerable<VoterAssembly> GetAllVoter(int UserId, int RoleId ,int PageNo, int NoofRow)
        {
            return _voterRepository.GetAllVoter(UserId,RoleId, PageNo,NoofRow);
        }

        public IEnumerable<BoothName> GetBoothNamebyUserId(int userid,int roleid)
        {
            return _voterRepository.GetBoothNamebyUserId(userid,roleid);
        }

        public IEnumerable<VoterPPBooth> GetDistinctPartNo(int Role, int UserId)
        {
            return _voterRepository.GetDistinctPartNo(Role, UserId);
        }

        public IEnumerable<MemberDetail> GetMemberDetailsbyVId(int voterid)
        {
            return _voterRepository.GetMemberDetailsbyVId(voterid);
        }

        public IEnumerable<VoterDTO> GetStarVoterbyUserId(int userid,int roleid)
        {
            return _voterRepository.GetStarVoterbyUserId(userid,roleid);
        }

        public VoterCount GetTotalVoterCount()
        {
            return _voterRepository.GetTotalVoterCount();
        }

        public IEnumerable<Voter> GetVoterAgeBetween(int Age1, int Age2, string Gender,int UserId, int RoleId )
        {
            return _voterRepository.GetVoterAgeBetween(Age1, Age2, Gender, UserId, RoleId);
        }

        public IEnumerable<VoterbyBooth> GetVoterbybooth(int userid,int roleid)
        {
            return _voterRepository.GetVoterbybooth(userid, roleid);
        }

        public IEnumerable<Voter> GetVoterByPartNo(int partno)
        {
            return _voterRepository.GetVoterByPartNo(partno);
        }

        public IEnumerable<VoterDTO> GetVoterbyRelation(int Id,int UserId, int RoleId)
        {
            return _voterRepository.GetVoterbyRelation(Id, UserId,RoleId);
        }

        public IEnumerable<Voter> GetVoterbyRole(VoterSuperDto voterSuperDto)
        {
            return _voterRepository.GetVoterbyRole(voterSuperDto);
        }

        public IEnumerable<Voter> GetVoterByUserId(int userid,int roleid)
        {
            return _voterRepository.GetVoterByUserId(userid, roleid);
        }

        public IEnumerable<Table> GetVoterCountbyLastName(int userid,int roleid)
        {
            return _voterRepository.GetVoterCountbyLastName(userid, roleid);
        }

        public VoterDTO GetVoterDetailbyId(int Id)
        {
            return _voterRepository.GetVoterDetailbyId(Id);
        }

        public IEnumerable<VoterDTO> GetVoterInclinationUserId(string inclination, int userid,int roleid)
        {
            return _voterRepository.GetVoterInclinationUserId(inclination, userid,roleid);
        }

        public int InsertBulkVoter(List<Voter> voters)
        {
            return _voterRepository.InsertBulkVoter(voters);
        }

        public int InsertMemberDetail(MemberDetail memberDetail)
        {
            return _voterRepository.InsertMemberDetail(memberDetail);
        }

        public int InsertSurveyDetails(VoterSurvey voterSurvey)
        {
            return _voterRepository.InsertSurveyDetails(voterSurvey);
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

        public IEnumerable<VoterDTO> VoterDetailsbyColumn(string ColoumnName, string ColoumnValue,int UserId,int RoleId)
        {
            return _voterRepository.VoterDetailsbyColumn(ColoumnName, ColoumnValue,UserId, RoleId);
        }

        public IEnumerable<VoterDTO> VoterDetailsbyLastName(string LName, int UserId,int RoleId)
        {
            return _voterRepository.VoterDetailsbyLastName(LName, UserId, RoleId);
        }

        public IEnumerable<VoterInclination> VoterInclination(int userid,int roleid)
        {
            return _voterRepository.VoterInclination(userid, roleid);
        }

        public IEnumerable<VoterDTO> VoterwithMobileNo(int userid,int roleid)
        {
            return _voterRepository.VoterwithMobileNo(userid, roleid);
        }
    }
}
