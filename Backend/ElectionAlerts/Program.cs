using ElectionAlerts.Repository;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts
{
    public class Program
    {
        private static TimeZoneInfo INDIAN_ZONE = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
        public static void Main(string[] args)
        {
            //Scheduler s = new Scheduler();
            //s.schedule_Timer();
            //CallingMyMethodEveryTenSecond();
            //while (true)
            //{
            //    DoSomething();
            //}
          
            CreateHostBuilder(args).Build().Run();
        }

        private static void CallingMyMethodEveryTenSecond()
        {
            var startTimeSpan = TimeSpan.Zero;
            var periodTimeSpan = TimeSpan.FromSeconds(10);

            var timer = new System.Threading.Timer((e) =>
            {
                MyMethod();
            }, null, startTimeSpan, periodTimeSpan);
        }

        private static void MyMethod()
        {
            Console.WriteLine("may i interrupt you each 10 second ?");
        }

        private static void DoSomething()
        {
            Console.WriteLine("Doing something");
            var nowTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, INDIAN_ZONE);
            DateTime scheduledTime = new DateTime(nowTime.Year, nowTime.Month, nowTime.Day, 23, 14, 0, 0, DateTimeKind.Utc);
            TimeSpan nowtime = new TimeSpan(nowTime.Hour, nowTime.Minute, nowTime.Second);
            TimeSpan schtime = new TimeSpan(scheduledTime.Hour, scheduledTime.Minute, scheduledTime.Second);
            double tickTime = (schtime - nowtime).TotalMilliseconds;
            if(tickTime< 0)
            {
                tickTime = (nowtime).TotalMilliseconds;
            }
            System.Threading.Thread.Sleep(1000);
        }
        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();            
                });
    }
}
