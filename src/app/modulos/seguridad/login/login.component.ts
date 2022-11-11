import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as cryptoJS from 'crypto-js';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  fgValidacion = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    clave: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder,
    private seguridadService: SeguridadService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  identificarUsuario() {
    let usuario = this.fgValidacion.controls["correo"].value as string;
    let clave = this.fgValidacion.controls["clave"].value as string;

    let claveCifrada = cryptoJS.MD5(clave).toString();

    this.seguridadService.login(usuario, claveCifrada).subscribe(
      (data: any) => {
        this.seguridadService.almacenarSesion(data)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Bienvenido',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigate(['/index']);
        })
      },
      (error: any) => {
        console.log(error)
        Swal.fire({
          title: 'Error!',
          text: 'Datos invalidos',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  }


}
