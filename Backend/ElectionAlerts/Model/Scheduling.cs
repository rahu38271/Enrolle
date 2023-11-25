using ElectionAlerts.Model.Data;
using ElectionAlerts.Repository.RepositoryClasses;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Quartz;
using Quartz.Impl;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
namespace ElectionAlerts.Model
{
    public class Task1 : IJob
    {
        private MasterCustomContext _cuctomContext = new MasterCustomContext();
        private static TimeZoneInfo INDIAN_ZONE = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
        public Task Execute(IJobExecutionContext context)
        {
            var task = Task.Run(() => logfile(DateTime.Now)); ;
            return null;
        }
        public void logfile(DateTime time)
        {
            LogWrite("Scheduller Started Executing the Job : " + DateTime.Now.ToString());

            var connpara = GetConnection();
            var condb = from cn in connpara where cn.MessageSent=="Y" select cn;
            foreach (var con in condb)
            {
                //if (con.UserName != "ElectionAlerts2")
                //    continue;
                try
                {
                    var constr = $"Server={con.IPAddress};Database= {con.DBName};User Id={ con.UserName};Password={con.Password};pooling=false;";
                    var birthday = GetBirthDay(constr);
                    var smssetting = GetSmSSetting(constr, "Birthday");
                    //var Name = new List<Contact> { new Contact { FullName = "Abhay Ashok Bhalerao",BirthDate=Convert.ToDateTime("14-08-2023"), MobileNo = "7020212230" } };
                    foreach (var contact in birthday)
                    {
                        SentBirthdaymsg(contact, smssetting);
                    }
                    var anniversary = GetAnniversary(constr);
                    var smssetting2 = GetSmSSetting(constr, "Anniversary");
                    foreach (var contact in anniversary)
                    {
                        SentAnniversarymsg(contact, smssetting2);
                    }
                }
                catch(Exception ex)
                {
                    LogWrite("Error while Sending SMS "+ ex);
                }
            }
            

            LogWrite("Scheduller Completed Executing the Job : " + DateTime.Now.ToString());
        }

        private void SentBirthdaymsg(Contact contact,SmsSetting sms)
        {
            try
            {
                var Current_date = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, INDIAN_ZONE);
                DateTime candidate1 = Convert.ToDateTime(contact.BirthDate);
                if (candidate1.Day == Current_date.Day && candidate1.Month == Current_date.Month)
                {
                    using (WebClient web = new WebClient())
                    {
                        string msg = $"{sms.Url}username={sms.UserName}&password={sms.Password}&senderid={sms.SenderId}&type={sms.Type}&destination={contact.MobileNo}&text={sms.Text.Replace("{#var#}", contact.FullName)}.&peid={sms.PeId}";
                        Stream myStream = web.OpenRead(msg);
                        StreamReader sr = new StreamReader(myStream);
                        string data = sr.ReadToEnd();
                        string[] lines = data.Split(',');
                        //var data1 = JsonConvert.DeserializeObject<dynamic>(lines[1]);
                        LogWrite($"Send BirthDay SMS Message : {contact.MobileNo} {lines[1]}");
                    }
                }

                //using (WebClient web = new WebClient())
                //{
                //    string wapmsg = $"Dear {contact.FullName} ji,{ Environment.NewLine}{Environment.NewLine} Wishing you a very Happy Birthday!{Environment.NewLine}{Environment.NewLine} Youtube:https://www.youtube.com/@anpcarefoundation5020/videos {Environment.NewLine}{Environment.NewLine} Regards,{Environment.NewLine} ANP Care Foundation {Environment.NewLine} 9970043005/06 {Environment.NewLine} www.anpcarefoundation.org";
                //    string mediaurl = "http://volartech.in/assets/img/Birthday.jpeg";
                //    string url1 = whatUpSetting.URL + "?number=91" + contact.MobileNo + "&type=media&message=" + wapmsg + "&media_url=" + mediaurl + "&filename=Birthday.jpeg&instance_id=" + whatUpSetting.InstanceId + "&access_token=" + whatUpSetting.AccessToken + "";
                //    Stream myStream = web.OpenRead(url1);
                //    StreamReader sr = new StreamReader(myStream);
                //    string data = sr.ReadToEnd();
                //    string[] lines = data.Split('\n');
                //    var result = lines[2].Split(" [status] =>");
                //    // var data1 = JsonConvert.DeserializeObject<dynamic>(lines[3]);
                //    myStream.Close();
                //    LogWrite($"Send BirthDay WhatUp Mesage : {contact.MobileNo} {result}");
                //}
            }
            catch (Exception ex)
            {
                var msg = ex.Message;
                LogWrite("Error in Annivaersary : " + ex.Message);
            }

        }

