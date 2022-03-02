import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <app-menu></app-menu>
    <router-outlet #outlet="outlet"></router-outlet>
    <app-footer></app-footer>
  `
})

export class AppComponent implements OnInit {
  title = 'Controle Financeiro';

  ngOnInit() {
    document.addEventListener("deviceready", function () {
      //alert(device.platform);
      //alert('entrou');
    }, false);

  }
}
