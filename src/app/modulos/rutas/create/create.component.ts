import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RutaModelo } from 'src/app/modelos/ruta.model';
import { RutaService } from 'src/app/servicios/ruta.service';
import { AeropuertoService } from 'src/app/servicios/aeropuerto.service';
import { AeropuertoModelo } from 'src/app/modelos/aeropuerto.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private rutaService: RutaService,
    private aeropuertoService: AeropuertoService,
    private router: Router) { }

  fgValidacion = this.fb.group({
    origenId: ['', [Validators.required]],
    destinoId: ['', [Validators.required]],
    tiempo_estimado: [0, [Validators.required]]
  });

  listadoAeropuertos: AeropuertoModelo[] = []

  ngOnInit(): void {
    this.getAllAeropuertos()
  }

  store() {
    let ruta = new RutaModelo();
    ruta.origenId = this.fgValidacion.controls["origenId"].value as string;
    ruta.destinoId = this.fgValidacion.controls["destinoId"].value as string;
    ruta.tiempo_estimado = this.fgValidacion.controls["tiempo_estimado"].value as number;

    this.rutaService.store(ruta).subscribe((data: RutaModelo) => {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/rutas']);
    },
      (error: any) => {
        console.log(error)
        alert("Error en el envio");
      })
  }

  getAllAeropuertos(){
    this.aeropuertoService.getAll().subscribe((data: AeropuertoModelo[]) => {
      this.listadoAeropuertos = data
      console.log(data)
    })
  }


}
