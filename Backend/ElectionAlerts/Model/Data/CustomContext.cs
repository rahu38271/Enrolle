﻿using System;
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
                MasterDBconstr = "Server=184.168.194.78;Database=EnrolleMasterQA;User Id=EnrolleMasterQA; Password=EnrolleMasterQA@123;pooling=false;";

                
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
        public DbSet<VoterDTO> VoterDTOs { get; set; }
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

         
            string ElectionAlertconstr;

            if (!optionsBuilder.IsConfigured)
            {
              
                ElectionAlertconstr = Startup.ElectionAlertConStr;
                optionsBuilder.UseSqlServer(ElectionAlertconstr, x => x.EnableRetryOnFailure());
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
        public DbSet<VoterDTO> VoterDTOs { get; set; }
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
            modelBuilder.Entity<VoterDTO>().HasNoKey();
            modelBuilder.Entity<DistrictDashboard>().HasNoKey();
            modelBuilder.Entity<AssemblyDashboard>().HasNoKey();
            modelBuilder.Entity<AppointmentDTO>().HasNoKey();
        }
    }
}
