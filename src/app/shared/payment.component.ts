import {Component, OnInit, Inject, Input, HostListener} from "@angular/core"; 
import { AuthServicefb } from '../auth/auth.service-fb';
import { AngularFireFunctions } from '@angular/fire/functions';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog"
import {NgForm } from "@angular/forms"; 
import {map} from "rxjs/operators"; 
import { environment } from "../../environments/environment"; 
import {StripeCheckoutHandler} from 'ng-stripe-checkout';

declare var StripeCheckout: StripeCheckoutHandler;
@Component({ 
  selector: 'app-payment', 
  templateUrl: './payment.component.html', 
}) 
 
export class PaymentCompenent implements OnInit { 
  baseUrl = environment.URLBase;   
  fullimage:string; 
constructor(private auth: AuthServicefb, private functions: AngularFireFunctions,  
  @Inject(MAT_DIALOG_DATA) 
    public data   
   ,public dialogRef: MatDialogRef<PaymentCompenent>) { }  
   @Input() amount;
  @Input() description;

  handler: StripeCheckoutHandler;

  confirmation: any;
  loading = false;

  
  ngOnInit() {  
    /*this.handler = StripeCheckout.configure({
      key: 'pk_test_your_key',
      image: '/your-avatar.png',
      locale: 'auto',
      source: async (source) => {
        this.loading = true;
        const user = await this.auth.getUser();
        const fun = this.functions.httpsCallable('stripeCreateCharge');
        this.confirmation = await fun({ source: source.id, uid: user.uid, amount: this.amount }).toPromise();
        this.loading = false;

      }
    });

    console.log('data',this.data);*/
  }

  async checkout(e) {
    const user = await this.auth.getUser();
    this.handler.open({
      name: 'Fireship Store',
      description: this.description,
      amount: this.amount,
      email: user.email,
    });
    e.preventDefault();
  }

  // Close on navigate
  @HostListener('window:popstate')
  onPopstate() {
    this.handler.close();
  }
  


}
 //FIM - CONSTRUTOR
