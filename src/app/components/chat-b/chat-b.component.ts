import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ChatService } from 'src/app/shared/services/chat.service';
import { map } from 'rxjs/operators';
import { Mensaje } from '../chat/chat.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-b',
  templateUrl: './chat-b.component.html',
  styleUrls: ['./chat-b.component.scss'],
})
export class ChatBComponent implements OnInit {
  mensaje: string;
  listadoMensajesMostrar: Array<Mensaje> = new Array<Mensaje>();
  error:string="No puedes enviar mensajes vacios.";
  hayError:boolean=false;
  constructor(public chatService: ChatService, public authService: AuthService, public router:Router) { }

  ngOnInit() 
  {
    setTimeout(() => {
      this.cargarMensajes();
    }, 1000);
  }

  mandarMensaje(){
    if (this.mensaje=="" || this.mensaje==null)
    {
      this.hayError=true;
    }else{
      this.chatService.enviarMensaje4B(this.mensaje,this.authService.userData.email);
      this.mensaje="";
      this.hayError=false;
    }

  }

  cargarMensajes(): void {

    this.chatService.MensajesRef4B.snapshotChanges().pipe(
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
    });
   }

   irASalas(){
    this.router.navigate(['inicio']);
   }
}
