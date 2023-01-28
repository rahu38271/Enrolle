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

namespace ElectionAlerts.Repository.RepositoryClasses
{
    public class VillageRepository : IVillageRepository
    {
        private CustomContext _customContext = new CustomContext();
        public IEnumerable<Village> GetVillage(string taluka)
        {
            try
            {
                return _customContext.Set<Village>().FromSqlRaw("EXEC USP_GetAllVillagebyTaluka {0}", taluka);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public int InsertBulkVillageList(List<Village> villages)
        {
            try
            {
                DataTable dt = new DataTable();
                PropertyInfo[] Props = typeof(Village).GetProperties(BindingFlags.Public | BindingFlags.Instance);
                foreach (PropertyInfo prop in Props)
                {
                    //Setting column names as Property names
                    if (prop.Name == "Id")
                        continue;
                    dt.Columns.Add(prop.Name);
                }
                foreach (Village item in villages)
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
                        using (SqlCommand cmd = new SqlCommand("USP_InsertBulkVillage"))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Connection = con;
                            cmd.Parameters.AddWithValue("@VillageType", dt);
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
