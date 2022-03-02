import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'enderecofilter', 
    pure: false
}) 
export class enderecoFilterPipe implements PipeTransform { 
    transform(items: any[], args?: any[]): any { 
        if (!items || !args) {  
            return items; 
        }  
        return items.filter(item => item.end_endereco.indexOf(args[0]) !== -1); 
    } 
} 
