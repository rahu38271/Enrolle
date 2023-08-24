using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using ElectionAlerts.Dto;
using ElectionAlerts.Model;
using ElectionAlerts.Model.Data;
using ElectionAlerts.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace ElectionAlerts.Repository.RepositoryClasses
{
    public class ContactRepository:IContactReposritory
    {
        private CustomContext _customContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ContactRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _customContext = new CustomContext(_httpContextAccessor);
        }
        public IEnumerable<ContactwithCount> GetContacts(int PageNo, int NoofRow, string SearchText)
        {
            try
            {
                return _customContext.Set<ContactwithCount>().FromSqlRaw("EXEC USP_GetContacts_Pagination {0},{1},{2}",PageNo,NoofRow,SearchText).ToList();
            }
            catch (Exception ex)
            {

                throw ex;
            }
           
        }
        public int InsertSingleContact(Contact cnt)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("EXEC Usp_InsertSingleContact {0},{1},{2},{3},{4},{5},{6},{7},{8},{9}", cnt.FullName, cnt.VilageName, cnt.BirthDate, cnt.Anniversary,
               cnt.MobileNo, cnt.AlternativeMobileNo, cnt.Address, cnt.Taluka, cnt.District,cnt.LoginUserId);
            }
            catch (Exception ex)
            {

                throw ex;
            }
           
        }
        public int InsertBulkContact(List<BulkContact> contact)
        {
            try
            {
                var contactpartition = contact.partition(10000);
                foreach(var cnt in contactpartition)
                {
                    DataTable dt = new DataTable();
                    PropertyInfo[] Props = typeof(BulkContact).GetProperties(BindingFlags.Public | BindingFlags.Instance);
                    foreach (PropertyInfo prop in Props)
                    {
                        //Setting column names as Property names
                        dt.Columns.Add(prop.Name);
                    }
                    foreach (BulkContact item in cnt)
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
                            using (SqlCommand cmd = new SqlCommand("USP_InsertBulkContact"))
                            {
                                cmd.CommandType = CommandType.StoredProcedure;
                                cmd.Connection = con;
                                cmd.Parameters.AddWithValue("@ContactType", dt);
                                con.Open();
                                cmd.ExecuteNonQuery();
                                con.Close();
                            }
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

        public int UpdateSingleContact(Contact cnt)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("EXEC Usp_UpdateSingleContact {0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10}", cnt.Id, cnt.FullName, cnt.VilageName, cnt.BirthDate, cnt.Anniversary,
                cnt.MobileNo, cnt.AlternativeMobileNo, cnt.Address, cnt.Taluka, cnt.District,cnt.LoginUserId);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public int DeleteContactbyId(int Id)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("EXEC USP_DeleteContactbyId {0}", Id);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }

   

}
