import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'categoriasfilter', 
    pure: false
}) 
export class categoriasFilterPipe implements PipeTransform { 
    transform(items: any[], args?: any[]): any { 
        if (!items || !args) {  
            return items; 
        }  
        return items.filter(item => item.cat_nome.indexOf(args[0]) !== -1); 
    } 
} 
