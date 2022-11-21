import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AeropuertoModelo } from 'src/app/modelos/aeropuerto.model';
import { AeropuertoService } from 'src/app/servicios/aeropuerto.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private aeropuertoService: AeropuertoService,
    private router: Router
  ) { }

  fgValidacion = this.fb.group({
    nombre: ['', [Validators.required]],
    ciudad: ['', [Validators.required]],
    pais: ['', [Validators.required]],
    sigla: ['', [Validators.required]],
    coordenada_X: ['', [Validators.required]],
    coordenada_Y: ['', [Validators.required]],
    tipo: ['', [Validators.required]],
  });


  ngOnInit(): void {
  }

  store() {
    let aeropuerto = new AeropuertoModelo();
    aeropuerto.nombre = this.fgValidacion.controls["nombre"].value as string;
    aeropuerto.ciudad = this.fgValidacion.controls["ciudad"].value as string;
    aeropuerto.pais = this.fgValidacion.controls["pais"].value as string;
    aeropuerto.sigla = this.fgValidacion.controls["sigla"].value as string;
    aeropuerto.coordenada_X = this.fgValidacion.controls["coordenada_X"].value as string;
    aeropuerto.coordenada_Y = this.fgValidacion.controls["coordenada_Y"].value as string;
    aeropuerto.tipo = this.fgValidacion.controls["tipo"].value as string;

    this.aeropuertoService.store(aeropuerto).subscribe((data: AeropuertoModelo) => {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/aeropuertos']);
    },
      (error: any) => {
        console.log(error)
        alert("Error en el envio");
      })
  }

}
