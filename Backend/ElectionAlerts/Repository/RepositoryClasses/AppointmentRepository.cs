using ElectionAlerts.Dto;
using ElectionAlerts.Model;
using ElectionAlerts.Model.Data;
using ElectionAlerts.Repository.Interface;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Repository.RepositoryClasses
{
    public class AppointmentRepository : IAppointmentRepository
    {
        private CustomContext _customContext=new CustomContext();

        public int DeleteAppointmentbyId(int Id)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("EXEC USP_DeleteAppointmetbyId {0}", Id);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public int DownloadFile(int Id, string FileName)
        {
            try
            {
                AppointmentImage appointmentImage = new AppointmentImage();
                using (var con = new SqlConnection(_customContext.Database.GetConnectionString()))
                {
                    using (SqlCommand cmd = new SqlCommand("Usp_AppointmentDownloadFile"))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Connection = con;
                        cmd.Parameters.AddWithValue("@Id", Id);
                       
                        con.Open();
                        SqlDataReader dr = cmd.ExecuteReader();
                        while (dr.Read())
                        {
                            appointmentImage.FileContent=(byte[])dr[0];
                            appointmentImage.FileName = dr[1].ToString();
                        }
                        con.Close();
                    }
                }
                FileInfo fileInfo = new FileInfo(appointmentImage.FileName);
                var res= DownloadFile(appointmentImage.FileContent, FileName + "\\" + fileInfo.Name);
                return res;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Appointment> GetAppointmentbyDate(DateTime dateTime)
        {
            try
            {
                return _customContext.Set<Appointment>().FromSqlRaw("EXEC USP_GetAppointmentbyDate {0}", dateTime ).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Appointment> GetAppointmentbyStatus(string Status)
        {
            try
            {
                return _customContext.Set<Appointment>().FromSqlRaw("EXEC USP_GetAppointmentbyStatus {0}", Status).ToList();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Appointment> GetAppointments()
        {
            try
            {
                return _customContext.Set<Appointment>().FromSqlRaw("EXEC USP_GetAllAppointment").ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<AppointmentDTO> GetTodayAppointment()
        {
            try
            {
                return _customContext.Set<AppointmentDTO>().FromSqlRaw("EXEC Usp_GetTodayAppointment ").ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int InsertUpdateAppintment(Appointment appointment)
        {
            try
            {
                var FileContent = UploadFile(appointment.FileName);
                return _customContext.Database.ExecuteSqlRaw("EXEC USP_InsertUpdateAppointment {0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11},{12},{13},{14},{15},{16},{17},{18},{19},{20},{21}", appointment.Id, appointment.FirstName,appointment.MiddleName,appointment.LastName,appointment.BirthDate,appointment.PhoneNo,appointment.AppointmentDate,appointment.Category,appointment.Work,appointment.Other,appointment.District,appointment.Taluka,appointment.HouseNo,appointment.Soc_BldgName,appointment.WardNo,appointment.PinCode,appointment.City_Village,appointment.Remark,appointment.FileName,DateTime.Now.ToString(),appointment.Status, FileContent);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateApointmentStatus(int Id, string Status, DateTime? datetime)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("EXEC USP_UpdateAppointmnetStatus {0},{1},{2}", Id, Status, datetime);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public byte[] UploadFile(string FileName)
        {
            if (!File.Exists(FileName))
            {
                return null;
            }

            FileStream fs = null;
            try
            {
                #region Reading file

                fs = new FileStream(FileName, FileMode.Open);

                //
                // Finding out the size of the file to be uploaded
                //
                FileInfo fi = new FileInfo(FileName);
                long temp = fi.Length;
                int lung = Convert.ToInt32(temp);
                // ------------------------------------------

                //
                // Reading the content of the file into an array of bytes.
                //
                byte[] picture = new byte[lung];
                fs.Read(picture, 0, lung);
                fs.Close();
                // ------------------------------------------
                #endregion

                return picture;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message + " - " + e.StackTrace);
                return null;
            }
        }

        public int DownloadFile(byte[] Picture,string FileName)
        {
            MemoryStream ms = new MemoryStream(Picture, 0, Picture.Length);
            Image img = Image.FromStream(ms);
            img.Save(FileName);
            ms.Close();
            return 1;
        }
    }
}
