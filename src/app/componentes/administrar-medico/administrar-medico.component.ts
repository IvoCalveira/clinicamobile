import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { IonicModule } from '@ionic/angular';
import { PasstopdfService } from 'src/app/servicios/passtopdf.service';


@Component({
  selector: 'app-administrar-medico',
  templateUrl: './administrar-medico.component.html',
  styleUrls: ['./administrar-medico.component.scss'],
  imports: [FormsModule, RouterModule, CommonModule, IonicModule],
  standalone: true,
})
export class AdministrarMedicoComponent  implements OnInit {
  public listaMedicos: Usuario = { id_usuario: 0, nombre: '', apellido: '', mail: '', nacimiento: new Date(), user: '', password: '', tipo_usuario: 0, dias_habiles:[], especialidad:'', foto_especialidad:'', foto_perfil:'', horario_desde:0, horario_hasta:0, autorizado:true  };
  public medicos:Usuario [] = [];
  public medicosAutorizar:boolean=false;

  constructor(private usuarioservices:UsuarioService,  private passtopdfService: PasstopdfService) {
        
    this.usuarioservices.autorizarMedico(this.medicos).subscribe(
        x=> {

            if((<Usuario[]>x).length >=1){
                this.medicos = Object.assign([], x);
            
        }
    });
  }
  public autorizar(index: number){
    let usuarioAutorizar = this.medicos[index];
    usuarioAutorizar.autorizado = true;
    this.usuarioservices.autorizarUsuario(usuarioAutorizar).subscribe(
        x=>{

            alert("Usuario autorizado correctamente");

        }
    );
        
}

public Desautorizar(index: number){
    let usuarioAutorizar = this.medicos[index];
    usuarioAutorizar.autorizado = false;
    this.usuarioservices.autorizarUsuario(usuarioAutorizar).subscribe(
        x=>{

            alert("Usuario desautorizado correctamente"); 
            
        }
    );
        
}
descargarPDF(divID: string){
    this.passtopdfService.listamedPDF(this.medicos);
}

  ngOnInit() {}

}
