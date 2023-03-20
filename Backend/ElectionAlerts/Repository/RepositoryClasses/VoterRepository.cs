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
                                                            "{22},{23},{24},{25},{26},{27},{28},{29},{30},{31},{32},{33},{34},{35},{36}", voter.FullName, voter.BirthDate, voter.Age, voter.Gender, voter.HouseNo, voter.VotingCardNo, 
                                                              voter.MobileNo, voter.Caste, voter.District,voter.Assembly, voter.Taluka, voter.Ward, voter.Booth, voter.Village,voter.Pincode, voter.Address, voter.Email, voter.FamilyHead, voter.IsSuspisious, 
                                                              voter.IsOutStation, voter.IsAlive,voter.Occupation, voter.PartyWorker, voter.VotingInclination, voter.PoliticalParty, voter.UserId,voter.ExtraInfo,voter.WorkLeft,voter.HappywithService,voter.IsDisable,
                                                              voter.PartNo,voter.AlternateMobileNo,voter.StarVoter,voter.Education,voter.FamilyMember,voter.IsSurvey,DateTime.Now);
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
                        con.Open();
                        SqlDataReader dr= cmd.ExecuteReader();
                        while(dr.Read())
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
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Voter> FilterVoterbyCondition(VoterTable table)
        {
            try
            {
                var result = _customContext.Set<Voter>().FromSqlRaw("EXEC USP_FilterVoterSPwithCondition {0},{1},{2},{3},{4},{5}", table.TableName, table.ColumnName, table.ColumnValue,table.Condition, table.UserId,table.RoleId).ToList();
                return result;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Voter> FilterVoterList(VoterTable table)
        {
            try
            {
                var result = _customContext.Set<Voter>().FromSqlRaw("EXEC USP_FilterVoterSP {0},{1},{2},{3},{4}", table.TableName, table.ColumnName, table.ColumnValue,table.UserId,table.RoleId).ToList();
                return result;
            }
            catch(Exception ex)
            {
                throw ex;
            }       
        }
        public IEnumerable<VoterAssembly> GetAllVoter(int userid,int roleid, int PageNo, int NoofRow)
        {
            try
            {
                return _customContext.Set<VoterAssembly>().FromSqlRaw("USP_GetAllVoter_Page {0},{1},{2},{3}", userid, roleid, PageNo, NoofRow).ToList();
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
               return _customContext.Set<VoterPPBooth>().FromSqlRaw("USP_GetPartNoBooth {0},{1}",Role, UserId).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<VoterbyBooth> GetVoterbybooth(int userid,int roleid)
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
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public VoterCount GetTotalVoterCount()
        {
            try
            {
                return _customContext.Set<VoterCount>().FromSqlRaw("USP_GetVoterCount").ToList().FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Voter> GetVoterAgeBetween(int Age1, int Age2,string Gender,int UserId,int RoleId)
        {
            try
            {
                var result= _customContext.Set<Voter>().FromSqlRaw("USP_FilterAgeBetween {0},{1},{2},{3},{4}", Age1, Age2, Gender, UserId, RoleId).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    
        public IEnumerable<VoterDTO> GetVoterbyRelation(int Id,int UserId,int RoleId)
        {
            try
            {
                var Names = _customContext.Set<Voter>().FromSqlRaw("USP_GetVoterbyRelation {0},{1},{2}",Id,UserId,RoleId).ToList();
                return _mapper.Map<List<VoterDTO>>(Names);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Voter> GetVoterbyRole(VoterSuperDto voterSuperDto)
        {
            try
            {
                var result = _customContext.Set<Voter>().FromSqlRaw("USP_GetVoterbyRole {0},{1},{2},{3}", voterSuperDto.District, voterSuperDto.Assembly,  voterSuperDto.Taluka, voterSuperDto.Village).ToList();
                return result;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Voter> GetVoterByUserId(int userid,int roleid)
        {
            try
            {
                var result = _customContext.Set<Voter>().FromSqlRaw("EXEC USP_VotetbyPartBoothandUId {0},{1}", userid, roleid).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Table> GetVoterCountbyLastName(int UserId,int RoleId)
        {
            try
            {
                List<Table> voterDTOs = new List<Table>();
                using (SqlConnection con = new SqlConnection(_customContext.Database.GetConnectionString()))
                {
                    using (SqlCommand cmd = new SqlCommand("USP_GetCountbyLName"))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Connection = con;
                        cmd.Parameters.AddWithValue("@UserId", UserId);
                        cmd.Parameters.AddWithValue("@RoleId", RoleId);
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
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public VoterDTO GetVoterDetailbyId(int Id)
        {
            try
            {
                var voter= _customContext.Set<Voter>().FromSqlRaw("EXEC USP_GetVoterbyId {0}", Id).AsEnumerable().First();
                return _mapper.Map<VoterDTO>(voter);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public int InsertBulkVoter(List<Voter> voters)
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
                foreach (Voter item in voters)
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
                InsertDistinctPartNoBooth(voters);
                return 1;
            }
            catch(Exception ex)
            {
                throw ex;
            }

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
            catch(Exception ex)
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
            catch(Exception ex)
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
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public int UpadateVoter(Voter voter)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("EXEC Usp_UpdateVoterbyId {0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11},{12},{13},{14},{15},{16},{17},{18},{19},{20},{21}," +
                                                            "{22},{23},{24},{25},{26},{27},{28},{29},{30},{31},{32},{33},{34},{35},{36},{37}",voter.Id,voter.FullName, voter.BirthDate, voter.Age, voter.Gender, voter.HouseNo, voter.VotingCardNo,
                                                              voter.MobileNo, voter.Caste, voter.District, voter.Assembly, voter.Taluka, voter.Ward, voter.Booth, voter.Village,
                                                              voter.Pincode, voter.Address, voter.Email, voter.FamilyHead, voter.IsSuspisious, voter.IsOutStation, voter.IsAlive,
                                                              voter.Occupation, voter.PartyWorker, voter.VotingInclination, voter.PoliticalParty, voter.UserId,voter.ExtraInfo,voter.WorkLeft,voter.HappywithService,voter.IsDisable,voter.PartNo,voter.AlternateMobileNo,
                                                              voter.StarVoter,voter.Education,voter.FamilyMember,voter.IsSurvey,DateTime.Now);
            }
            catch(Exception ex)
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
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateMemberDetail(MemberDetail memberDetail)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("Usp_UpdateMemberDetail {0},{1},{2},{3},{4},{5},{6}",memberDetail.Id, memberDetail.Name, memberDetail.Age, memberDetail.Gender, memberDetail.MobileNo, memberDetail.Education, memberDetail.VoterId);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<VoterDTO> VoterDetailsbyColumn(string ColoumnName,string ColoumnValue, int UserId,int RoleId)
        {
            try
            {
                var result = _customContext.Set<VoterDTO>().FromSqlRaw("EXEC USP_GetVoterbyColumn {0},{1},{2},{3}", ColoumnName,ColoumnValue, UserId,RoleId).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<VoterDTO> VoterDetailsbyLastName(string LName,int UserId,int RoleId)
        {
            try
            {    
                var result= _customContext.Set<VoterDTO>().FromSqlRaw("EXEC USP_GetVoterbyName {0},{1},{2}", LName, UserId, RoleId).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<VoterDTO> VoterwithMobileNo(int UserId,int RoleId)
        {
            try
            {
                var result = _customContext.Set<Voter>().FromSqlRaw("EXEC USP_GetAllVoterMobileNo {0},{1}", UserId,RoleId).ToList();
                return _mapper.Map<List<VoterDTO>>(result);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateStarVoter(int Id, string YesNo)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("USP_UpdateStarVoter {0},{1}",Id,YesNo);
            }
            catch(Exception ex)
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
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public int InsertSurveyDetails(VoterSurvey voterSurvey)
        {
            try
            {
                var result= _customContext.Database.ExecuteSqlRaw("Usp_SurveyVoterbyId {0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11},{12},{13},{14},{15},{16},{17},{18}", voterSurvey.Id, voterSurvey.FullName, voterSurvey.BirthDate, voterSurvey.Age, voterSurvey.Gender, voterSurvey.HouseNo, voterSurvey.MobileNo, voterSurvey.Caste, voterSurvey.Address, voterSurvey.Occupation, voterSurvey.ExtraInfo, voterSurvey.WorkLeft, voterSurvey.HappywithService, voterSurvey.IsDisable, voterSurvey.AlternateMobileNo, voterSurvey.Education, voterSurvey.FamilyMember, 'Y',DateTime.Now);
                if (result > 0)
                {
                    var member = new MemberDetail { Name = voterSurvey.MemberName, Age = voterSurvey.MemberAge, Education = voterSurvey.MemberEducation, Gender = voterSurvey.MemberGender, MobileNo = voterSurvey.MemberMobileNo, VoterId = voterSurvey.Id };
                    InsertMemberDetail(member);
                }
                return 1;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<VoterInclination> VoterInclination(int userid,int roleid)
        {
           try
            {
                return _customContext.Set<VoterInclination>().FromSqlRaw("EXEC USP_GetVoterInclination {0},{1}", userid,roleid).ToList();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Voter> AdvancedSearch(AdvanceSearchDTO searchDTO)
        {
            try
            {
                return _customContext.Set<Voter>().FromSqlRaw("EXEC USP_AdvancedSearchSP {0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11},{12}",searchDTO.LastName,searchDTO.FirstName,searchDTO.MiddleName,searchDTO.VotingCardNo,searchDTO.PartNo,searchDTO.MobileNo,searchDTO.HouseNo,searchDTO.FromAge,searchDTO.ToAge,searchDTO.Gender,searchDTO.Village,searchDTO.UserId,searchDTO.RoleId).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<VoterDTO> GetVoterInclinationUserId(string inclination, int userid,int roleid)
        {
            try
            {
                return _customContext.Set<VoterDTO>().FromSqlRaw("EXEC USP_GetVoterInclinationbyType {0},{1},{2}", inclination, userid,roleid).ToList();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<VoterDTO> GetStarVoterbyUserId(int userid,int roleid)
        {
            try
            {
                return _customContext.Set<VoterDTO>().FromSqlRaw("EXEC USP_GetStarVoterbyUserID {0},{1}", userid, roleid).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<BoothName> GetBoothNamebyUserId(int userid,int roleid)
        {
            try
            {
                return _customContext.Set<BoothName>().FromSqlRaw("USP_GetBoothbyUserId {0},{1}", userid, roleid).ToList();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Voter> GetVoterByPartNo(int partno)
        {
            try
            {
                return _customContext.Set<Voter>().FromSqlRaw("USP_GetVoterbyPartNo {0}", partno).ToList();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
