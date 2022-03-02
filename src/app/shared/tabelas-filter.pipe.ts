import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'tabelasfilter', 
    pure: false
}) 
export class tabelasFilterPipe implements PipeTransform { 
    transform(items: any[], args: any[]): any { 
        if (!items || !args) {  
            return items; 
        }  
        return items.filter(item => item.tab_nome.indexOf(args[0]) !== -1); 
    } 
} 
