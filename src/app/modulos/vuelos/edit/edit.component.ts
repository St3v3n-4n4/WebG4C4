import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RutaModelo } from 'src/app/modelos/ruta.model';
import { RutaService } from 'src/app/servicios/ruta.service';
import { VueloService } from 'src/app/servicios/vuelo.service';
import { VueloModelo } from 'src/app/modelos/vuelo.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private rutaService: RutaService,
    private vueloService: VueloService,
    private router: Router,
    private route: ActivatedRoute) { }

    fgValidacion = this.fb.group({
      id: ['', [Validators.required]],
      fecha_inicio: ['', [Validators.required]],
      hora_inicio: ['', [Validators.required]],
      fecha_fin: ['', [Validators.required]],
      hora_fin: ['', [Validators.required]],
      asientos_vendidos: [0, [Validators.required]],
      nombre_piloto: ['', [Validators.required]],
      rutaId: ['', [Validators.required]],
    });

    id: string = ''
    listadoRutas: RutaModelo[] = []
    f1: string = ''

    ngOnInit(): void {
      this.id = this.route.snapshot.params["id"]
      this.buscarRegistro(this.id);
      this.getAllRutas()
    }
  
    buscarRegistro(id: string) {
      this.vueloService.getWithId(id).subscribe((data: VueloModelo) => {
        console.log(data);
        this.f1 = new Date(data.fecha_inicio as string).toISOString();
        this.fgValidacion.controls["id"].setValue(data.id as string);
        this.fgValidacion.controls["fecha_inicio"].setValue(data.fecha_inicio as string);
        this.fgValidacion.controls["hora_inicio"].setValue(data.hora_inicio as string);
        this.fgValidacion.controls["fecha_fin"].setValue(data.fecha_fin as string);
        this.fgValidacion.controls["hora_fin"].setValue(data.hora_fin as string);
        this.fgValidacion.controls["asientos_vendidos"].setValue(data.asientos_vendidos as number);
        this.fgValidacion.controls["nombre_piloto"].setValue(data.nombre_piloto as string)
        this.fgValidacion.controls["rutaId"].setValue(data.rutaId as string)
      })
    }
  
    edit() {
      let vuelo = new VueloModelo();
      vuelo.id = this.fgValidacion.controls["id"].value as string;
      vuelo.rutaId = this.fgValidacion.controls["rutaId"].value as string;
      vuelo.fecha_inicio = this.fgValidacion.controls["fecha_inicio"].value as string;
      vuelo.hora_inicio = this.fgValidacion.controls["hora_inicio"].value as string;
      vuelo.fecha_fin = this.fgValidacion.controls["fecha_fin"].value as string;
      vuelo.hora_fin = this.fgValidacion.controls["hora_fin"].value as string;
      vuelo.asientos_vendidos = this.fgValidacion.controls["asientos_vendidos"].value as number;
      vuelo.nombre_piloto = this.fgValidacion.controls["nombre_piloto"].value as string;
  
  
      this.vueloService.update(vuelo).subscribe((data: VueloModelo) => {
        Swal.fire('Editado Correctamente!', '', 'success')
        this.router.navigate(['/vuelos/get']);
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
