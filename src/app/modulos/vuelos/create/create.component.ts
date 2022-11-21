import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VueloModelo } from 'src/app/modelos/vuelo.model';
import { VueloService } from 'src/app/servicios/vuelo.service';
import { RutaModelo } from 'src/app/modelos/ruta.model';
import { RutaService } from 'src/app/servicios/ruta.service';

import Swal from 'sweetalert2'


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private vueloService: VueloService,
    private rutaService: RutaService,
    private router: Router) { }

    fgValidacion = this.fb.group({
      fecha_inicio: ['', [Validators.required]],
      hora_inicio: ['', [Validators.required]],
      fecha_fin: ['', [Validators.required]],
      hora_fin: ['', [Validators.required]],
      asientos_vendidos: [0, [Validators.required]],
      nombre_piloto: ['', [Validators.required]],
      rutaId: ['', [Validators.required]]
    });

    listadoRutas: RutaModelo[] = []
  
  
  ngOnInit(): void {
    this.getAllRutas()
  }

  store() {
    let vuelo = new VueloModelo();
    vuelo.rutaId = this.fgValidacion.controls["rutaId"].value as string;
    vuelo.fecha_inicio = this.fgValidacion.controls["fecha_inicio"].value as string;
    vuelo.hora_inicio = this.fgValidacion.controls["hora_inicio"].value as string;
    vuelo.fecha_fin = this.fgValidacion.controls["fecha_fin"].value as string;
    vuelo.hora_fin = this.fgValidacion.controls["hora_fin"].value as string;
    vuelo.asientos_vendidos = this.fgValidacion.controls["asientos_vendidos"].value as number;
    vuelo.nombre_piloto = this.fgValidacion.controls["nombre_piloto"].value as string;

    this.vueloService.store(vuelo).subscribe((data: VueloModelo) => {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/vuelos']);
    },
      (error: any) => {
        console.log(error)
        alert("Error en el envio");
      })
  }

  
  getAllRutas(){
    this.rutaService.getAll().subscribe((data: RutaModelo[]) => {
      this.listadoRutas = data
      console.log(data)
    })
  }

}
