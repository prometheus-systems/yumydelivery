import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'cardapiofilter', 
    pure: false
}) 
export class cardapioFilterPipe implements PipeTransform { 
    transform(items: any[], args?: any[]): any { 
        if (!items || !args) {  
            return items; 
        }  
        return items.filter(item => item.car_nome.indexOf(args[0]) !== -1); 
    } 
} 
