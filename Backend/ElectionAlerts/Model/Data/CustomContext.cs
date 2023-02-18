using System;
using System.Collections.Generic;
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
    public class CustomContext : DbContext
    {    
       protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json");
                var config = builder.Build();
                var connectionString = config.GetConnectionString("DBCon");
                //constr = "Server=184.168.194.78;Database=ElectionAlertsQa;User Id=ElectionAlerts; Password=ElectionAlerts@1112;pooling=false;";
                optionsBuilder.UseSqlServer(connectionString, x => x.EnableRetryOnFailure());               
            }
        }
        public DbSet<Village> Villages { get; set; }
        public DbSet<Contact> Contact { get; set; }
        public DbSet<User> User { get; set; }
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
            modelBuilder.Entity<User>().HasNoKey();
        }
    }
}
