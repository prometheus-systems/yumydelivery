import { Component, OnInit , ViewChild} from '@angular/core';
import {Router} from "@angular/router";

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MaterialModules} from '../materials-modules';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog'; 
import { environment } from '../../environments/environment'; 

import { DialogService } from '../shared/dialog.service';
import { NotificationService } from '../shared/notification.service';
import { TranslateService }   from './../shared/translate.service';

@Component({
  selector: 'app-branco',
  templateUrl: './branco.component.html',
})
export class BrancoComponent implements OnInit {
  NomeSistema = environment.Sistema;
  constructor(private router: Router , public _translate: TranslateService, private dialog: MatDialog , private materialmodule: MaterialModules,private dialogService: DialogService, private notification:NotificationService) { }

  ngOnInit() {  
  }


}