import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class VoterService {

  url = environment.apiUrl
 
  constructor(private http:HttpClient) { }

  // all voterlist 

  getAllVoter():Observable<any>{
    return this.http.get<any>(this.url+'Voter/GetAllVoter');
  }

  // voter by user id

  // getVoterByUser(id:number, roleID:number){
  //   return this.http.get<any[]>(this.url+'Voter/GetAllVoter?UserId='+id+'&RoleId='+roleID)
  // }
  
  getVoterByUser(id:any,RoleId:any,PageNo:any,NoofRow:any,Language:any,SearchText:any):Observable<any>{
    //return this.http.get<any[]>(this.url+'Voter/GetAllVoter?UserId='+id+'&RoleId='+RoleId+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language)
    return this.http.get<any[]>(this.url+'Voter/GetAllVoter?UserId='+id+'&RoleId='+RoleId+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language+'&SearchText='+SearchText)
  }


  // total voter count by user
  getVoterCountByUser(id:number,RoleId:number){
    return this.http.get<any>(this.url+'Voter/GetTotalVoterCount?userid='+id+'&roleid='+RoleId)
  }

  addSingleVoter(addVoterModal:any):Observable<any>{
    return this.http.post<any>(this.url+'Voter/InsertVoter', addVoterModal)
  }

  uploadExcel(modal:any):Observable<any>{
    return this.http.post<any>(this.url+'Voter/InsertBulkVoter', modal)
  }

  update(editVoter:any){
    return this.http.post<any>(this.url+"Voter/UpadateVoter", editVoter);
  }

  // get list by family

  getByRelation(id:any,userId:number,roleID:any,pageNo:any,NoofRow:any,Language:any){
    return this.http.get<any[]>(this.url+'Voter/GetVoterbyRelation?Id='+id+'&UserId='+userId+'&RoleId='+roleID+'&PageNo='+pageNo+'&NoofRow='+NoofRow+'&Language='+Language);
    
  }

  // update voter mobile number from android

  updateMob(id:any, Mobile:string){
    return this.http.post<any>(this.url+'Voter/UpdateMobileVoter?Id='+id+'&Mobile='+Mobile+'',id)
  }

  // update voter alternate mobile number from android

  updateAltMob(id:any, AltMobile:string){
    return this.http.post<any>(this.url+'Voter/UpdateAltMobileVoter?Id='+id+'&AlternateMobileNo='+AltMobile+'',id)
  }

  updateStar(id:any, YesNo:any){
    return this.http.post<any>(this.url+'Voter/UpdateStarVoter?Id='+id+'&YesNo='+YesNo+'', id)
  }

  // update voter colour

  updateColor(id:any, color:any){
    return this.http.post<any>(this.url+'Voter/UpdateVoterInclination?Id='+id+'&Colour='+color+'', id)
  }

  // update voter address from android

  updateAdrs(id:any, address:any){
    return this.http.post<any>(this.url+'Voter/UpdateAddressVoter?Id='+id+'&Address='+address+'', id)
  }

  // voted status update

  updateVotedStatus(id:any, YesNo:any){
    return this.http.post<any>(this.url+'Voter/UpdateIsVoted?Id='+id+'&YesNo='+YesNo, id)
  }

  // dead or alive update

  updateAliveDead(id:any, YesNo:any){
    return this.http.post<any>(this.url+'Voter/UpdateIsAliveVoter?Id='+id+'&YesNo='+YesNo, id)
  }

  // update profession

  updateProfession(id:any, ColoumnName:any, ColoumnValue:any){
    return this.http.post<any>(this.url+'Voter/UpdateColoumnTBLVoter?Id='+id+'&ColoumnName='+ColoumnName+'&ColoumnValue='+ColoumnValue, id)
  }

  // update DoB

  updateDoB(id:any, ColoumnName:any, ColoumnValue:any){
    debugger;
    return this.http.post<any>(this.url+'Voter/UpdateColoumnTBLVoter?Id='+id+'&ColoumnName='+ColoumnName+'&ColoumnValue='+ColoumnValue, id)
  }

  updateCaste(id:any, ColoumnName:any, ColoumnValue:any){
    return this.http.post<any>(this.url+'Voter/UpdateColoumnTBLVoter?Id='+id+'&ColoumnName='+ColoumnName+'&ColoumnValue='+ColoumnValue, id)
  }

  // get Cast 

  getAllCaste(Language:any){
    //return this.http.get<any>(this.url+'Voter/GetAllCasteName')
    return this.http.get<any>(this.url+'Voter/GetAllCasteName?Language='+Language)
    
  }

  // village name and count

  villagedata(vilModal:any):Observable<any>{
    return this.http.post<any>(this.url+'Voter/FilterColoumnCount', vilModal);
  }

  // address and count

  addressData(addrsModal:any){
    return this.http.post<any>(this.url+'Voter/FilterColoumnCount', addrsModal)
  }

  // part no. and count

  partNoData(partModal:any){
    return this.http.post<any>(this.url+'Voter/FilterColoumnCount', partModal)
  }

  occupaionData(occupModal:any){
    debugger;
    return this.http.post<any>(this.url+'Voter/FilterColoumnCount', occupModal)
  }

  CastData(castModal:any){
    return this.http.post<any>(this.url+'Voter/FilterColoumnCount',castModal)
  }

  // filter / search voter by condition

  filterVoterByCondition(filterModal:any){
    debugger;
    return this.http.post<any>(this.url+'Voter/FilterVoterbyCondition',filterModal)
  }


  // Imp Voter Data

  impVoter(userId:number,roleID:number,PageNo:number,NoofRow:number,Language:any,SearchText:any){
    return this.http.get<any>(this.url+'Voter/GetStarVoterbyUserId?UserId='+userId+'&RoleId='+roleID+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language+'&SearchText='+SearchText);
  }

  // lastname and count

  lastNameData(userid:number,roleID:number,PageNo:number,NoofRow:number,Language:any,SearchText:any){
    //return this.http.get<any>(this.url+'Voter/GetVoterCountbyLastName?userid='+userid+'&RoleId='+roleID+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language);
    return this.http.get<any>(this.url+'Voter/GetVoterCountbyLastName?userid='+userid+'&roleid='+roleID+'&pageno='+PageNo+'&noofrow='+NoofRow+'&Language='+Language+'&SearchText='+SearchText);
  }

  // all voter by lastname

  voterByLastName(lastName:any, userid:number,roleID:number,PageNo:number,NoofRow:number,Language:any,SearchText:any){
    return this.http.get<any>(this.url+'Voter/VoterDetailsbyLastName?Name='+lastName+'&UserId='+userid+'&RoleId='+roleID+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language+'&SearchText='+SearchText);
  }

  // all voter by villages

  voterByVillage(villageName:any, userId:number,roleID:number,PageNo:number,NoofRow:number,Language:any,SearchText:any){
    //return this.http.get<any>(this.url+'Voter/VoterDetailsbyColumn?ColoumnName=Village&ColoumnValue='+villageName+'&UserId='+userId+'&RoleId='+roleID+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language);
    return this.http.get<any>(this.url+'Voter/VoterDetailsbyColumn?ColoumnName=Village&ColoumnValue='+villageName+'&UserId='+userId+'&RoleId='+roleID+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language+'&SearchText='+SearchText);
  }

  // all voter by address

  voterByAddress(addressName:any,userId:number, roleID:number,PageNo:number,NoofRow:number,Language:any,SearchText:any){
    return this.http.get<any>(this.url+'Voter/VoterDetailsbyColumn?ColoumnName=Address&ColoumnValue='+addressName+'&UserId='+userId+'&RoleId='+roleID+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language+'&SearchText='+SearchText)
  }

   // all voter by part no

   voterByPart(partNumber:number,userId:number,roleID:number,PageNo:number,NoofRow:number,Language:any,SearchText:any){
    return this.http.get<any>(this.url+'Voter/VoterDetailsbyColumn?ColoumnName=PartNo&ColoumnValue='+partNumber+'&UserId='+userId+'&RoleId='+roleID+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language+'&SearchText='+SearchText)
  }

  // voter by Caste

  voterByCaste(Caste:number,userId:number,roleID:number,PageNo:number,NoofRow:number,Language:any){
    return this.http.get<any>(this.url+'Voter/VoterDetailsbyColumn?ColoumnName=Caste&ColoumnValue='+Caste+'&UserId='+userId+'&RoleId='+roleID+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language)
  }

  // advance search voter

  advanceSearch(searchModal:any){
    debugger;
    return this.http.post<any>(this.url+'Voter/AdvancedSearchVoter', searchModal)
  }

  // all voter with Mobile

  voterWithMobile(userId:number,roleID:number,PageNo:number,NoofRow:number,Language:any,SearchText:any){
    return this.http.get<any>(this.url+'Voter/VoterwithMobileNo?UserId='+userId+'&RoleId='+roleID+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language+'&SearchText='+SearchText);
    
  }

  // boothwise voter count

  boothWiseVoterCount(userID,roleID:number){
    return this.http.get<any>(this.url+'Voter/VoterCountbyBooth?userid='+userID+'&roleid='+roleID);
    
  }

  // boothwise voter list

  boothWiseVoterList(partNo:number,PageNo:number,NoofRow:number,Language:any){
    return this.http.get<any>(this.url+'Voter/GetVoterbyPartNo?partno='+partNo+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language)
  }

  // all voter by age

  voterBetweenAge(age1:number, age2:number, gender:string, userId:number, roleID:number,PageNo:number,NoofRow:number,Language:any){
    return this.http.get<any>(this.url+'Voter/GetVoterBetweenAge?age1='+age1+'&age2='+age2+'&gender='+gender+'&UserId='+userId+'&roleid='+roleID+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language);
   
  }

  // search voter for web view

  searchVoter(searchModal:any){
    return this.http.post<any>(this.url+'Voter/FilterVoterList', searchModal)
  }

  // voter by color

  getVoterByColor(userId:number,roleID:number){
    return this.http.get<any>(this.url+'Voter/GetVoterInclination?UserId='+userId+'&RoleId='+roleID)
    
  }

  // supporter voter list

  supporter(userId:number,roleID:number,PageNo:number,NoofRow:number,Language:any,SearchText:any){
    return this.http.get<any>(this.url+'Voter/GetVoterInclinationUserId?Inclination=Supporter&UserId='+userId+'&RoleId='+roleID+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language+'&SearchText='+SearchText)
  }

  // opposition voter list

  opposition(userId:number, roleID:number,PageNo:number,NoofRow:number,Language:any,SearchText:any){
    return this.http.get<any>(this.url+'Voter/GetVoterInclinationUserId?inclination=Opposition&UserId='+userId+'&RoleId='+roleID+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language+'&SearchText='+SearchText);
  }

  // doubtful voter list

  doubtful(userId:number, roleID:number,PageNo:number,NoofRow:number,Language:any,SearchText:any){
    return this.http.get<any>(this.url+'Voter/GetVoterInclinationUserId?inclination=Doubtful&UserId='+userId+'&RoleId='+roleID+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language+'&SearchText='+SearchText);
  }

  // other voter list

  other(userId:number,roleID:number,PageNo:number,NoofRow:number,Language:any,SearchText:any){
    return this.http.get<any>(this.url+'Voter/GetVoterInclinationUserId?inclination=Other&UserId='+userId+'&RoleId='+roleID+'&PageNo='+PageNo+'&NoofRow='+NoofRow+'&Language='+Language+'&SearchText='+SearchText);
  }

  // is voted / non-voted
  getIsVoted(UserId:number, RoleId:number, Coloumn:any){
    return this.http.get<any>(this.url+'Voter/GetColoumncount?UserId='+UserId+'&RoleId='+RoleId+'&Coloumn='+Coloumn)
  }

  // is Dead / Alive
  getIsAlive(UserId:number, RoleId:number, Coloumn:any){
    return this.http.get<any>(this.url+'Voter/GetColoumncount?UserId='+UserId+'&RoleId='+RoleId+'&Coloumn='+Coloumn)
  }

  //delete voter
  deleteVoter(voterId:any){
    return this.http.get<any>(this.url+'Voter/DeleteVoterbyId?Id='+voterId)
  }

}
