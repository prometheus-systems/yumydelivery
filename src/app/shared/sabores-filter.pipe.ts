import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'saboresfilter', 
    pure: false
}) 
export class saboresFilterPipe implements PipeTransform { 
    transform(items: any[], args?: any[]): any { 
        if (!items || !args) {  
            return items; 
        }  
        return items.filter(item => item.sab_nome.indexOf(args[0]) !== -1); 
    } 
} 
