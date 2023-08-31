using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using ElectionAlerts.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace ElectionAlerts.Model.Data
{

    //This Context class is for Master database only
    public class MasterCustomContext : DbContext
    {

        private readonly IHttpContextAccessor _httpContextAccessor;
        public MasterCustomContext()
        {

        }
        public MasterCustomContext(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

            
            string MasterDBconstr;

            if (!optionsBuilder.IsConfigured)
            {
                 // MasterDBconstr = "Server=184.168.194.78;Database=EnrolleMasterQA;User Id=EnrolleMasterQA; Password=EnrolleMasterQA@123;pooling=false;";
                  MasterDBconstr = "Server=45.249.108.42;Database=EnrolleMasterQA;User Id=EnrolleMasterQA; Password=EnrolleMasterQA@123;pooling=false;";

                optionsBuilder.UseSqlServer(MasterDBconstr, x => x.EnableRetryOnFailure());
            }
        }
        public DbSet<Village> Villages { get; set; }
        public DbSet<Contact> Contact { get; set; }
        public DbSet<User> UsersDetails { get; set; }
        public DbSet<Voter> Voter { get; set; }
        public DbSet<Districts> Districts { get; set; }
        public DbSet<Taluka> Talukas { get; set; }
        public DbSet<Assembly> Assemblys { get; set; }
        public DbSet<Booth> Booths { get; set; }
        public DbSet<Ward> Wards { get; set; }
        public DbSet<SuperAdmin> SuperAdmins { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<MemberDetail> MemberDetails { get; set; }
        public DbSet<GetVoterByPartNo> VoterDTOs { get; set; }
        public DbSet<Table> Tables { get; set; }
        public DbSet<UserAssigned> UserAssigneds { get; set; }
        public DbSet<VoterCount> VoterCounts { get; set; }
        public DbSet<VoterAssembly> VoterAssemblies { get; set; }
        public DbSet<VoterbyBooth> VoterbyBooths { get; set; }
        public DbSet<VoterPPBooth> VoterPPBooths { get; set; }
        public DbSet<UserDetail> UserDetails { get; set; }
        public DbSet<VoterInclination> VoterInclinations { get; set; }
        public DbSet<BoothName> BoothNames { get; set; }
        public DbSet<ConfigureDB> ConfigureDBs { get; set; }
        public DbSet<PartNoAssigned> PartNoAssigneds { get; set; }
        public DbSet<AdminUser> AdminUsers { get; set; }
        public DbSet<WhatUpSetting> WhatUpSettings { get; set; }
       
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Districts>().HasNoKey();
            modelBuilder.Entity<Taluka>().HasNoKey();
            modelBuilder.Entity<Table>().HasNoKey();
            modelBuilder.Entity<UserAssigned>().HasNoKey();
            modelBuilder.Entity<VoterCount>().HasNoKey();
            modelBuilder.Entity<VoterPPBooth>().HasNoKey();
            modelBuilder.Entity<VoterbyBooth>().HasNoKey();
            modelBuilder.Entity<VoterInclination>().HasNoKey();
            modelBuilder.Entity<BoothName>().HasNoKey();
            modelBuilder.Entity<PartNoAssigned>().HasNoKey();

        }
    }


    // THis context for Election alert Data base which is multiple 
    public class CustomContext : DbContext
    {

        private readonly IHttpContextAccessor _httpContextAccessor;
        public CustomContext()
        {

        }
        public CustomContext(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string constr=null;
            var identity = _httpContextAccessor.HttpContext.User.Identity as ClaimsIdentity;
            if (identity.Claims.Count() > 0)
            {
                IEnumerable<Claim> claims = identity.Claims;
                foreach (var c in claims)
                {
                    if (c.Type.Contains("name"))
                        constr = c.Value;
                }
            }

            if (!optionsBuilder.IsConfigured)
            {
                var username = _httpContextAccessor.HttpContext.User.Identity.Name;
                //var storedData = _httpContextAccessor.HttpContext.Session.GetString(username);
                // ElectionAlertconstr = Startup.ElectionAlertConStr;
                //ElectionAlertconstr = storedData;
                // optionsBuilder.UseSqlServer(ElectionAlertconstr, x => x.EnableRetryOnFailure());
                optionsBuilder.UseSqlServer(constr, x => x.EnableRetryOnFailure());
            }
        }
        public DbSet<VoterAddress> VoterAddresses { get; set; }
        public DbSet<VoterMobile> VoterMobiles { get; set; }
        public DbSet<Village> Villages { get; set; }
        public DbSet<Contact> Contact { get; set; }
        public DbSet<User> UsersDetails { get; set; }
        public DbSet<Voter> Voter { get; set; }
        public DbSet<Districts> Districts { get; set; }
        public DbSet<Taluka> Talukas { get; set; }
        public DbSet<Assembly> Assemblys { get; set; }
        public DbSet<Booth> Booths { get; set; }
        public DbSet<Ward> Wards { get; set; }
        public DbSet<SuperAdmin> SuperAdmins { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<MemberDetail> MemberDetails { get; set; }
        public DbSet<GetVoterByPartNo> VoterDTOs { get; set; }
        public DbSet<Table> Tables { get; set; }
        public DbSet<UserAssigned> UserAssigneds { get; set; }
        public DbSet<VoterCount> VoterCounts { get; set; }
        public DbSet<VoterAssembly> VoterAssemblies { get; set; }
        public DbSet<VoterbyBooth> VoterbyBooths { get; set; }
        public DbSet<VoterPPBooth> VoterPPBooths { get; set; }
        public DbSet<UserDetail> UserDetails { get; set; }
        public DbSet<VoterInclination> VoterInclinations { get; set; }
        public DbSet<BoothName> BoothNames { get; set; }
        public DbSet<ConfigureDB> ConfigureDBs { get; set; }
        public DbSet<PartNoAssigned> PartNoAssigneds { get; set; }
        public DbSet<AdminUser> AdminUsers { get; set; }
        public DbSet<WhatUpSetting> WhatUpSettings { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Annapurna> Annapurnas { get; set; }
        public DbSet<NewVoter> NewVoters { get; set; }
        public DbSet<Society> Societies { get; set; }
        public DbSet<Family> Families { get; set; }
        public  DbSet<DistrictDashboard> districtDashBords { get; set; }
        public DbSet<AssemblyDashboard> assemblyDashboards { get; set; }
        public DbSet<AppointmentDTO> AppointmentDTOs { get; set; }
        public DbSet<Mobile> Mobiles { get; set; }
        public DbSet<LastNameCount> LastNameCounts { get; set; }
        public DbSet<Caste> Castes { get; set; }
        public DbSet<CastebyLanguage> CastebyLanguages { get; set; }
        public DbSet<AppointmentCount> AppointmentCounts { get; set; }
        public DbSet<AppointmentCountbyUser> AppointmentCountbyUsers { get; set; }
        public DbSet<ContactwithCount> ContactwithCounts { get; set; }
        public DbSet<VoterMobileNo> VoterMobileNos { get; set; }
        public DbSet<SocietyComplaint> SocietyComplaints { get; set; }
        public DbSet<ComplaintCount> ComplaintCounts { get; set; }
        public DbSet<SocietyDTO> SocietyDTOs { get; set; }
        public DbSet<SocietyComplaintDTO> SocietyComplaintDTOs { get; set; }
        public DbSet<ActivityLog> ActivityLogs { get; set; }
        public  DbSet<ActivityLogDTO> ActivityLogDTOs { get; set; }
        public DbSet<ActivityLogCountDTO> ActivityLogCountDTOs { get; set; }
        public DbSet<DailyNews> DailyNews { get; set; }
        public DbSet<ActivityLogCount> activityLogCounts { get; set; }
        public DbSet<DailyNewsDTO> dailyNewsDTOs { get; set; }
        public DbSet<VoterDTOPartNo> VoterDTOPartNos { get; set; }
        public DbSet<Area> Areas { get; set; }
        public DbSet<TypeOfComplaint> TypeOfComplaints { get; set; }
        public DbSet<TypeOfForm> TypeOfForms { get; set; }
        public DbSet<TypeofWork> TypeofWorks { get; set; }
        public DbSet<GeneralEnquiry> GeneralEnquiries { get; set; }
        public DbSet<GeneralEnquiryDTO> generalEnquiryDTOs { get; set; }
        public DbSet<Profession> Professions { get; set; }
        public DbSet<LandingPage> LandingPages { get; set; }
        public DbSet<WhatAppContent> whatAppContents { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Districts>().HasNoKey();
            modelBuilder.Entity<Taluka>().HasNoKey();
            modelBuilder.Entity<Table>().HasNoKey();
            modelBuilder.Entity<UserAssigned>().HasNoKey();
            modelBuilder.Entity<VoterCount>().HasNoKey();
            modelBuilder.Entity<VoterPPBooth>().HasNoKey();
            modelBuilder.Entity<VoterbyBooth>().HasNoKey();
            modelBuilder.Entity<VoterInclination>().HasNoKey();
            modelBuilder.Entity<BoothName>().HasNoKey();
            modelBuilder.Entity<PartNoAssigned>().HasNoKey();
            modelBuilder.Entity<GetVoterByPartNo>().HasNoKey();
            modelBuilder.Entity<DistrictDashboard>().HasNoKey();
            modelBuilder.Entity<AssemblyDashboard>().HasNoKey();
            modelBuilder.Entity<AppointmentDTO>().HasNoKey();
            modelBuilder.Entity<LastNameCount>().HasNoKey();
            modelBuilder.Entity<CastebyLanguage>().HasNoKey();
            modelBuilder.Entity<AppointmentCount>().HasNoKey();
            modelBuilder.Entity<AppointmentCountbyUser>().HasNoKey();
            modelBuilder.Entity<VoterMobileNo>().HasNoKey();
            modelBuilder.Entity<ComplaintCount>().HasNoKey();
            modelBuilder.Entity<ActivityLogCountDTO>().HasNoKey();
            modelBuilder.Entity<ActivityLogCount>().HasNoKey();
          
        }
    }
}
