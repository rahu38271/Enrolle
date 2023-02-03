using AutoMapper;
using ElectionAlerts.Repository;
using ElectionAlerts.Repository.Interface;
using ElectionAlerts.Repository.RepositoryClasses;
using ElectionAlerts.Services.Interface;
using ElectionAlerts.Services.ServiceClasses;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ElectionAlerts
{
    public class Startup
    {
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHostedService<Scheduler>();
            //services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = _configuration["Jwt:Issuer"],
                    ValidAudience = _configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"])),
                    ClockSkew = TimeSpan.Zero
                };
            });
            services.AddControllers();
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
            {
                builder
                .AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            }));


            services.AddScoped<IContactService, ContactService>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<INotificationService, NotificationService>();
            services.AddScoped<ISettingService, SettingService>();
            services.AddScoped<IExceptionLogService, ExceptionLogService>();
            services.AddScoped<IVoterService, VoterService>();
            services.AddScoped<IAssemblyService, AssemblyService>();
            services.AddScoped<IBoothService, BoothService>();
            services.AddScoped<IWardService, WardService>();
            services.AddScoped<ISuperAdminService, SuperAdminService>();
            services.AddScoped<IVillageService, VillageService>();

            services.AddScoped<IContactReposritory, ContactRepository>();
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<INotificationRepository, NotificationRepository>();
            services.AddScoped<ISettingRepository, SettingRepository>();
            services.AddScoped<IExceptionLogRepository, ExceptionLogRepository>(); 
            services.AddScoped<IVoterRepository, VoterRepository>();
            services.AddScoped<IAssemblyRepository, AssemblyRepository>();
            services.AddScoped<IBoothRepository, BoothRespository>();
            services.AddScoped<IWardRepository, WardRepository>();
            services.AddScoped<ISuperAdminRepository, SuperAdminRepository>();
            services.AddScoped<IVillageRepository, VillageRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseCors("MyPolicy");
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            //app.UseAuthorization();
            //app.UseAuthentication();
            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
