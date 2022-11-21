import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioModelo } from 'src/app/modelos/usuario.model';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  fgValidacion = this.fb.group({
    id: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    telefono: ['', [Validators.required, Validators.minLength(6)]],
    correo: ['', [Validators.required, Validators.email]],
  });

  id: string = ''

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.buscarRegistro(this.id);
  }

  buscarRegistro(id: string) {
    this.usuarioService.getWithId(id).subscribe((data: UsuarioModelo) => {
      console.log(data)
      this.fgValidacion.controls["id"].setValue(id)
      this.fgValidacion.controls["nombre"].setValue(data.nombre as string)
      this.fgValidacion.controls["apellidos"].setValue(data.apellidos as string)
      this.fgValidacion.controls["correo"].setValue(data.correo as string)
      this.fgValidacion.controls["telefono"].setValue(data.telefono as string)
    })
  }

  edit() {
    let usuario = new UsuarioModelo();
    usuario.id = this.fgValidacion.controls["id"].value as string;
    usuario.nombre = this.fgValidacion.controls["nombre"].value as string;
    usuario.apellidos = this.fgValidacion.controls["apellidos"].value as string;
    usuario.correo = this.fgValidacion.controls["correo"].value as string;
    usuario.telefono = this.fgValidacion.controls["telefono"].value as string;

    this.usuarioService.update(usuario).subscribe((data: UsuarioModelo) => {
      Swal.fire('Editado Correctamente!', '', 'success')
      this.router.navigate(['/admin/get']);
    },
      (error: any) => {
        console.log(error)
        alert("Error en el envio");
      })
  }


}
