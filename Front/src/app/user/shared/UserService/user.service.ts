import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly rootUrl = 'http://localhost:62889';
  constructor(private http: HttpClient) { }
 
  registerUser(user : User){
    const body: User = {
      Password: user.Password,
      Email: user.Email,
      Gender: user.Gender,
      FirstName: user.FirstName,
      LastName: user.LastName,
      Username: user.Email
    }
    let reqHeader = new HttpHeaders({'No-Auth':'True'})
    return this.http.post(this.rootUrl + '/api/User/Register', body, {headers : reqHeader});
  }

  public userAuthentication({ userName, password }: { userName; password; })
  {
    let data = 'username='+userName+'&password='+password+'&grant_type=password';
    let requestHeader = new HttpHeaders({'Content-Type':'application/x-www-urlencoded','No-Auth':'True' });
    return this.http.post(this.rootUrl+'/token',data,{headers: requestHeader})
  }

  getUserClaims(){
    return this.http.get(this.rootUrl+'/api/GetUserClaims');
  }

  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var userRoles: string[] = JSON.parse(localStorage.getItem('userRoles'));
    allowedRoles.forEach(element => {
      if (userRoles.indexOf(element) > -1) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }
 
}