        private void SentAnniversarymsg(Contact contact, SmsSetting sms)
        {
            try
            {
                var Current_date = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, INDIAN_ZONE);
                DateTime candidate1 = Convert.ToDateTime(contact.Anniversary);
                if (candidate1.Day == Current_date.Day && candidate1.Month == Current_date.Month)
                {
                    using (WebClient web = new WebClient())
                    {
                        string msg = $"{sms.Url}username={sms.UserName}&password={sms.Password}&senderid={sms.SenderId}&type={sms.Type}&destination={contact.MobileNo}&text={sms.Text.Replace("{#var#}", contact.FullName)}. &peid={sms.PeId}";
                        Stream myStream = web.OpenRead(msg);
                        StreamReader sr = new StreamReader(myStream);
                        string data = sr.ReadToEnd();
                        string[] lines = data.Split(',');
                       // var data1 = JsonConvert.DeserializeObject<dynamic>(lines[0]);
                        LogWrite($"Send Aniversary SMS Message {contact.MobileNo} {lines[1]}");
                    }
                   
                    //using (WebClient web = new WebClient())
                    //{
                    //    string wapmsg = $"Dear {contact.FullName} ji,{ Environment.NewLine}{Environment.NewLine} Wishing you a very Happy Anniverssary!{Environment.NewLine}{Environment.NewLine} Youtube:https://www.youtube.com/@anpcarefoundation5020/videos {Environment.NewLine}{Environment.NewLine} Regards,{Environment.NewLine} ANP Care Foundation {Environment.NewLine} 9970043005/06 {Environment.NewLine} www.anpcarefoundation.org";
                    //    string mediaurl = "http://volartech.in/assets/img/Birthday.jpeg";
                    //    string url1 = whatUpSetting.URL + "?number=91" + contact.MobileNo + "&type=media&message=" + wapmsg + "&media_url=" + mediaurl + "&filename=Birthday.jpeg&instance_id=" + whatUpSetting.InstanceId + "&access_token=" + whatUpSetting.AccessToken + "";
                    //    Stream myStream = web.OpenRead(url1);
                    //    StreamReader sr = new StreamReader(myStream);
                    //    string data = sr.ReadToEnd();
                    //    string[] lines = data.Split('\n');
                    //    var result = lines[2].Split(" [status] =>");
                    //    // var data1 = JsonConvert.DeserializeObject<dynamic>(lines[3]);
                    //    myStream.Close();
                    //    LogWrite($"Send Anniverssary WhatUp Mesage : {contact.MobileNo} {result}");
                    //}   

                }
            }
            catch (Exception ex)
            {
                var msg = ex.Message;
                LogWrite("Error in Annivaersary : " + ex.Message);
            }

        }

