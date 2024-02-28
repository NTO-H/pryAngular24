import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss'],
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;
  titulo = 'crear Producto';
  btnTitle = 'crear';
  id: string | null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _productoService: ProductoService,
    private aRouter: ActivatedRoute
  ) {
    this.productoForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }
  submit() {
    if (this.productoForm.valid)
    this.toastr.success("Todos los datos son válidos");
    else
    this.toastr.error("Todos los datos son inválidos");
    
  }
  
  ngOnInit(): void {
    this.esEditar();
    // this.agregarProducto();
  }

  agregarProducto() {
    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
    };

    const onSuccess = () => {
      this.toastr.success('Producto registrado con éxito!', 'Éxito');
      this.router.navigate(['/']);
    };

    const onError = (error: any) => {
      console.error(error);
      this.toastr.error('Ocurrió un error al agregar el producto.', 'Error');
    };

    if (this.id !== null) {
      this._productoService.editarProducto(this.id, PRODUCTO).subscribe(
        () => {
          this.toastr.info('Producto actualizado con éxito!', 'Actualizado');
          this.router.navigate(['/']);
        },
        onError
      );
    } else {
      this._productoService.guardarProducto(PRODUCTO).subscribe(
        response => {
          // if (data && data.id) {
            console.log('Respuesta 02:',response)
            this.toastr.success('Producto registrado con éxito!', 'Registró éxitoso');
    this.router.navigate(['/']);},error=>{
      this.toastr.error('Ocurrió un error al agregar el producto.', 'Error de inserción ');
    }
      );
    }
  }
  verificarYAgregar(){
    this.toastr.success('Producto registrado con éxito!', 'Éxito');
    this.router.navigate(['/']);
  }


  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Producto';
      this.btnTitle = 'Actualizar';
      this._productoService.obtenerProducto(this.id).subscribe((data) => {
        this.productoForm.setValue({
          producto: data.nombre,
          categoria: data.categoria,
          ubicacion: data.ubicacion,
          precio: data.precio,
        });
      });
    }
  }
}
