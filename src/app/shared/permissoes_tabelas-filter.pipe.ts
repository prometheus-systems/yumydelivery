import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'permissoes_tabelasfilter', 
    pure: false
}) 
export class permissoes_tabelasFilterPipe implements PipeTransform { 
    transform(items: any[], args: any[]): any { 
        if (!items || !args) {  
            return items; 
        }  
        return items.filter(item => item.tab_codigo.indexOf(args[0]) !== -1); 
    } 
} 
