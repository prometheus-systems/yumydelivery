import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'vendedoresfilter', 
    pure: false
}) 
export class vendedoresFilterPipe implements PipeTransform { 
    transform(items: any[], args?: any[]): any { 
        if (!items || !args) {  
            return items; 
        }  
        return items.filter(item => item.ven_nome.indexOf(args[0]) !== -1); 
    } 
} 
