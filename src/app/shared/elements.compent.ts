import { Component, OnInit, ViewChild, ElementRef, Input, Inject, AfterViewInit,OnDestroy,ChangeDetectorRef } from '@angular/core';
import { AuthServicefb } from '../auth/auth.service-fb';
import { AngularFireFunctions } from '@angular/fire/functions';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { environment } from "../../environments/environment"; 
import { NgForm } from '@angular/forms';

import { AngularStripeService } from '@fireflysemantics/angular-stripe-service'

declare var Stripe; // : stripe.StripeStatic;

@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls:  ['./elements.compent.css']
})
  export class ElementsComponent implements OnInit, AfterViewInit, OnDestroy { 
    @ViewChild('cardInfo', { static: false }) cardInfo: ElementRef;
    stripe;
  loading = false;
  confirmation;
  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;
  /******************************/
    baseUrl = environment.URLBase;   
    fullimage:string; 
  constructor(private auth: AuthServicefb, private functions: AngularFireFunctions,    private cd: ChangeDetectorRef,
    private stripeService:AngularStripeService,  
    @Inject(MAT_DIALOG_DATA) 
      public data   
     ,public dialogRef: MatDialogRef<ElementsComponent>) { }  
  ngOnDestroy(): void {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }
  ngAfterViewInit(): void {
    this.stripeService.setPublishableKey('pk_test_2syov9fTMRwOxYG97AAXbOgt008X6NL46o').then(
      stripe=> {
        this.stripe = stripe;
    const elements = stripe.elements();    
    this.card = elements.create('card');
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.cardHandler);
    });
  }
     @Input() amount;
    @Input() description;  @ViewChild('cardElement') cardElement: ElementRef;


  cardErrors;



  ngOnInit() {
    this.stripe = Stripe('pk_test_your_key');
    const elements = this.stripe.elements();

    this.card = elements.create('card');
    this.card.mount(this.cardElement.nativeElement);

    this.card.addEventListener('change', ({ error }) => {
        this.cardErrors = error && error.message;
    });
  }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  async onSubmit(form: NgForm) {
    const { token, error } = await this.stripe.createToken(this.card);

    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Success!', token);
    }
  }

  async handleForm(e) {
    e.preventDefault();

    const { source, error } = await this.stripe.createSource(this.card);

    if (error) {
      // Inform the customer that there was an error.
      this.cardErrors = error.message;
    } else {
      // Send the token to your server.
      this.loading = true;
      const user = await this.auth.getUser();
      const fun = this.functions.httpsCallable('stripeCreateCharge');
      this.confirmation = await fun({ source: source.id, uid: user.uid, amount: this.amount }).toPromise();
      this.loading = false;

    }
  }
}