        public void LogWrite(string logMessage)
        {
            var filename1 = DateTime.Now.ToShortDateString() + "log.txt";
            var fileName = Path.GetFileName(filename1);
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot", fileName);

            try
            {
                using (StreamWriter w = File.AppendText(filePath))
                {
                    Log(logMessage, w);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void Log(string logMessage, TextWriter txtWriter)
        {
            try
            {
                txtWriter.Write("\r\nLog Entry : ");
                txtWriter.WriteLine("{0} {1}", DateTime.Now.ToLongTimeString(),
                    DateTime.Now.ToLongDateString());
                txtWriter.WriteLine("  :");
                txtWriter.WriteLine("  :{0}", logMessage);
                txtWriter.WriteLine("-------------------------------");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ConfigureDB> GetConnection()
         {
            List<ConfigureDB> configureDBs = new List<ConfigureDB>();
            try
            {
                using (SqlConnection con = new SqlConnection(_cuctomContext.Database.GetConnectionString()))
                {
                    using (SqlCommand com = new SqlCommand("USP_GetAllDBConfig"))
                    {
                        com.CommandType = CommandType.StoredProcedure;
                        com.Connection = con;
                        con.Open();
                        var reader=com.ExecuteReader();
                        while(reader.Read())
                        {
                            ConfigureDB configure = new ConfigureDB();
                            configure.DBName = reader[1].ToString();
                            configure.IPAddress = reader[2].ToString();
                            configure.HostName = reader[3].ToString();
                            configure.UserName = reader[4].ToString();
                            configure.Password = reader[5].ToString();
                            configure.MessageSent = reader[8].ToString();
                            configureDBs.Add(configure);
                        }
                        con.Close();
                    }
                    return configureDBs;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<Contact> GetBirthDay(string conn)
        {
            List<Contact> contacts = new List<Contact>();
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    using (SqlCommand com = new SqlCommand("USP_GetTodaysNotifications"))
                    {
                        com.CommandType = CommandType.StoredProcedure;
                        com.Connection = con;
                        com.Parameters.AddWithValue("@NoteType", "Birthday");
                        con.Open();
                        var reader = com.ExecuteReader();
                        while (reader.Read())
                        {
                            Contact contact = new Contact();
                            contact.MobileNo = reader[5].ToString();
                            contact.FullName = reader[1].ToString();
                            contact.BirthDate = Convert.ToDateTime(reader[3].ToString());
                            contacts.Add(contact);
                        }
                        con.Close();
                    }
                    return contacts;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public SmsSetting GetSmSSetting(string conn,string Mtype)
        {
            try
            {
                SmsSetting sms = null;
                using (SqlConnection con=new SqlConnection(conn))
                {
                    using(SqlCommand com=new SqlCommand("USP_GetSmsSettingbyId"))
                    {
                        com.CommandType = CommandType.StoredProcedure;
                        com.Connection = con;
                        com.Parameters.AddWithValue("@MType", Mtype);
                        con.Open();
                        var reader = com.ExecuteReader();
                        while(reader.Read())
                        {
                            sms =new SmsSetting();                          
                            sms.Url =(reader[1] == DBNull.Value)? " ": reader[1].ToString();
                            sms.UserName = (reader[2] == DBNull.Value)? " ": reader[2].ToString();
                            sms.Password = (reader[3] == DBNull.Value)? " ": reader[3].ToString();
                            sms.SenderId = (reader[4] == DBNull.Value)? " ": reader[4].ToString();
                            sms.Type = (reader[5] == DBNull.Value) ? 0 :Convert.ToInt32(reader[5]);
                            sms.Text = (reader[6] == DBNull.Value) ? " " : reader[6].ToString();
                            sms.PeId = (reader[7] == DBNull.Value) ? " " : reader[7].ToString();   
                        }
                    }
                }
                return sms;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<Contact> GetAnniversary(string conn)
        {
            List<Contact> contacts = new List<Contact>();
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    using (SqlCommand com = new SqlCommand("USP_GetTodaysNotifications"))
                    {
                        com.CommandType = CommandType.StoredProcedure;
                        com.Connection = con;
                        com.Parameters.AddWithValue("@NoteType", "Anniversary");
                        con.Open();
                        var reader = com.ExecuteReader();
                        while (reader.Read())
                        {
                            Contact contact = new Contact();
                            contact.MobileNo = reader[5].ToString();
                            contact.FullName = reader[1].ToString();
                            contact.Anniversary = Convert.ToDateTime(reader[4].ToString());
                            contacts.Add(contact);
                        }
                        con.Close();
                    }
                    return contacts;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }

    public class SchedulerTask
    {
        // private static  string ScheduleCronExpression = "0 0 18 * * ?";
        //private static string ScheduleCronExpression = "0 0 1 * * ?";
        private static string ScheduleCronExpression = "0 18 11 ? * * *";//"0 0 12 ? * * *";//30 2 * * * 
        // private static string ScheduleCronExpression = "0 0,00 0,19 ? * * *";
        public static async System.Threading.Tasks.Task StartAsync()
        {
            try
            {               
                var scheduler = await StdSchedulerFactory.GetDefaultScheduler();
                if (!scheduler.IsStarted)
                {
                    await scheduler.Start();
                }
                var job1 = JobBuilder.Create<Task1>().WithIdentity("ExecuteTaskServiceCallJob1", "group1").Build();
                var trigger1 = TriggerBuilder.Create().WithIdentity("ExecuteTaskServiceCallTrigger1", "group1").WithCronSchedule(ScheduleCronExpression).Build();
                await scheduler.ScheduleJob(job1, trigger1);
            }
            catch (Exception ex) 
            {
                var msg = ex.Message;
            }
        }       
    }
}
