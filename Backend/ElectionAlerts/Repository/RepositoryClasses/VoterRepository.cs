using AutoMapper;
using ElectionAlerts.Dto;
using ElectionAlerts.Model;
using ElectionAlerts.Model.Data;
using ElectionAlerts.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace ElectionAlerts.Repository.RepositoryClasses
{
    public class VoterRepository : IVoterRepository
    {
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private CustomContext _customContext;
        public VoterRepository(IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
            _customContext = new CustomContext(_httpContextAccessor);
        }
        public int CreateVoter(Voter voter)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("EXEC Usp_CreateVoter {0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11},{12},{13},{14},{15},{16},{17},{18},{19},{20},{21}," +
                                                            "{22},{23},{24},{25},{26},{27},{28},{29},{30},{31},{32},{33},{34},{35},{36},{37},{38},{39},{40},{41},{42},{43},{44},{45},{46},{47},{48},{49},{50},{51},{52}", voter.SrNo, voter.FullName, voter.BirthDate, voter.Age, voter.Gender, voter.HouseNo, voter.VotingCardNo,
                                                              voter.MobileNo, voter.Caste, voter.District, voter.Assembly, voter.Taluka, voter.Ward, voter.Booth, voter.Village, voter.Pincode, voter.Address, voter.Email, voter.FamilyHead, voter.IsSuspisious,
                                                              voter.IsOutStation, voter.IsAlive, voter.Occupation, voter.PartyWorker, voter.VotingInclination, voter.PoliticalParty, voter.UserId, voter.ExtraInfo, voter.WorkLeft, voter.HappywithService, voter.IsDisable,
                                                              voter.PartNo, voter.AlternateMobileNo, voter.StarVoter, voter.Education, voter.FamilyMember, voter.IsSurvey,voter.AssemblyNo,voter.IsVoted,voter.AssemblyName_KR,voter.FullName_KR,voter.Village_KR,voter.Address_KR, voter.AssemblyName_HN, voter.FullName_HN, voter.Village_HN, voter.Address_HN,voter.Zone,voter.Family,voter.Religion,voter.Society,voter.FilePath,DateTime.Now);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public IEnumerable<Table> FilterColoumnCount(VoterTable table)
        {
            try
            {
                //var result= _customContext.Set<VoterDTO>().FromSqlRaw("USP_FilterSPCount {0},{1}",table.TableName,table.ColumnName);
                //return _mapper.Map<List<VoterDTO>>(result);
                List<Table> voterDTOs = new List<Table>();
                using (SqlConnection con = new SqlConnection(_customContext.Database.GetConnectionString()))
                {
                    using (SqlCommand cmd = new SqlCommand("USP_FilterSPCount"))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Connection = con;
                        cmd.Parameters.AddWithValue("@Table", table.TableName);
                        cmd.Parameters.AddWithValue("@Column", table.ColumnName);
                        cmd.Parameters.AddWithValue("@UserId", table.UserId);
                        cmd.Parameters.AddWithValue("@RoleId", table.RoleId);
                        cmd.Parameters.AddWithValue("@Language", table.Language);
                        con.Open();
                        SqlDataReader dr = cmd.ExecuteReader();
                        while (dr.Read())
                        {
                            Table voterDTO = new Table();
                            voterDTO.ColumnName = dr[0].ToString();
                            voterDTO.Count = Convert.ToInt32(dr[1]);
                            voterDTOs.Add(voterDTO);
                        }
                        con.Close();
                    }
                }
                return voterDTOs;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<VoterDTO> FilterVoterbyCondition(VoterTable table)
        {
            try
            {
                var result = _customContext.Set<VoterDTO>().FromSqlRaw("EXEC USP_FilterVoterSPwithCondition {0},{1},{2},{3},{4},{5},{6},{7},{8},{9}", table.TableName, table.ColumnName, table.ColumnValue, table.Condition, table.UserId, table.RoleId,table.PageNo,table.NoofRow,table.Language,table.SearchText).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<VoterDTO> FilterVoterList(VoterTable table)
        {
            try
            {
                var result = _customContext.Set<VoterDTO>().FromSqlRaw("EXEC USP_FilterVoterSP {0},{1},{2},{3},{4},{5},{6},{7},{8}", table.TableName, table.ColumnName, table.ColumnValue, table.UserId, table.RoleId,table.PageNo,table.NoofRow,table.Language,table.SearchText).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public IEnumerable<VoterDTO> GetAllVoter(int userid, int roleid, int PageNo, int NoofRow,string Language,string SearcText)
        {
            try
            {
                return _customContext.Set<VoterDTO>().FromSqlRaw("USP_GetAllVoter_Page {0},{1},{2},{3},{4},{5}", userid, roleid, PageNo, NoofRow, Language,SearcText).ToList();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public IEnumerable<VoterPPBooth> GetDistinctPartNo(int Role, int UserId)
        {
            try
            {
                return _customContext.Set<VoterPPBooth>().FromSqlRaw("USP_GetPartNoBooth {0},{1}", Role, UserId).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<VoterbyBooth> GetVoterbybooth(int userid, int roleid)
        {
            try
            {
                return _customContext.Set<VoterbyBooth>().FromSqlRaw("USP_VoterGroupbyBooth {0},{1}", userid, roleid).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public IEnumerable<MemberDetail> GetMemberDetailsbyVId(int voterid)
        {
            try
            {
                return _customContext.Set<MemberDetail>().FromSqlRaw("USP_GetmemberdetailbyId {0}", voterid).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<VoterCount> GetTotalVoterCount(int userid, int roleid)
        {
            try
            {
                return _customContext.Set<VoterCount>().FromSqlRaw("USP_GetVoterCount {0},{1}", userid, roleid).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<VoterDTO> GetVoterAgeBetween(int Age1, int Age2, string Gender, int UserId, int RoleId, int PageNo, int NoofRow, string Language,string SearchText)
        {
            try
            {
                var result = _customContext.Set<VoterDTO>().FromSqlRaw("USP_FilterAgeBetween {0},{1},{2},{3},{4},{5},{6},{7},{8}", Age1, Age2, Gender, UserId, RoleId,PageNo,NoofRow,Language, SearchText).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public IEnumerable<VoterDTO> GetVoterbyRelation(int Id, int UserId, int RoleId, int PageNo, int NoofRow,string Language)
        {
            try
            {
                var Names = _customContext.Set<VoterDTO>().FromSqlRaw("USP_GetVoterbyRelation {0},{1},{2},{3},{4},{5}", Id, UserId, RoleId,PageNo,NoofRow,Language).ToList();
                return Names;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<VoterDTO> GetVoterbyRole(VoterSuperDto voterSuperDto)
        {
            try
            {
                var result = _customContext.Set<VoterDTO>().FromSqlRaw("USP_GetVoterbyRole {0},{1},{2},{3},{4},{5},{6}", voterSuperDto.District, voterSuperDto.Assembly, voterSuperDto.Taluka, voterSuperDto.Village,voterSuperDto.PageNo,voterSuperDto.NoofRow,voterSuperDto.Language).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<VoterDTO> GetVoterByUserId(int userid, int roleid, int PageNo, int NoofRow, string Language)
        {
            try
            {
                var result = _customContext.Set<VoterDTO>().FromSqlRaw("EXEC USP_VotetbyPartBoothandUId {0},{1},{2},{3},{4}", userid, roleid,PageNo,NoofRow,Language).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<LastNameCount> GetVoterCountbyLastName(int UserId, int RoleId, int PageNo, int NoofRow,string Language)
        {
            try
            {              
                return _customContext.Set<LastNameCount>().FromSqlRaw("EXEC USP_GetCountbyLName {0},{1},{2},{3},{4}",UserId,RoleId,PageNo,NoofRow,Language).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public VoterDTO GetVoterDetailbyId(int Id,string Language)
        {
            try
            {
                var voter = _customContext.Set<VoterDTO>().FromSqlRaw("EXEC USP_GetVoterbyId {0},{1}", Id,Language).AsEnumerable().First();
                return voter;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int InsertBulkVoter(List<Voter> voters)
        {
            var partitions = voters.partition(10000);


            foreach (List<Voter> voters1 in partitions)
            {
                try
                {
                    DataTable dt = new DataTable();
                    PropertyInfo[] Props = typeof(Voter).GetProperties(BindingFlags.Public | BindingFlags.Instance);
                    foreach (PropertyInfo prop in Props)
                    {
                        //Setting column names as Property names
                        dt.Columns.Add(prop.Name);
                    }
                    foreach (Voter item in voters1)
                    {
                        var values = new object[Props.Length];
                        for (int i = 0; i < Props.Length; i++)
                        {
                            //inserting property values to datatable rows
                            values[i] = Props[i].GetValue(item, null);
                        }
                        dt.Rows.Add(values);
                    }
                    var d = dt;
                    if (dt.Rows.Count > 0)
                    {

                        using (SqlConnection con = new SqlConnection(_customContext.Database.GetConnectionString()))
                        {
                            using (SqlCommand cmd = new SqlCommand("USP_InsertBulkVoter"))
                            {
                                cmd.CommandType = CommandType.StoredProcedure;
                                cmd.Connection = con;
                                cmd.Parameters.AddWithValue("@VoterType", dt);
                                con.Open();
                                cmd.ExecuteNonQuery();
                                con.Close();
                            }
                        }
                    }


                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

            InsertDistinctPartNoBooth(voters);
            return 1;

        }

        public int InsertDistinctPartNoBooth(List<Voter> voters)
        {
            try
            {
                var voterPPs = _mapper.Map<List<VoterPPBooth>>(voters);
                var distinctPart = voterPPs.Select(m => new { m.PartNo, m.Booth }).Distinct().Select(x => new VoterPPBooth { PartNo = x.PartNo, Booth = x.Booth }).ToList();

                DataTable dt = new DataTable();
                PropertyInfo[] Props = typeof(VoterPPBooth).GetProperties(BindingFlags.Public | BindingFlags.Instance);
                foreach (PropertyInfo prop in Props)
                {
                    //Setting column names as Property names
                    dt.Columns.Add(prop.Name);
                }
                foreach (VoterPPBooth item in distinctPart)
                {
                    var values = new object[Props.Length];
                    for (int i = 0; i < Props.Length; i++)
                    {
                        //inserting property values to datatable rows
                        values[i] = Props[i].GetValue(item, null);
                    }
                    dt.Rows.Add(values);
                }
                if (dt.Rows.Count > 0)
                {

                    using (SqlConnection con = new SqlConnection(_customContext.Database.GetConnectionString()))
                    {
                        using (SqlCommand cmd = new SqlCommand("USP_InsertBulkPartNoBooth"))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Connection = con;
                            cmd.Parameters.AddWithValue("@PartBothType", dt);
                            con.Open();
                            cmd.ExecuteNonQuery();
                            con.Close();
                        }
                    }
                }
                return 1;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int InsertMemberDetail(MemberDetail memberDetail)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("USP_InsertMemberDetail {0},{1},{2},{3},{4},{5}", memberDetail.Name, memberDetail.Age, memberDetail.Gender, memberDetail.MobileNo, memberDetail.Education, memberDetail.VoterId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpadateAltMobileVoter(int Id, string AltMobileNo)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("EXEC USP_UpdateAltMobile {0},{1}", Id, AltMobileNo);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpadateMobileVoter(int Id, string MobileNo)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("EXEC USP_UpdateMobile {0},{1}", Id, MobileNo);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpadateVoter(Voter voter)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("EXEC Usp_UpdateVoterbyId {0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11},{12},{13},{14},{15},{16},{17},{18},{19},{20},{21}," +
                                                            "{22},{23},{24},{25},{26},{27},{28},{29},{30},{31},{32},{33},{34},{35},{36},{37},{38},{39},{40},{41},{42},{43},{44},{45},{46},{47},{48},{40},{50},{51},{52}", voter.Id, voter.SrNo, voter.FullName, voter.BirthDate, voter.Age, voter.Gender, voter.HouseNo, voter.VotingCardNo,
                                                              voter.MobileNo, voter.Caste, voter.District, voter.Assembly, voter.Taluka, voter.Ward, voter.Booth, voter.Village,
                                                              voter.Pincode, voter.Address, voter.Email, voter.FamilyHead, voter.IsSuspisious, voter.IsOutStation, voter.IsAlive,
                                                              voter.Occupation, voter.PartyWorker, voter.VotingInclination, voter.PoliticalParty, voter.UserId, voter.ExtraInfo, 
                                                              voter.WorkLeft, voter.HappywithService, voter.IsDisable, voter.PartNo, voter.AlternateMobileNo,
                                                              voter.StarVoter, voter.Education, voter.FamilyMember, voter.IsSurvey,voter.AssemblyNo, voter.IsVoted,voter.AssemblyName_KR, voter.FullName_KR,
                                                              voter.Village_KR,voter.Address_KR, voter.AssemblyName_HN, voter.FullName_HN, voter.Village_HN, voter.Address_HN,voter.Zone,voter.Family,voter.Religion,voter.Society,voter.FilePath);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateAddressVoter(int Id, string Address)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("EXEC USP_UpdateAddress {0},{1}", Id, Address);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateMemberDetail(MemberDetail memberDetail)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("Usp_UpdateMemberDetail {0},{1},{2},{3},{4},{5},{6}", memberDetail.Id, memberDetail.Name, memberDetail.Age, memberDetail.Gender, memberDetail.MobileNo, memberDetail.Education, memberDetail.VoterId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<VoterDTO> VoterDetailsbyColumn(string ColoumnName, string ColoumnValue, int UserId, int RoleId, int PageNo, int NoofRow, string Language, string SearchText)
        {
            try
            {
                var result = _customContext.Set<VoterDTO>().FromSqlRaw("EXEC USP_GetVoterbyColumn {0},{1},{2},{3},{4},{5},{6},{7}", ColoumnName, ColoumnValue, UserId, RoleId,PageNo,NoofRow,Language,SearchText).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<VoterDTO> VoterDetailsbyLastName(string LName, int UserId, int RoleId, int PageNo, int NoofRow, string Language)
        {
            try
            {
                var result = _customContext.Set<VoterDTO>().FromSqlRaw("EXEC USP_GetVoterbyName {0},{1},{2},{3},{4},{5}", LName, UserId, RoleId,PageNo,NoofRow,Language).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<VoterDTO> VoterwithMobileNo(int UserId, int RoleId, int PageNo, int NoofRow, string Language, string SearchText)
        {
            try
            {
                var result = _customContext.Set<VoterDTO>().FromSqlRaw("EXEC USP_GetAllVoterMobileNo {0},{1},{2},{3},{4},{5}", UserId, RoleId,PageNo,NoofRow,Language,SearchText).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateStarVoter(int Id, string YesNo)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("USP_UpdateStarVoter {0},{1}", Id, YesNo);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateVoterInclination(int id, string Colour)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("USP_UpdateVoterInclination {0},{1}", id, Colour);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int InsertSurveyDetails(VoterSurvey voterSurvey)
        {
            try
            {
                var result = _customContext.Database.ExecuteSqlRaw("Usp_SurveyVoterbyId {0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11},{12},{13},{14},{15},{16},{17},{18}", voterSurvey.Id, voterSurvey.FullName, voterSurvey.BirthDate, voterSurvey.Age, voterSurvey.Gender, voterSurvey.HouseNo, voterSurvey.MobileNo, voterSurvey.Caste, voterSurvey.Address, voterSurvey.Occupation, voterSurvey.ExtraInfo, voterSurvey.WorkLeft, voterSurvey.HappywithService, voterSurvey.IsDisable, voterSurvey.AlternateMobileNo, voterSurvey.Education, voterSurvey.FamilyMember, 'Y', DateTime.Now);
                if (result > 0)
                {
                    var member = new MemberDetail { Name = voterSurvey.MemberName, Age = voterSurvey.MemberAge, Education = voterSurvey.MemberEducation, Gender = voterSurvey.MemberGender, MobileNo = voterSurvey.MemberMobileNo, VoterId = voterSurvey.Id };
                    InsertMemberDetail(member);
                }
                return 1;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<VoterInclination> VoterInclination(int userid, int roleid)
        {
            try
            {
                return _customContext.Set<VoterInclination>().FromSqlRaw("EXEC USP_GetVoterInclination {0},{1}", userid, roleid).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<VoterDTO> AdvancedSearch(AdvanceSearchDTO searchDTO)
        {
            try
            {
                var result= _customContext.Set<VoterDTO>().FromSqlRaw("EXEC USP_AdvancedSearchSP {0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11},{12},{13},{14},{15},{16},{17},{18},{19},{20}", searchDTO.LastName, searchDTO.FirstName, searchDTO.MiddleName, searchDTO.VotingCardNo, searchDTO.PartNo, searchDTO.MobileNo, searchDTO.HouseNo, searchDTO.FromAge, searchDTO.ToAge, searchDTO.Gender, searchDTO.Village, searchDTO.Occupation, searchDTO.Education,searchDTO.Caste,searchDTO.Religion,searchDTO.Society, searchDTO.UserId, searchDTO.RoleId,searchDTO.PageNo,searchDTO.NoofRow,searchDTO.Language).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<VoterDTO> GetVoterInclinationUserId(string inclination, int userid, int roleid, int PageNo, int NoofRow, string Language, string SearchText)
        {
            try
            {
                return _customContext.Set<VoterDTO>().FromSqlRaw("EXEC USP_GetVoterInclinationbyType {0},{1},{2},{3},{4},{5},{6}", inclination, userid, roleid,PageNo,NoofRow,Language,SearchText).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<VoterDTO> GetStarVoterbyUserId(int userid, int roleid, int PageNo, int NoofRow, string Language, string SearchText)
        {
            try
            {
                return _customContext.Set<VoterDTO>().FromSqlRaw("USP_GetStarVoterbyUserID {0},{1},{2},{3},{4},{5}", userid, roleid,PageNo,NoofRow,Language,SearchText).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<BoothName> GetBoothNamebyUserId(int userid, int roleid, int PageNo, int NoofRow)
        {
            try
            {
                return _customContext.Set<BoothName>().FromSqlRaw("USP_GetBoothbyUserId {0},{1},{2},{3}", userid, roleid,PageNo,NoofRow).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<VoterDTO> GetVoterByPartNo(int partno, int PageNo, int NoofRow, string Language, string SearchText)
        {
            try
            {
                return _customContext.Set<VoterDTO>().FromSqlRaw("USP_GetVoterbyPartNo {0},{1},{2},{3},{4}", partno,PageNo,NoofRow,Language,SearchText).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateIsAliveVoter(int id, string YesNo)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("USP_UpdateIsAlive {0},{1}", id, YesNo);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateIsVoted(int id, string YesNo)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("USP_UpdateIsVoted {0},{1}", id, YesNo);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Table> GetVoterCountbyColoumn(int UserId, int RoleId, string Coloumn)
        {
            try
            {
                List<Table> voterDTOs = new List<Table>();
                using (SqlConnection con = new SqlConnection(_customContext.Database.GetConnectionString()))
                {
                    using (SqlCommand cmd = new SqlCommand("USP_GetCountbyColoumTable"))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Connection = con;
                        cmd.Parameters.AddWithValue("@UserId", UserId);
                        cmd.Parameters.AddWithValue("@RoleId", RoleId);
                        cmd.Parameters.AddWithValue("@ColoumnName", Coloumn);
                        con.Open();
                        SqlDataReader dr = cmd.ExecuteReader();
                        DataTable dt = new DataTable();
                        dt.Load(dr);

                        foreach (DataRow row in dt.Rows)
                        {
                            for (int j = 0; j < dt.Columns.Count; j++)
                            {
                                Table voterDTO = new Table();
                                voterDTO.ColumnName = dt.Columns[j].ColumnName;
                                voterDTO.ColumnValue = row[j].ToString();
                                voterDTOs.Add(voterDTO);
                            }
                        }
                        con.Close();
                    }
                }
                return voterDTOs;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int DeleteVoterbyId(int Id)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("EXEC USP_DeleteVoterbyId {0}", Id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int InsertBulkMobile(List<Mobile> mobiles)
        {

            var partitions = mobiles.partition(10000);

            foreach (List<Mobile> mobileData1 in partitions)
            {
                try
                {
                    DataTable dt = new DataTable();
                    PropertyInfo[] Props = typeof(Mobile).GetProperties(BindingFlags.Public | BindingFlags.Instance);
                    foreach (PropertyInfo prop in Props)
                    {
                        //Setting column names as Property names
                        dt.Columns.Add(prop.Name);
                    }
                    foreach (Mobile item in mobileData1)
                    {
                        var values = new object[Props.Length];
                        for (int i = 0; i < Props.Length; i++)
                        {
                            //inserting property values to datatable rows
                            values[i] = Props[i].GetValue(item, null);
                        }
                        dt.Rows.Add(values);
                    }
                    var d = dt;

                    if (dt.Rows.Count > 0)
                    {

                        using (SqlConnection con = new SqlConnection("Data Source=.;Initial Catalog=MobileData;Integrated Security=True"))
                        {
                            using (SqlCommand cmd = new SqlCommand("USP_InsertBulkMobile"))
                            {
                                cmd.CommandType = CommandType.StoredProcedure;
                                cmd.Connection = con;
                                cmd.Parameters.AddWithValue("@MobileType", dt);
                                con.Open();
                                cmd.ExecuteNonQuery();
                                con.Close();
                            }
                        }
                    }


                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
            return 1;

        }

        public int UpdateColoumnTbl(int Id, string ColoumnName, string ColoumnValue)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("EXEC USP_UpdateColoumnTBLVoter {0},{1},{2}", Id, ColoumnName, ColoumnValue);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public int AddCastName(List<Caste> castes)
        {
            try
            {
                DataTable dt = new DataTable();
                PropertyInfo[] Props = typeof(Caste).GetProperties(BindingFlags.Public | BindingFlags.Instance);
                foreach (PropertyInfo prop in Props)
                {
                    //Setting column names as Property names
                    dt.Columns.Add(prop.Name);
                }
                foreach (Caste item in castes)
                {
                    var values = new object[Props.Length];
                    for (int i = 0; i < Props.Length; i++)
                    {
                        //inserting property values to datatable rows
                        values[i] = Props[i].GetValue(item, null);
                    }
                    dt.Rows.Add(values);
                }
                var d = dt;

                if (dt.Rows.Count > 0)
                {

                    using (SqlConnection con = new SqlConnection(_customContext.Database.GetConnectionString()))
                    {
                        using (SqlCommand cmd = new SqlCommand("USP_InsertCastName"))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Connection = con;
                            cmd.Parameters.AddWithValue("@CasteType", dt);
                            con.Open();
                            cmd.ExecuteNonQuery();
                            con.Close();
                        }
                    }
                }
                return 1;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<CastebyLanguage> GetAllCaste(string Language)
        {
            try
            {
                return _customContext.Set<CastebyLanguage>().FromSqlRaw("EXEC USP_GetAllCast {0}",Language).ToList();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<VoterMobileNo> GetAllMobile()
        {
            try
            {
                var result = _customContext.Set<VoterMobileNo>().FromSqlRaw("EXEC USP_GetAllMobileNo").ToList();
                return result;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
    public static class Extensions
    {
        public static List<List<T>> partition<T>(this List<T> values, int chunkSize)
        {
            return values.Select((x, i) => new { Index = i, Value = x })
                .GroupBy(x => x.Index / chunkSize)
                .Select(x => x.Select(v => v.Value).ToList())
                .ToList();
        }
        public static IEnumerable<IEnumerable<T>> Split<T>(this IEnumerable<T> list, int parts)
        {
            return list.Select((item, index) => new { index, item })
                       .GroupBy(x => x.index % parts)
                       .Select(x => x.Select(y => y.item));
        }
    }
}
