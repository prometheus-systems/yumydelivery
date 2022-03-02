import { Directive, ElementRef, HostListener, AfterViewInit, OnInit } from '@angular/core';

@Directive({
  selector: '[appUnscape]',
  host: {
    '(input)': '$event'
  }
})

export class UnscapeDirective {


    lastValue: string;
  constructor(public ref: ElementRef) { }





  @HostListener('change', ['$event']) onChange($event) 
  {
    $event.target.value = $event.target.value.parseFromString($event.target.value, 'text/html');

  }

}
