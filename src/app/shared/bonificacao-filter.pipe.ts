import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'bonificacaofilter', 
    pure: false
}) 
export class bonificacaoFilterPipe implements PipeTransform { 
    transform(items: any[], args?: any[]): any { 
        if (!items || !args) {  
            return items; 
        }  
        return items.filter(item => item.ven_codigo.indexOf(args[0]) !== -1); 
    } 
} 
