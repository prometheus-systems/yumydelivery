import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { environment } from '../../environments/environment'; 
import { login } from './../model/login.model';
import { map, take } from 'rxjs/operators';
import { AuthGuard } from './../auth/auth.guard';
import { TranslateService }   from './../shared/translate.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  
  getStatus_logado$: Observable<boolean>;  
  getVendas$: Observable<boolean>;
  getResult_login$: Observable<login>; 
  NomeSistema = environment.Sistema;
  Device = environment.Device;
  getDeviceMob$: Observable<boolean>; 
  getDeviceDes$: Observable<boolean>; 


  constructor(public deviceService: DeviceDetectorService
            , private authService: AuthService
            , private _translate: TranslateService
            , private authGuard:AuthGuard) { }

  ngOnInit() {

    if (this.deviceService.isMobile()){
      this.authService.setDeviceMob = true;
      environment.Device = 'M';
    }
    else 
    if(this.deviceService.isTablet()){
      this.authService.setDeviceDes = false;
      environment.Device = 'T';
    }
    else
    if (this.deviceService.isDesktop()){
      this.authService.setDeviceDes = true;
      environment.Device = 'D';
    }    
    this.getStatus_logado$ = this.authService.getStatus_logado;
    this.getVendas$ = this.authService.getVendas;
    this.getResult_login$ = this.authService.getResult_login; 
    this.getDeviceMob$ = this.authService.getDeviceMob;
    this.getDeviceDes$ = this.authService.getDeviceDes;         
  }      
  

}
