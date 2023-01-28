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

  getVoterByUser(id:number){
    //return this.http.get<any[]>(this.url+'Voter/GetVoterbyUserId?userid='+id);
    return this.http.get<any[]>(this.url+'Voter/GetAllVoter?UserId='+id);
    
  }

  // total voter count

  getVoterCount(){
    return this.http.get<any>(this.url+'Voter/GetTotalVoterCount')
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

  getByRelation(id:any,userId:number){
    // return this.http.get<any[]>(this.url+'Voter/GetVoterbyRelation?Id='+id);
    return this.http.get<any[]>(this.url+'Voter/GetVoterbyRelation?Id='+id+'&UserId='+userId);
    
  }

  // update voter mobile number from android

  updateMob(id:any, Mobile:string){
    return this.http.post<any>(this.url+'Voter/UpdateMobileVoter?Id='+id+'&Mobile='+Mobile+'',id)
  }

  // update voter alternate mobile number from android

  updateAltMob(id:any, AltMobile:string){
    return this.http.post<any>(this.url+'Voter/UpdateAltMobileVoter?Id='+id+'&AlternateMobileNo='+AltMobile+'',id)
  }

  updateStar(id:any, yesNo:any){
    return this.http.post<any>(this.url+'Voter/UpdateStarVoter?Id='+id+'&YesNo='+yesNo+'', id)
  }

  // update voter colour

  updateColor(id:any, color:any){
    debugger;
    return this.http.post<any>(this.url+'Voter/UpdateVoterInclination?Id='+id+'&Colour='+color+'', id)
  }

  // update voter address from android

  updateAdrs(id:any, address:any){
    return this.http.post<any>(this.url+'Voter/UpdateAddressVoter?Id='+id+'&Address='+address+'', id)
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

  // Imp Voter Data

  impVoter(userId:number){
    return this.http.get<any>(this.url+'Voter/GetStarVoterbyUserId?UserId='+userId)
  }

  // lastname and count

  lastNameData(id:number){
    //return this.http.get<any>(this.url+'Voter/GetVoterCountbyLastName');
    return this.http.get<any>(this.url+'Voter/GetVoterCountbyLastName?userid='+id);
    
  }

  // all voter by lastname

  voterByLastName(lastName:any, id:number){
    // return this.http.get<any>(this.url+'Voter/VoterDetailsbyLastName?Name='+lastName);
    return this.http.get<any>(this.url+'Voter/VoterDetailsbyLastName?Name='+lastName+'&UserId='+id);
    
  }

  // all voter by villages

  voterByVillage(villageName:any, userId:number){
    // return this.http.get<any>(this.url+'Voter/VoterDetailsbyColumn?ColoumnName=Village&ColoumnValue='+villageName);
    return this.http.get<any>(this.url+'Voter/VoterDetailsbyColumn?ColoumnName=Village&ColoumnValue='+villageName+'&UserId='+userId);
    
  }

  // all voter by address

  voterByAddress(addressName:any,userId:number){
    return this.http.get<any>(this.url+'Voter/VoterDetailsbyColumn?ColoumnName=Address&ColoumnValue='+addressName+'&UserId='+userId)
  }

   // all voter by part no

   voterByPart(partNumber:number,userId:number){
    return this.http.get<any>(this.url+'Voter/VoterDetailsbyColumn?ColoumnName=PartNo&ColoumnValue='+partNumber+'&UserId='+userId)
  }

  // advance search voter

  advanceSearch(searchModal:any){
    return this.http.post<any>(this.url+'Voter/AdvancedSearchVoter', searchModal)
  }

  // all voter with Mobile

  voterWithMobile(id:number){
    // return this.http.get<any>(this.url+'Voter/VoterwithMobileNo');
    return this.http.get<any>(this.url+'Voter/VoterwithMobileNo?UserId='+id);
    
  }

  // boothwise voter count

  boothWiseVoterCount(id:number){
    //return this.http.get<any>(this.url+'Voter/VoterCountbyBooth');
    return this.http.get<any>(this.url+'Voter/VoterCountbyBooth?userid='+id);
    
  }

  // boothwise voter list

  boothWiseVoterList(partNo:number){
    return this.http.get<any>(this.url+'Voter/GetVoterbyPartNo?partno='+partNo)
  }

  // all voter by age

  voterBetweenAge(age1:number, age2:number, gender:string, id:number){
    // return this.http.get<any>(this.url+'Voter/GetVoterBetweenAge?age1='+age1+'&age2='+age2+'&gender='+gender+'');
    return this.http.get<any>(this.url+'Voter/GetVoterBetweenAge?age1='+age1+'&age2='+age2+'&gender='+gender+'&UserId='+id);
   
  }

  // search voter for web view

  searchVoter(searchModal:any){
    return this.http.post<any>(this.url+'Voter/FilterVoterList', searchModal)
  }

  getVoterByColor(){
    return this.http.get<any>(this.url+'Voter/GetVoterInclination')
  }

  colorWiseVoterList(inclination:any, id:number){
    return this.http.get<any>(this.url+'Voter/GetVoterInclinationUserId?inclination='+inclination+'&UserId='+id)
  }

}
