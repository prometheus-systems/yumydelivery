import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'grupo_usuariosfilter', 
    pure: false
}) 
export class grupo_usuariosFilterPipe implements PipeTransform { 
    transform(items: any[], args: any[]): any { 
        if (!items || !args) {  
            return items; 
        }  
        return items.filter(item => item.gus_descricao.indexOf(args[0]) !== -1); 
    } 
} 
