using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Timers;
using ElectionAlerts.Model;
using ElectionAlerts.Repository.Interface;
using ElectionAlerts.Repository.RepositoryClasses;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace ElectionAlerts.Repository
{
    public class Scheduler: BackgroundService
    {
        private IConfiguration _configuration;
        private IHostEnvironment hostEnvironment;
        public Scheduler(IConfiguration configuration, IHostEnvironment env)
        {
            _configuration = configuration;
             hostEnvironment = env;
        }
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            try
            {
                string schTime = _configuration.GetSection("SchedularTime").Value;
                int refreshTimeMs = Convert.ToInt32(_configuration.GetSection("refreshTimeMs").Value);//43200000; //How much delay you want
                while (!stoppingToken.IsCancellationRequested)
                {
                    LogWrite("while");
                    LogWrite("System date: " + TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, INDIAN_ZONE).Hour + " " + TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, INDIAN_ZONE).Minute);
                    LogWrite("Schedule date: " + Convert.ToInt32(schTime.Split(":")[0]) + " " + Convert.ToInt32(schTime.Split(":")[1]));


                    if (TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, INDIAN_ZONE).Hour == Convert.ToInt32(schTime.Split(":")[0]))//&& TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, INDIAN_ZONE).Minute == Convert.ToInt32(schTime.Split(":")[1]))
                    {
                        LogWrite(TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, INDIAN_ZONE).Hour + " IF");

                        NotificationRepository _notificationRepository = new NotificationRepository();
                        var BirthdayList = _notificationRepository.GetTodaysNotifications("Birthday");
                        var AnniversaryList = _notificationRepository.GetTodaysNotifications("Anniversary");
                        //call your function here
                        foreach (var contact in BirthdayList)
                        {
                             SentBirthdaymsg(contact);
                        }

                        foreach (var contact in AnniversaryList)
                        {
                            SentAnniversarymsg(contact);
                        }
                    }
                    await Task.Delay(refreshTimeMs, stoppingToken);
                }
            }
            catch(Exception ex)
            {
                LogWrite("ERROR :" + "Message : "+ ex.Message + "  InnerException : " + ex.InnerException + " Source : "+ ex.Source+ " Stack : "+ex.StackTrace);
            }
      }

         private static TimeZoneInfo INDIAN_ZONE = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
         private System.Timers.Timer Timer;

        public void LogWrite(string logMessage)
        {
            var fileName = Path.GetFileName("log.txt");
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot", fileName);

            try
            {
                using (StreamWriter w = File.AppendText(filePath ))
                {
                    Log(logMessage, w);
                }
            }
            catch (Exception ex)
            {
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
            }
        }
        // public void Send_Birthday_Msg(object sender, ElapsedEventArgs e)
        //{
        //     Timer.Stop();

        //     NotificationRepository _notificationRepository = new NotificationRepository();
        // var Current_date = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, INDIAN_ZONE); 
        //   //  var Current_day = DateTime.Now.Day;


        //    var BirthdayList= _notificationRepository.GetTodaysNotifications("Birthday");
        //     var AnniversaryList=_notificationRepository.GetTodaysNotifications("Anniversary");


        //     foreach (var contact in BirthdayList)
        //     {
        //         SentBirthdaymsg(contact);
        //     }

        //     foreach (var contact in AnniversaryList)
        //     {
        //         SentAnniversarymsg(contact);
        //     }



        //     //schedule_Timer();
        // }

        private void SentBirthdaymsg(Contact contact)
        {
          
                var Current_date = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, INDIAN_ZONE);
                DateTime candidate1 = Convert.ToDateTime(contact.BirthDate);
                if (candidate1.Day == Current_date.Day && candidate1.Month == Current_date.Month)
                {
                    WebClient web = new WebClient();
                    string msg = "http://45.114.143.189/api/mt/SendSMS?username=prolittechnologies&password=prolit3214&senderid=Prolit&type=8&destination=" + contact.MobileNo + "&text=प्रिय " + contact.FullName + ", आपणास जन्मदिवसानिमित्त्य मनःपूर्वक हार्दिक शुभेच्छा. Prolit Technologies.&peid=1301165123633080685";
                    web.OpenRead(msg);
                    LogWrite("Send BirthDay SMS");
                }
            
        }

        private void SentAnniversarymsg(Contact contact)
        {
            try
            {

                var Current_date = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, INDIAN_ZONE);
                DateTime candidate1 = Convert.ToDateTime(contact.Anniversary);
                if (candidate1.Day == Current_date.Day && candidate1.Month == Current_date.Month)
                {
                    WebClient web = new WebClient();
                    string msg = "http://45.114.143.189/api/mt/SendSMS?username=prolittechnologies&password=prolit3214&senderid=Prolit&type=8&destination=" + contact.MobileNo + "&text=प्रिय " + contact.FullName + ", आपणास Anniverssary मनःपूर्वक हार्दिक शुभेच्छा. Prolit Technologies.&peid=1301165123633080685";
                    web.OpenRead(msg);
                    LogWrite("Send Aniversary SMS");
                }
            }
            catch(Exception ex)
            {
                var msg = ex.Message;
                LogWrite("Error in Annivaersary : " + ex.Message);
            }
            
        }

        // public void schedule_Timer()
        // {
        //    // DateTime nowTime = DateTime.Now;
        //     var nowTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, INDIAN_ZONE);

        //     DateTime scheduledTime = new DateTime(nowTime.Year, nowTime.Month, nowTime.Day, 23, 14, 0, 0,DateTimeKind.Utc); //Specify your scheduled time HH,MM,SS [8am and 42 minutes]
        //     //if (nowTime > scheduledTime)
        //     //{
        //     //    scheduledTime = scheduledTime.AddDays(1);  //current time greater than scheduled time then add one day
        //     //}
        //     string now= nowTime.Hour.ToString() + nowTime.Minute.ToString();
        //     double nowdouble = Convert.ToDouble(nowTime.Hour.ToString() + "." + nowTime.Minute.ToString());
        //     string sch = scheduledTime.Hour.ToString() + nowTime.Minute.ToString();
        //     double schdouble = Convert.ToDouble(scheduledTime.Hour.ToString() + "." + scheduledTime.Minute.ToString());

        //     TimeSpan nowtime = new TimeSpan(nowTime.Hour, nowTime.Minute, nowTime.Second); 
        //     TimeSpan schtime = new TimeSpan(scheduledTime.Hour, scheduledTime.Minute, scheduledTime.Second);
        //     double tickTime = (schtime - nowtime).TotalMilliseconds;
        //     if (tickTime < 0 && tickTime > -1 && nowdouble == schdouble) {
        //         Timer = new System.Timers.Timer(2);
        //         Timer.Elapsed += new ElapsedEventHandler(Send_Birthday_Msg);
        //         Timer.Start();
        //     }
        //     else if(tickTime < 0 && tickTime > -1)
        //     {
        //         Timer = new System.Timers.Timer(tickTime);
        //         Timer.Elapsed += new ElapsedEventHandler(Send_Birthday_Msg);
        //         Timer.Start();
        //     }

        //     Timer = new System.Timers.Timer(tickTime);
        //     Timer.Start();
        //     //Timer.Elapsed += new ElapsedEventHandler(Send_Birthday_Msg);  //set intervales



        // }


    }
}


