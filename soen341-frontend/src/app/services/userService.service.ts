import { Injectable } from "@angular/core";
import { LoginUser } from "../../interfaces/loginUser";
import { User } from "../../interfaces/user";


@Injectable({
  providedIn: 'root'})
export class UserService{
    loginUser:LoginUser={email: '', password:''};
    user:User={email: '',role:''};

    

    setLoginUser(login:LoginUser):void{
        this.loginUser=login;
    }
    getLoginUser():LoginUser{
      return this.loginUser;
    }

    setUser(user:User):void{
      this.user=user;
    }
    getUser():User{
      return this.user;
    }
    
}
