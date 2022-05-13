import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ChatService } from 'src/app/shared/services/chat.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  mensaje: string;
  listadoMensajesMostrar: Array<Mensaje> = new Array<Mensaje>();
  error:string="No puedes enviar mensajes vacios o con más de 21 carácteres.";
  hayError:boolean=false;
  spinner:boolean=true;
  constructor(public chatService: ChatService, public authService: AuthService, public router:Router) 
  {
    console.log("en constructor "+this.spinner);
   }

  ngOnInit() {
    setTimeout(() => {
      console.log("en oninit "+this.spinner);
      this.cargarMensajes();
    }, 1000);
  
  }

  mandarMensaje(){
    if (this.mensaje=="" || this.mensaje==null || this.mensaje.length>=21)
    {
      this.hayError=true;
    }else{
      this.chatService.enviarMensaje4A(this.mensaje,this.authService.userData.email);
      this.mensaje="";
      this.hayError=false;
    }

  }

  cargarMensajes(): void {

    this.chatService.MensajesRef4A.snapshotChanges().pipe(
      map( data => {
        this.listadoMensajesMostrar = new Array<Mensaje>();
        data.map(mensaje =>{
          var mensaje2: Mensaje = new Mensaje();
          mensaje2.email = mensaje.payload.doc.data().email;
          mensaje2.fecha = mensaje.payload.doc.data().fechaMensaje;
          mensaje2.mensaje = mensaje.payload.doc.data().mensaje;

          if (this.authService.userData.email==mensaje2.email)
          {
            mensaje2.siSoy=true;
          }else
          {
            mensaje2.siSoy=false;
          }
          this.listadoMensajesMostrar.push(mensaje2);
        })
      })
    ).subscribe(datos => {
      console.log("adentro de cargar "+this.spinner);
      this.spinner=false;
    });
   }

   irASalas(){
    this.router.navigate(['inicio']);
   }
}

export class Mensaje {
  email: string;
  fecha: string;
  mensaje:string;
  siSoy:boolean;
}


