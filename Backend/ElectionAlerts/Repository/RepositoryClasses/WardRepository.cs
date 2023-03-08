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
    public class WardRepository : IWardRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private CustomContext _customContext;
        public WardRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _customContext = new CustomContext(_httpContextAccessor);
        }
        public int DeleteWardbyId(int Id)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("EXEC USP_DeleteWardbyId {0}", Id);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Ward> FilterWardList(Table table)
        {
            try
            {
                return _customContext.Set<Ward>().FromSqlRaw("EXEC USP_FilterSP {0},{1},{2}", table.TableName, table.ColumnName, table.ColumnValue).ToList();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Ward> GetWard()
        {
            try
            {
                return _customContext.Set<Ward>().FromSqlRaw("USP_GetAllWard").ToList();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public int InsertBulkWard(DataTable dt)
        {
            try
            {
               using(SqlConnection cn=new SqlConnection(_customContext.Database.GetConnectionString()))
               {
                    using(SqlCommand com=new SqlCommand("USP_InsertBulkWard"))
                    {
                        com.CommandType = CommandType.StoredProcedure;
                        com.Connection = cn;
                        com.Parameters.AddWithValue("WardType", dt);
                        cn.Open();
                        com.ExecuteNonQuery();
                        cn.Close();
                    }
               }
                return 1;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public int InsertBulkWardList(List<Ward> wards)
        {
            try
            {
                DataTable dt = new DataTable();
                PropertyInfo[] Props = typeof(Ward).GetProperties(BindingFlags.Public | BindingFlags.Instance);
                foreach (PropertyInfo prop in Props)
                {
                    //Setting column names as Property names
                    if (prop.Name == "Id")
                        continue;
                    dt.Columns.Add(prop.Name);
                }
                foreach (Ward item in wards)
                {
                    var values = new object[Props.Length - 1];
                    for (int i = 0; i < Props.Length; i++)
                    {
                        //inserting property values to datatable rows
                        if (i == 0)
                            continue;
                        values[i - 1] = Props[i].GetValue(item, null);
                    }
                    dt.Rows.Add(values);
                }
                var d = dt;
                if (dt.Rows.Count > 0)
                {

                    using (SqlConnection con = new SqlConnection(_customContext.Database.GetConnectionString()))
                    {
                        using (SqlCommand cmd = new SqlCommand("USP_InsertBulkWard"))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Connection = con;
                            cmd.Parameters.AddWithValue("WardType", dt);
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

        public int InsertWard(Ward ward)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("EXEC Usp_InsertWard {0},{1},{2},{3}",ward.BoothNo,ward.BoothName,ward.WardName,ward.WardNo);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
