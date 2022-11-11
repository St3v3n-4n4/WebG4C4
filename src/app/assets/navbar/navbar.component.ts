import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsuarioModelo } from 'src/app/modelos/usuario.model';
import { SeguridadService } from 'src/app/servicios/seguridad.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private seguridadService: SeguridadService) { }
  activeSession?:boolean = false;
  subs: Subscription = new Subscription();
  
  ngOnInit(): void {
    this.subs = this.seguridadService.datosUsuarioSesion().subscribe((data: UsuarioModelo) => {
      console.log(data)
        this.activeSession = data.isLoggedIn;
    })
  }

}
