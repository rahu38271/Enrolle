import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class VoterService {

  token:String=''

  url = environment.apiUrl
 
  constructor(private http:HttpClient) {
    this.token = localStorage.getItem('token');
   }

  // all voterlist 

  getAllVoter():Observable<any>{
    return this.http.get<any>(this.url+'Voter/GetAllVoter');
  }

  // voter by user id
  
  getVoterByUser(id:any,RoleId:any,PageNo:any,NoofRow:any,Language:any,SearchText:any):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    //return this.http.get<any[]>(this.url+'Voter/GetAllVoter?UserId='+id+'&RoleId='+RoleId+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language)
    return this.http.get<any[]>(this.url+'Voter/GetAllVoter?UserId='+id+'&RoleId='+RoleId+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language+'&SearchText='+SearchText,{ headers })
  }


  // total voter count by user
  getVoterCountByUser(id:number,RoleId:number){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Voter/GetTotalVoterCount?userid='+id+'&roleid='+RoleId,{ headers })
  }

  addSingleVoter(addVoterModal:any):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any>(this.url+'Voter/InsertVoter', addVoterModal,{ headers })
  }

  uploadExcel(modal:any):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any>(this.url+'Voter/InsertBulkVoter', modal,{ headers })
  }

  update(editVoter:any){
    debugger;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any>(this.url+"Voter/UpadateVoter", editVoter,{ headers });
  }

  // get list by family

  getByRelation(id:any,userId:number,roleID:any,pageNo:any,NoofRow:any,Language:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any[]>(this.url+'Voter/GetVoterbyRelation?Id='+id+'&UserId='+userId+'&RoleId='+roleID+'&PageNo='+pageNo+'&NoofRow='+NoofRow+'&Language='+Language,{ headers });
    
  }

  // update voter mobile number from android

  updateMob(id:any, Mobile:string){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any>(this.url+'Voter/UpdateMobileVoter?Id='+id+'&Mobile='+Mobile+'',id,{ headers })
  }

  // update voter alternate mobile number from android

  updateAltMob(id:any, AltMobile:string){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any>(this.url+'Voter/UpdateAltMobileVoter?Id='+id+'&AlternateMobileNo='+AltMobile+'',id,{ headers })
  }

  updateStar(id:any, YesNo:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any>(this.url+'Voter/UpdateStarVoter?Id='+id+'&YesNo='+YesNo+'', id,{ headers })
  }

  // update voter colour

  updateColor(id:any, color:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any>(this.url+'Voter/UpdateVoterInclination?Id='+id+'&Colour='+color+'', id,{ headers })
  }

  // update voter address from android

  updateAdrs(id:any, address:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any>(this.url+'Voter/UpdateAddressVoter?Id='+id+'&Address='+address+'', id,{ headers })
  }

  // voted status update

  updateVotedStatus(id:any, YesNo:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any>(this.url+'Voter/UpdateIsVoted?Id='+id+'&YesNo='+YesNo, id,{ headers })
  }

  // dead or alive update

  updateAliveDead(id:any, YesNo:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any>(this.url+'Voter/UpdateIsAliveVoter?Id='+id+'&YesNo='+YesNo, id,{ headers })
  }

  // update profession

  updateProfession(id:any, ColoumnName:any, ColoumnValue:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any>(this.url+'Voter/UpdateColoumnTBLVoter?Id='+id+'&ColoumnName='+ColoumnName+'&ColoumnValue='+ColoumnValue, id,{ headers })
  }

  // update DoB

  updateDoB(id:any, ColoumnName:any, ColoumnValue:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any>(this.url+'Voter/UpdateColoumnTBLVoter?Id='+id+'&ColoumnName='+ColoumnName+'&ColoumnValue='+ColoumnValue, id,{ headers })
  }

  // update caste

  updateCaste(id:any, ColoumnName:any, ColoumnValue:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any>(this.url+'Voter/UpdateColoumnTBLVoter?Id='+id+'&ColoumnName='+ColoumnName+'&ColoumnValue='+ColoumnValue, id,{ headers })
  }

  // add caste
  addSingleCaste(casteModal:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any>(this.url+'Voter/InsertCaste',casteModal,{ headers })
  }

  // get Cast 

  getAllCaste(Language:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    //return this.http.get<any>(this.url+'Voter/GetAllCasteName')
    return this.http.get<any>(this.url+'Voter/GetAllCasteName?Language='+Language,{ headers })
  }

  // get profession

  getAllProfession(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Voter/GetAllProfession',{ headers })
  }

  // village name and count

  villagedata(vilModal:any):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any>(this.url+'Voter/FilterColoumnCount', vilModal,{ headers });
  }

  // address and count

  addressData(addrsModal:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any>(this.url+'Voter/FilterColoumnCount', addrsModal,{ headers })
  }

  // part no. and count

  partNoData(partModal:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any>(this.url+'Voter/FilterColoumnCount', partModal,{ headers })
  }

  // occupatioin and count

  occupaionData(occupModal:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any>(this.url+'Voter/FilterColoumnCount', occupModal,{ headers })
  }

   // caste and count

  CastData(castModal:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any>(this.url+'Voter/FilterColoumnCount',castModal,{ headers })
  }

   // society and count

   SociData(sociModal:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any>(this.url+'Voter/FilterColoumnCount',sociModal,{ headers })
  }

  // filter / search voter by condition

  filterVoterByCondition(filterModal:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any>(this.url+'Voter/FilterVoterbyCondition',filterModal,{ headers })
  }


  // Imp Voter Data

  impVoter(userId:any,roleID:any,PageNo:any,NoofRow:any,Language:any,SearchText:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Voter/GetStarVoterbyUserId?UserId='+userId+'&RoleId='+roleID+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language+'&SearchText='+SearchText,{ headers });
  }

  // lastname and count

  lastNameData(userid:number,roleID:number,PageNo:number,NoofRow:number,Language:any,SearchText:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    //return this.http.get<any>(this.url+'Voter/GetVoterCountbyLastName?userid='+userid+'&RoleId='+roleID+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language);
    return this.http.get<any>(this.url+'Voter/GetVoterCountbyLastName?userid='+userid+'&roleid='+roleID+'&pageno='+PageNo+'&noofrow='+NoofRow+'&Language='+Language+'&SearchText='+SearchText,{ headers });
  }

  // all voter by lastname

  voterByLastName(lastName:any, userid:number,roleID:number,PageNo:number,NoofRow:number,Language:any,SearchText:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Voter/VoterDetailsbyLastName?Name='+lastName+'&UserId='+userid+'&RoleId='+roleID+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language+'&SearchText='+SearchText,{ headers });
  }

  // all voter by villages

  voterByVillage(villageName:any, userId:number,roleID:number,PageNo:number,NoofRow:number,Language:any,SearchText:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    //return this.http.get<any>(this.url+'Voter/VoterDetailsbyColumn?ColoumnName=Village&ColoumnValue='+villageName+'&UserId='+userId+'&RoleId='+roleID+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language);
    return this.http.get<any>(this.url+'Voter/VoterDetailsbyColumn?ColoumnName=Village&ColoumnValue='+villageName+'&UserId='+userId+'&RoleId='+roleID+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language+'&SearchText='+SearchText,{ headers });
  }

  // all voter by address

  voterByAddress(addressName:any,userId:number, roleID:number,PageNo:number,NoofRow:number,Language:any,SearchText:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Voter/VoterDetailsbyColumn?ColoumnName=Address&ColoumnValue='+addressName+'&UserId='+userId+'&RoleId='+roleID+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language+'&SearchText='+SearchText,{ headers })
  }

   // all voter by part no

   voterByPart(partNumber:number,userId:number,roleID:number,PageNo:number,NoofRow:number,Language:any,SearchText:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Voter/VoterDetailsbyColumn?ColoumnName=PartNo&ColoumnValue='+partNumber+'&UserId='+userId+'&RoleId='+roleID+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language+'&SearchText='+SearchText,{ headers })
  }

  // voter by Caste

  voterByCaste(Caste:number,userId:number,roleID:number,PageNo:number,NoofRow:number,Language:any,SearchText:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Voter/VoterDetailsbyColumn?ColoumnName=Caste&ColoumnValue='+Caste+'&UserId='+userId+'&RoleId='+roleID+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language+'&SearchText='+SearchText,{ headers })
  }

  // voter by occupation / profession

  voterByProf(occupation:number,userId:number,roleID:number,PageNo:number,NoofRow:number,Language:any,SearchText:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Voter/VoterDetailsbyColumn?ColoumnName=Occupation&ColoumnValue='+occupation+'&UserId='+userId+'&RoleId='+roleID+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language+'&SearchText='+SearchText,{ headers })
  }

  // add profession

  // addProf(ProfessionName:any){
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${this.token}`
  //   });
  //   return this.http.post<any>(this.url+'Voter/InsertProfession?ProfessionName='+ProfessionName,{ headers })
  // }

  addProf(profModal: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any>(this.url + 'Voter/InsertProfession', profModal, { headers })
  }

  // voter by Society

  voterBySoci(society:number,userId:number,roleID:number,PageNo:number,NoofRow:number,Language:any,SearchText:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Voter/VoterDetailsbyColumn?ColoumnName=Society&ColoumnValue='+society+'&UserId='+userId+'&RoleId='+roleID+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language+'&SearchText='+SearchText,{ headers })
  }

  // advance search voter

  advanceSearch(searchModal:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any>(this.url+'Voter/AdvancedSearchVoter', searchModal,{ headers })
  }

  // advanced search file download
  getAdvancedSearchFile(searchModal:any):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post(this.url+'Voter/AdvancedSearchVoterFile',searchModal,{ headers,responseType:"text", reportProgress:true })
  }

  updateSociety(id:any, ColoumnName:any, ColoumnValue:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any>(this.url+'Voter/UpdateColoumnTBLVoter?Id='+id+'&ColoumnName='+ColoumnName+'&ColoumnValue='+ColoumnValue, id,{ headers })
  }

  updateHouse(id:any, ColoumnName:any, ColoumnValue:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any>(this.url+'Voter/UpdateColoumnTBLVoter?Id='+id+'&ColoumnName='+ColoumnName+'&ColoumnValue='+ColoumnValue, id,{ headers })
  }

  // all voter with Mobile

  voterWithMobile(userId:number,roleID:number,PageNo:number,NoofRow:number,Language:any,SearchText:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Voter/VoterwithMobileNo?UserId='+userId+'&RoleId='+roleID+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language+'&SearchText='+SearchText,{ headers });
  }

  // boothwise voter count

  boothWiseVoterCount(userID:number,roleID:number){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Voter/VoterCountbyBooth?userid='+userID+'&roleid='+roleID,{ headers });
  }

  // boothwise voter list

  boothWiseVoterList(partNo:number,PageNo:number,NoofRow:number,Language:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Voter/GetVoterbyPartNo?partno='+partNo+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language,{ headers })
  }

  // all voter by age

  voterBetweenAge(age1:number, age2:number, gender:string, userId:number, roleID:number,PageNo:number,NoofRow:number,Language:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Voter/GetVoterBetweenAge?age1='+age1+'&age2='+age2+'&gender='+gender+'&UserId='+userId+'&roleid='+roleID+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language,{ headers });
  }

  // search voter for web view

  searchVoter(searchModal:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any>(this.url+'Voter/FilterVoterList', searchModal,{ headers })
  }

  // voter by color

  getVoterByColor(userId:number,roleID:number){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Voter/GetVoterInclination?UserId='+userId+'&RoleId='+roleID,{ headers })
    
  }

  // supporter voter list

  supporter(userId:number,roleID:number,PageNo:number,NoofRow:number,Language:any,SearchText:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Voter/GetVoterInclinationUserId?Inclination=Supporter&UserId='+userId+'&RoleId='+roleID+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language+'&SearchText='+SearchText,{ headers })
  }

  // opposition voter list

  opposition(userId:number, roleID:number,PageNo:number,NoofRow:number,Language:any,SearchText:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Voter/GetVoterInclinationUserId?inclination=Opposition&UserId='+userId+'&RoleId='+roleID+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language+'&SearchText='+SearchText,{ headers });
  }

  // doubtful voter list

  doubtful(userId:number, roleID:number,PageNo:number,NoofRow:number,Language:any,SearchText:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Voter/GetVoterInclinationUserId?inclination=Doubtful&UserId='+userId+'&RoleId='+roleID+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language+'&SearchText='+SearchText,{ headers });
  }

  // other voter list

  other(userId:number,roleID:number,PageNo:number,NoofRow:number,Language:any,SearchText:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Voter/GetVoterInclinationUserId?inclination=Other&UserId='+userId+'&RoleId='+roleID+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language+'&SearchText='+SearchText,{ headers });
  }

  // is voted / non-voted
  getIsVoted(UserId:number, RoleId:number, Coloumn:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Voter/GetColoumncount?UserId='+UserId+'&RoleId='+RoleId+'&Coloumn='+Coloumn,{ headers })
  }

  // is Dead / Alive
  getIsAlive(UserId:number, RoleId:number, Coloumn:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Voter/GetColoumncount?UserId='+UserId+'&RoleId='+RoleId+'&Coloumn='+Coloumn,{ headers })
  }

  // is slip printed or not count

  getIsPrinted(UserId:any,RoleId:any,Coloumn:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Voter/GetColoumncount?UserId='+UserId+'&RoleId='+RoleId+'&Coloumn='+Coloumn,{ headers })
  }

  // printed slip list

  getSlipData(ColoumnName:any, ColoumnValue:any, UserId:any, RoleId:any, PageNo:any, NoofRow:any, Language:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Voter/VoterDetailsbyColumn?ColoumnName='+ColoumnName+'&ColoumnValue='+ColoumnValue+'&UserId='+UserId+'&RoleId='+RoleId+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language,{ headers })
  }

  //delete voter
  deleteVoter(voterId:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Voter/DeleteVoterbyId?Id='+voterId,{ headers })
  }

  // voted voter

  getvoterVoted(userId:number,roleID:number,PageNo:number,NoofRow:number,Language:any,SearchText:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Voter/VoterDetailsbyColumn?ColoumnName=isVoted&ColoumnValue=Y&UserId='+userId+'&RoleId='+roleID+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language+'&SearchText='+SearchText,{ headers })
  }

  // not voted voter

  getvoterNotVoted(userId:number,roleID:number,PageNo:number,NoofRow:number,Language:any,SearchText:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Voter/VoterDetailsbyColumn?ColoumnName=isVoted&ColoumnValue=N&UserId='+userId+'&RoleId='+roleID+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language+'&SearchText='+SearchText,{ headers })
  }

   // dead voter

   getDeadVoter(userId:number,roleID:number,PageNo:number,NoofRow:number,Language:any,SearchText:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Voter/VoterDetailsbyColumn?ColoumnName=isAlive&ColoumnValue=N&UserId='+userId+'&RoleId='+roleID+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language+'&SearchText='+SearchText,{ headers })
  }

  // alive voter

  getAliveVoter(userId:number,roleID:number,PageNo:number,NoofRow:number,Language:any,SearchText:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Voter/VoterDetailsbyColumn?ColoumnName=isAlive&ColoumnValue=Y&UserId='+userId+'&RoleId='+roleID+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language+'&SearchText='+SearchText,{ headers })
  }

  // landing Image

  getLandingImage(userId:number):Observable<Blob>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(this.url+'Voter/GetAllLandingPage?UserId='+userId,{responseType: "blob", reportProgress: true,headers})
  }

  // Assembly Name

  getAssemblyName(assemblyName:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(this.url+'Assembly/GetAssemblyRegLang?Assembly='+assemblyName,{ headers })
  }
  
  // mobile match search
  
  getMobileMatchedName(Name:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Voter/GetMobileMatch?VoterName='+Name,{ headers })
  }

  // mobile match excel

  mobileMatchExcel(modal:any):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any>(this.url+'Voter/InsertBulkMobile', modal,{ headers })
  }

  // mobile matched list

  getMobileMatchedList(userid:any,RoleId:any,PageNo:any,NoofRow:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    //return this.http.get<any>(this.url+'Voter/MatchMobileDetails?userid='+userid+'&RoleId='+RoleId+'&PageNo='+PageNo+'&NoofRow='+NoofRow,{ headers })
    return this.http.get<any>(this.url+'Voter/MatchMobileDetails?userid='+userid+'&RoleId='+RoleId+'&PageNo='+PageNo+'&NoofRow='+NoofRow,{ headers })
  }

  //voter search dashboard count 
  getVoterDashboardCount(UserId:any, RoleId:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Voter/VoterDashBoardwithMatchMobCount?UserId='+UserId+'&RoleId='+RoleId,{ headers })
  }

  // get voter by id
  getVoterById(vid:any, Language:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Voter/GetVoterbyId?id='+vid+'&Language='+Language,{ headers })
  }

  // add voter to print slip list
  addToPrintSlip(id:any, ColoumnName:any, ColoumnValue:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any>(this.url+'Voter/UpdateColoumnTBLVoter?Id='+id+'&ColoumnName='+ColoumnName+'&ColoumnValue='+ColoumnValue,id,{ headers })
  }

  // insert mobile to contacts
  voterWithMobiletoContacts(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Voter/InsertMatchedMobileinContact',{ headers })
  }

  // matched Mobile File

  getMatchedMobFile(userid:any, RoleId:any):Observable<Blob>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(this.url+'Voter/MatchMobileFile?userid='+userid+'&RoleId='+RoleId,{responseType: "blob", reportProgress: true,headers})
  }

  // update mobile and DoB in voter from bulk matching excel
  uploadMatchedMobDoB(UserId:any, RoleId:any){
    debugger;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Voter/UpdateBirthDateandMobileinVoter?UserId='+UserId+'&RoleId='+RoleId,{ headers })
  }

  // voter by family
  // getVoterByFamily(Id:any, UserId:any, RoleId:any, PageNo:any, NoofRow:any, Language:any){
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${this.token}`
  //   });
  //   return this.http.get<any>(this.url+'Voter/GetVoterbyRelation?Id='+Id+'&UserId='+UserId+'&RoleId='+RoleId+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language,{ headers })
  // }
  getVoterByFamily(Id:any, PageNo:any, NoofRow:any, Language:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url+'Voter/GetVoterRelative?Id='+Id+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language,{ headers })
  }
  
}
