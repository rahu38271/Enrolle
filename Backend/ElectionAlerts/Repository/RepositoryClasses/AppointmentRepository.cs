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

        public IEnumerable<Appointment> GetAppointmentbyDate(int UserId, int RoleId, string dateTime)
        {
            try
            {
                return _customContext.Set<Appointment>().FromSqlRaw("EXEC USP_GetAppointmentbyDate {0},{1},{2}", UserId,RoleId,dateTime ).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Appointment> GetAppointmentbyStatus(int UserId, int RoleId, string Status)
        {
            try
            {
                return _customContext.Set<Appointment>().FromSqlRaw("EXEC USP_GetAppointmentbyStatus {0},{1},{2}",UserId,RoleId, Status).ToList();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Appointment> GetAppointments(int UserId, int RoleId)
        {
            try
            {
                return _customContext.Set<Appointment>().FromSqlRaw("EXEC USP_GetAllAppointment {0},{1}",UserId,RoleId).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<AppointmentDTO> GetTodayAppointment(int UserId, int RoleId)
        {
            try
            {
                return _customContext.Set<AppointmentDTO>().FromSqlRaw("EXEC Usp_GetTodayAppointment {0},{1}",UserId,RoleId).ToList();
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
                 Byte[] imgtype = { 0 };
                var FileContent = UploadFile(appointment.FileName)?? imgtype;
                return _customContext.Database.ExecuteSqlRaw("EXEC USP_InsertUpdateAppointment {0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11},{12},{13},{14},{15},{16},{17},{18},{19},{20},{21},{22},{23},{24}", appointment.Id, appointment.FirstName,appointment.MiddleName,appointment.LastName,appointment.BirthDate,appointment.PhoneNo,appointment.AppointmentDate,appointment.Category,appointment.Work,appointment.Other,appointment.District,appointment.Taluka,appointment.HouseNo,appointment.Soc_BldgName,appointment.WardNo,appointment.PinCode,appointment.City_Village,appointment.Remark,appointment.FileName,DateTime.Now.ToString(),appointment.Status, FileContent,appointment.UserId,appointment.AdminName,appointment.RoleId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateApointmentStatus(int Id, string Status, string datetime)
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
            if (!File.Exists(FileName))
            {
                return 0;
            }
            if (Picture != null)
            {
                MemoryStream ms = new MemoryStream(Picture, 0, Picture.Length);
                Image img = Image.FromStream(ms);
                img.Save(FileName);
                ms.Close();
                return 1;
            }
            return 0;
        }

        public IEnumerable<Appointment> GetAppointmentFromToDate(int UserId, int RoleId, string FromDate, string ToDate)
        {
            try
            {
                return _customContext.Set<Appointment>().FromSqlRaw("EXEC USP_GetAppointmentFromToDate {0},{1},{2},{3}", UserId, RoleId, FromDate, ToDate).ToList();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<AppointmentCount> GetAppointmentCount(int UserId, int RoleId)
        {
            try
            {
                return _customContext.Set<AppointmentCount>().FromSqlRaw("EXEC USP_GetAppointmentCount {0},{1}", UserId, RoleId).ToList();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<AppointmentCountbyUser> GetAppointmentCountbyUser()
        {
            try
            {
                return _customContext.Set<AppointmentCountbyUser>().FromSqlRaw("EXEC USP_GetAppointmentCountbyUser").ToList();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Appointment> GetAppointmentbyUserId(int UserId)
        {
            try
            {
                return _customContext.Set<Appointment>().FromSqlRaw("EXEC USP_GetAppointmentbyUserId {0}",UserId).ToList();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
