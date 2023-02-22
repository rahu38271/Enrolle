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
    public class BoothRespository : IBoothRepository
    {
        private CustomContext _cuctomContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public BoothRespository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _cuctomContext = new CustomContext(_httpContextAccessor);
        }
        public IEnumerable<Booth> FilterBoothList(Table table)
        {
            try
            {
                return _cuctomContext.Set<Booth>().FromSqlRaw("EXEC USP_FilterSP {0},{1},{2}", table.TableName, table.ColumnName, table.ColumnValue).ToList();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Booth> GetAllBoth()
        {
            try
            {
                return _cuctomContext.Set<Booth>().FromSqlRaw("USP_GetAllBooth").ToList();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public int InsertBoothSingle(Booth booth)
        {
            try
            {
                return _cuctomContext.Database.ExecuteSqlRaw("EXEC Usp_InsertBoth {0},{1},{2}",booth.AssemblyName,booth.BoothNo,booth.BoothName);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public int InsertBoothBulk(DataTable dataTable)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(_cuctomContext.Database.GetConnectionString()))
                {
                    using(SqlCommand com=new SqlCommand("USP_InsertBulkBoth"))
                    {
                        com.CommandType = CommandType.StoredProcedure;
                        com.Connection = con;
                        com.Parameters.AddWithValue("@BothType", dataTable);
                        con.Open();
                        com.ExecuteNonQuery();
                        con.Close();
                    }
                }
                return 1;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int InsertBoothBulkList(List<Booth> booths)
        {
            try
            {
                DataTable dt = new DataTable();
                PropertyInfo[] Props = typeof(Booth).GetProperties(BindingFlags.Public | BindingFlags.Instance);
                foreach (PropertyInfo prop in Props)
                {
                    //Setting column names as Property names
                    if (prop.Name == "Id")
                        continue;
                    dt.Columns.Add(prop.Name);
                }
                foreach (Booth item in booths)
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

                    using (SqlConnection con = new SqlConnection(_cuctomContext.Database.GetConnectionString()))
                    {
                        using (SqlCommand cmd = new SqlCommand("USP_InsertBulkBoth"))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Connection = con;
                            cmd.Parameters.AddWithValue("@BothType", dt);
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

        public int DeleteBoothbyId(int Id)
        {
            try
            {
                return _cuctomContext.Database.ExecuteSqlRaw("EXEC USP_DeleteBoothbyId {0}", Id);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
