import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
  },
  {
    path: 'date',
    loadChildren: () => import('./date/date.module').then( m => m.DatePageModule),
  },
  {
    path: '',
    loadChildren: () => import('./login-module/login-module.module').then( m => m.LoginModuleModule)
  },
  {
    path: 'adminLogin',
    loadChildren: () => import('./admin-login-module/admin-login-module.module').then( m => m.AdminLoginModuleModule)
  },
  // {
  //   path: 'otp',
  //   loadChildren: () => import('./otp-module/otp-module.module').then( m => m.OtpModuleModule)
  // },
  {
    path: 'user',
    loadChildren: () => import('./user-module/user-module.module').then( m => m.UserModuleModule)
  },
  {
    path: 'daily-routine',
    loadChildren: () => import('./daily-routine-module/daily-routine-module.module').then( m => m.DailyRoutineModuleModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup-module/signup-module.module').then( m => m.SignupModuleModule)
  },
  {
    path: 'karyakarta',
    loadChildren:() => import ('./karyakarta-module/karyakarta-module.module').then(m => m.KaryakartaModuleModule)
  },
  {
    path:'officer-directory',
    loadChildren:() => import ( './officer-directory-module/officer-directory-module.module' ).then (m => m.OfficerDirectoryModuleModule)
  },
  {
    path:'other-directory',
    loadChildren:() => import ( './other-directory-module/other-directory-module.module' ).then (m => m.OtherDirectoryModuleModule)
  },
  {
    path:'daily-news',
    loadChildren:() => import ( './daily-news-module/daily-news-module.module' ).then (m => m.DailyNewsModuleModule)
  },
  {
    path:'journalist',
    loadChildren:() => import ( './journalist-module/journalist-module.module' ).then (m => m.JournalistModuleModule)
  },
  {
    path:'press-note',
    loadChildren:() => import ( './press-note-module/press-note-module.module' ).then (m => m.PressNoteModuleModule)
  },
  {
    path:'appointment',
    loadChildren:() => import ( './appointment-module/appointment-module.module' ).then (m => m.AppointmentModuleModule)
  },
  {
    path:'beneficiaries',
    loadChildren:() => import ( './beneficiaries-module/beneficiaries-module.module' ).then (m => m.BeneficiariesModuleModule)
  },
  {
    path:'personal-records',
    loadChildren:() => import ( './personal-records-module/personal-records-module.module' ).then (m => m.PersonalRecordsModuleModule)
  },
  {
    path:'govt-rules',
    loadChildren:() => import ( './govt-rules-module/govt-rules-module.module' ).then (m => m.GovtRulesModuleModule)
  },
  {
    path:'document-repository',
    loadChildren:() => import ( './document-repository-module/document-repository-module.module' ).then (m => m.DocumentRepositoryModuleModule)
  },
  {
    path:'voter-summary',
    loadChildren:() => import ( './voter-summary-module/voter-summary-module.module' ).then (m => m.VoterSummaryModuleModule)
  },
  {
    path:'voterdata-management',
    loadChildren:() => import ( './voterdata-management-module/voterdata-management-module.module' ).then (m => m.VoterdataManagementModuleModule)
  },
 
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'todays-birthday',
    loadChildren: () => import('./todays-birthday/todays-birthday.module').then( m => m.TodaysBirthdayPageModule)
  },
  {
    path: 'daily-work',
    loadChildren: () => import('./daily-work/daily-work.module').then( m => m.DailyWorkPageModule)
  },
  {
    path: 'daily-news',
    loadChildren: () => import('./daily-news/daily-news.module').then( m => m.DailyNewsPageModule)
  },
  {
    path: 'daily-routine',
    loadChildren: () => import('./daily-routine/daily-routine.module').then( m => m.DailyRoutinePageModule)
  },
  {
    path: 'inclination-report',
    loadChildren: () => import('./inclination-report/inclination-report.module').then( m => m.InclinationReportPageModule)
  },
  {
    path: 'caste-report',
    loadChildren: () => import('./caste-report/caste-report.module').then( m => m.CasteReportPageModule)
  },
  {
    path: 'political-party-report',
    loadChildren: () => import('./political-party-report/political-party-report.module').then( m => m.PoliticalPartyReportPageModule)
  },
  {
    path: 'occupation-report',
    loadChildren: () => import('./occupation-report/occupation-report.module').then( m => m.OccupationReportPageModule)
  },
  {
    path: 'voter-report',
    loadChildren: () => import('./voter-report/voter-report.module').then( m => m.VoterReportPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'mobile-match',
    loadChildren: () => import('./mobile-match-module/mobile-match-module.module').then( m => m.MobileMatchModuleModule)
  },
  {
    path: 'family-list',
    loadChildren: () => import('./family-list-module/family-list-module.module').then( m => m.FamilyListModuleModule)
  },
  {
    path: 'surname-list',
    loadChildren: () => import('./surname-list-module/surname-list-module.module').then( m => m.SurnameListModuleModule)
  },
  {
    path: 'caste-summary',
    loadChildren: () => import('./caste-summary/caste-summary.module').then( m => m.CasteSummaryPageModule)
  },
  {
    path: 'caste-all-summary',
    loadChildren: () => import('./caste-all-summary/caste-all-summary.module').then( m => m.CasteAllSummaryPageModule)
  },
  {
    path: 'caste-boothwise-summary',
    loadChildren: () => import('./caste-boothwise-summary/caste-boothwise-summary.module').then( m => m.CasteBoothwiseSummaryPageModule)
  },
  {
    path: 'voter-inclination-list',
    loadChildren: () => import('./voter-inclination-list/voter-inclination-list.module').then( m => m.VoterInclinationListPageModule)
  },
  {
    path: 'voter-inclination-all',
    loadChildren: () => import('./voter-inclination-all/voter-inclination-all.module').then( m => m.VoterInclinationAllPageModule)
  },
  {
    path: 'voter-inclination-boothwise',
    loadChildren: () => import('./voter-inclination-boothwise/voter-inclination-boothwise.module').then( m => m.VoterInclinationBoothwisePageModule)
  },
  {
    path: 'booth-coordinator',
    loadChildren: () => import('./booth-coordinator-module/booth-coordinator-module.module').then( m => m.BoothCoordinatorModuleModule)
  },
  {
    path: 'mobile-data',
    loadChildren: () => import('./mobile-data-module/mobile-data-module.module').then( m => m.MobileDataModuleModule)
  },
  {
    path: 'mobiledata-group',
    loadChildren: () => import('./mobiledata-group-module/mobiledata-group-module.module').then( m => m.MobiledataGroupModuleModule)
  },
  {
    path: 'assign-mobiledata',
    loadChildren: () => import('./assign-mobiledata-module/assign-mobiledata-module.module').then( m => m.AssignMobiledataModuleModule)
  },
  {
    path: 'view-mobileGroup',
    loadChildren: () => import('./view-mobile-group-module/view-mobile-group-module.module').then( m => m.ViewMobileGroupModuleModule)
  },
  {
    path: 'sms-voterlist',
    loadChildren: () => import('./sms-voterlist-module/sms-voterlist-module.module').then( m => m.SmsVoterlistModuleModule)
  },
  {
    path: 'view-reports',
    loadChildren: () => import('./sms-campaign-report-module/sms-campaign-report-module.module').then( m => m.SmsCampaignReportModuleModule)
  },
  {
    path: 'user-request',
    loadChildren: () => import('./user-request-module/user-request-module.module').then( m => m.UserRequestModuleModule)
  },
  {
    path: 'family-report',
    loadChildren: () => import('./family-report-module/family-report-module.module').then( m => m.FamilyReportModuleModule)
  },
  {
    path: 'dashboard1',
    loadChildren: () => import('./dashboard1/dashboard1.module').then( m => m.Dashboard1PageModule)
  },
  {
    path: 'survey',
    loadChildren: () => import('./survey-module/survey-module.module').then( m => m.SurveyModuleModule)
  },
  {
    path: 'mobile-dashboard',
    loadChildren: () => import('./mobile-dashboard/mobile-dashboard.module').then( m => m.MobileDashboardPageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list-module/list-module.module').then( m => m.ListModuleModule)
  },
  {
    path: 'today-anniversary',
    loadChildren: () => import('./today-anniversary/today-anniversary.module').then( m => m.TodayAnniversaryPageModule)
  },
  {
    path: 'booth',
    loadChildren: () => import('./booth/booth.module').then( m => m.BoothPageModule)
  },
  {
    path: 'non-voter',
    loadChildren: () => import('./non-voter-module/non-voter-module.module').then( m => m.NonVoterModuleModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact-module/contact-module.module').then( m => m.ContactModuleModule),
    //canActivate:[AuthGuard]
  },
  {
    path: 'letterhead',
    loadChildren: () => import('./letterhead-module/letterhead-module.module').then( m => m.LetterheadModuleModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting-module/setting-module.module').then( m => m.SettingModuleModule)
  },
  {
    path: 'password',
    loadChildren: () => import('./password-module/password-module.module').then( m => m.PasswordModuleModule)
  },

  {
    path: 'sms-report',
    loadChildren: () => import('./sms-report/sms-report.module').then( m => m.SmsReportPageModule)
  },
  {
    path: 'sms-campaign-report',
    loadChildren: () => import('./sms-campaign-report/sms-campaign-report.module').then( m => m.SmsCampaignReportPageModule)
  },
  {
    path: 'sms-delivery-report',
    loadChildren: () => import('./sms-delivery-report/sms-delivery-report.module').then( m => m.SmsDeliveryReportPageModule)
  },
  {
    path: 'sms-schedule-report',
    loadChildren: () => import('./sms-schedule-report/sms-schedule-report.module').then( m => m.SmsScheduleReportPageModule)
  },
  {
    path: 'sms-archieve-report',
    loadChildren: () => import('./sms-archieve-report/sms-archieve-report.module').then( m => m.SmsArchieveReportPageModule)
  },
  {
    path: 'sms-credit-history',
    loadChildren: () => import('./sms-credit-history/sms-credit-history.module').then( m => m.SmsCreditHistoryPageModule)
  },
  {
    path: 'event',
    loadChildren: () => import('./event-module/event-module.module').then( m => m.EventModuleModule)
  },
  {
    path: 'pin',
    loadChildren: () => import('./pin-module/pin-module.module').then( m => m.PinModuleModule)
  },
  {
    path: 'otp',
    loadChildren: () => import('./otp-module/otp-module.module').then( m => m.OtpModuleModule)
  },
  {
    path: 'yojna',
    loadChildren: () => import('./yojna-module/yojna-module.module').then( m => m.YojnaModuleModule)
  },
  {
    path: 'assembly',
    loadChildren: () => import('./assembly-module/assembly-module.module').then( m => m.AssemblyModuleModule)
  },
  {
    path: 'Booth',
    loadChildren: () => import('./booth-module/booth-module.module').then( m => m.BoothModuleModule)
  },
  {
    path: 'ward',
    loadChildren: () => import('./ward-module/ward-module.module').then( m => m.WardModuleModule)
  },
  {
    path: 'db',
    loadChildren: () => import('./db-module/db-module.module').then( m => m.DbModuleModule)
  },
  {
    path: 'superadmin',
    loadChildren: () => import('./superadmin-module/superadmin-module.module').then( m => m.SuperadminModuleModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    //RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload' }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
