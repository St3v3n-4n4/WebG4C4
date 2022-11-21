import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RutaModelo } from 'src/app/modelos/ruta.model';
import { RutaService } from 'src/app/servicios/ruta.service';
import { AeropuertoService } from 'src/app/servicios/aeropuerto.service';
import { AeropuertoModelo } from 'src/app/modelos/aeropuerto.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private rutaService: RutaService,
    private aeropuertoService: AeropuertoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

    fgValidacion = this.fb.group({
      id: ['', [Validators.required]],
      origenId: ['', [Validators.required]],
      destinoId: ['', [Validators.required]],
      tiempo_estimado: [0, [Validators.required]]
    });

    id: string = ''
    listadoAeropuertos: AeropuertoModelo[] = []

    ngOnInit(): void {
      this.id = this.route.snapshot.params["id"]
      this.buscarRegistro(this.id);
      this.getAllAeropuertos()
    }
  
    buscarRegistro(id: string) {
      this.rutaService.getWithId(id).subscribe((data: RutaModelo) => {
        console.log(data)
        this.fgValidacion.controls["id"].setValue(id)
        this.fgValidacion.controls["origenId"].setValue(data.origenId as string)
        this.fgValidacion.controls["destinoId"].setValue(data.destinoId as string)
        this.fgValidacion.controls["tiempo_estimado"].setValue(data.tiempo_estimado as number)
      })
    }
  
    edit() {
      let ruta = new RutaModelo();
      ruta.id = this.fgValidacion.controls["id"].value as string;
      ruta.origenId = this.fgValidacion.controls["origenId"].value as string;
      ruta.destinoId = this.fgValidacion.controls["destinoId"].value as string;
      ruta.tiempo_estimado = this.fgValidacion.controls["tiempo_estimado"].value as number
  
      this.rutaService.update(ruta).subscribe((data: RutaModelo) => {
        Swal.fire('Editado Correctamente!', '', 'success')
        this.router.navigate(['/aeropuertos/get']);
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
