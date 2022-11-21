import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AeropuertoModelo } from 'src/app/modelos/aeropuerto.model';
import { AeropuertoService } from 'src/app/servicios/aeropuerto.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private aeropuertoService: AeropuertoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  fgValidacion = this.fb.group({
    id: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    ciudad: ['', [Validators.required]],
    pais: ['', [Validators.required]],
    sigla: ['', [Validators.required]],
    coordenada_X: ['', [Validators.required]],
    coordenada_Y: ['', [Validators.required]],
    tipo: ['', [Validators.required]],
  });

  id: string = ''

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.buscarRegistro(this.id);
  }

  buscarRegistro(id: string) {
    this.aeropuertoService.getWithId(id).subscribe((data: AeropuertoModelo) => {
      console.log(data)
      this.fgValidacion.controls["id"].setValue(id)
      this.fgValidacion.controls["nombre"].setValue(data.nombre as string)
      this.fgValidacion.controls["ciudad"].setValue(data.ciudad as string)
      this.fgValidacion.controls["pais"].setValue(data.pais as string)
      this.fgValidacion.controls["sigla"].setValue(data.sigla as string)
      this.fgValidacion.controls["coordenada_X"].setValue(data.coordenada_X as string)
      this.fgValidacion.controls["coordenada_Y"].setValue(data.coordenada_Y as string)
      this.fgValidacion.controls["tipo"].setValue(data.tipo as string)
    })
  }

  edit() {
    let aeropuerto = new AeropuertoModelo();
    aeropuerto.id = this.fgValidacion.controls["id"].value as string;
    aeropuerto.nombre = this.fgValidacion.controls["nombre"].value as string;
    aeropuerto.ciudad = this.fgValidacion.controls["ciudad"].value as string;
    aeropuerto.pais = this.fgValidacion.controls["pais"].value as string;
    aeropuerto.sigla = this.fgValidacion.controls["sigla"].value as string;
    aeropuerto.coordenada_X = this.fgValidacion.controls["coordenada_X"].value as string;
    aeropuerto.coordenada_Y = this.fgValidacion.controls["coordenada_Y"].value as string;
    aeropuerto.tipo = this.fgValidacion.controls["tipo"].value as string;

    this.aeropuertoService.update(aeropuerto).subscribe((data: AeropuertoModelo) => {
      Swal.fire('Editado Correctamente!', '', 'success')
      this.router.navigate(['/aeropuertos/get']);
    },
      (error: any) => {
        console.log(error)
        alert("Error en el envio");
      })
  }


}
