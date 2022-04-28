import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private mensajes4A:string = '/mensajes4A';
  private mensajes4B:string = '/mensajes4B';
  MensajesRef4A: AngularFirestoreCollection<any>;
  MensajesRef4B: AngularFirestoreCollection<any>;
  listadoMensajesMostrar: any;
  constructor(public db:AngularFirestore) 
  {
    this.MensajesRef4A = db.collection(this.mensajes4A, ref => ref.orderBy('fechaMensaje'));
    this.MensajesRef4B = db.collection(this.mensajes4B, ref => ref.orderBy('fechaMensaje'));
   }

   getMensajes4A(): AngularFirestoreCollection<any> {
    return this.MensajesRef4A;
  }
  getMensajes4B(): AngularFirestoreCollection<any> {
    return this.MensajesRef4B;
  }
  
  // getAll(): AngularFirestoreCollection<any> {
  //   return this.MensajesRef;
  // }

  enviarMensaje4A(mensaje:string, email:string){
    this.MensajesRef4A.add(
      {email:email,
        mensaje:mensaje,
        fechaMensaje:new Date().toLocaleString()});
  }

  enviarMensaje4B(mensaje:string, email:string){
    this.MensajesRef4B.add(
      {email:email,
        mensaje:mensaje,
        fechaMensaje:new Date().toLocaleString()});
  }
}
