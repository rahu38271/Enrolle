using ElectionAlerts.Dto;
using ElectionAlerts.Model;
using ElectionAlerts.Model.Data;
using ElectionAlerts.Repository.Interface;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Assembly = ElectionAlerts.Model.Assembly;

namespace ElectionAlerts.Repository.RepositoryClasses
{
    public class AssemblyRepository : IAssemblyRepository
    {
        private CustomContext _customContext = new CustomContext();

        public int DeleteAssemblybyId(int id)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("EXEC USP_DeleteAssemblybyId {0}", id);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Assembly> FilterAssemblyList(Table table)
        {
            try
            {
                return  _customContext.Set<Assembly>().FromSqlRaw("EXEC USP_FilterSP {0},{1},{2}", table.TableName, table.ColumnName, table.ColumnValue).ToList();
                
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Assembly> GetAssembly()
        {
            try
            {
                return _customContext.Set<Assembly>().FromSqlRaw("USP_GetAllAssembly").ToList();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public IEnumerable<Assembly> GetAssemblyDistrictwise(string district)
        {
            try
            {
                return _customContext.Set<Assembly>().FromSqlRaw("USP_GetAssemblybyDistrict {0}", district).ToList();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public int InsertAssembly(Assembly assembly)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("EXEC Usp_InsertAssembly {0},{1},{2},{3}",assembly.State,assembly.AssemblyName,assembly.AssemblyNo, assembly.District);

            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

     

        public int InsertBulkAssembly(DataTable dt)
        {
            try
            {
                if (dt.Rows.Count > 0)
                {

                    using (SqlConnection con = new SqlConnection(_customContext.Database.GetConnectionString()))
                    {
                        using (SqlCommand cmd = new SqlCommand("USP_InsertBulkAssembly"))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Connection = con;
                            cmd.Parameters.AddWithValue("@AssemblyType", dt);
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

        public int InsertBulkAssemblyList(List<Assembly> assemblies)
        {
            try
            {
                DataTable dt = new DataTable();
                PropertyInfo[] Props = typeof(Assembly).GetProperties(BindingFlags.Public | BindingFlags.Instance);
                foreach (PropertyInfo prop in Props)
                {
                    //Setting column names as Property names
                    if (prop.Name == "Id")
                        continue;
                    dt.Columns.Add(prop.Name);
                }
                foreach (Assembly item in assemblies)
                {
                    var values = new object[Props.Length-1];
                    for (int i = 0; i < Props.Length; i++)
                    {
                        //inserting property values to datatable rows
                        if (i == 0)
                            continue;
                        values[i-1] = Props[i].GetValue(item, null);
                    }
                    dt.Rows.Add(values);
                }
                var d = dt;
                if (dt.Rows.Count > 0)
                {

                    using (SqlConnection con = new SqlConnection(_customContext.Database.GetConnectionString()))
                    {
                        using (SqlCommand cmd = new SqlCommand("USP_InsertBulkAssembly"))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Connection = con;
                            cmd.Parameters.AddWithValue("@AssemblyType", dt);
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
    }
}
