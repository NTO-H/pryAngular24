import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria, Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss'], providers: [MessageService]
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;
  titulo = 'crear Producto';
  btnTitle = 'crear';
  id: string | null;
  selectedFile: File | null = null; // Inicializa con null
  categorias:Categoria []=[]
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _productoService: ProductoService,
    private aRouter: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.productoForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      precio: ['', Validators.required],
      descripcion: ['', Validators.required],
      imagen: ['', Validators.required],
      
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  showTopCenter() {
    this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Warn', detail: 'Message Content' });
  }


  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
      console.log(this.selectedFile)
    }
  }

  ngOnInit(): void {
     this.obtenerCategorias();
    this.esEditar();
  }
  agregarProducto() {
 
    // Obtener los valores del formulario
    const productoNombre = this.productoForm.get('producto')?.value;
    const productoCategoria = this.productoForm.get('categoria')?.value?.nombre;
    console.log("categoria=>",productoCategoria);
    const productoPrecio = this.productoForm.get('precio')?.value;
    const productoDescripcion = this.productoForm.get('descripcion')?.value;
    // const imagen = this.productoForm.get('imagen')?.value;
    console.log(this.selectedFile)
    // Validar que se haya seleccionado un archivo
    if (!this.selectedFile) {
      console.error('No se ha seleccionado ningún archivo.');
      return;
    }

    // Crear un objeto FormData y agregar los datos del producto
    const formData = new FormData();
    formData.append('nombre', productoNombre);
    formData.append('categoria', productoCategoria);
    formData.append('precio', productoPrecio);
    formData.append('descripcion', productoDescripcion);
    formData.append('imagen', this.selectedFile);

    // Realizar la solicitud HTTP para guardar o actualizar el producto
    const onError = (error: any) => {
      console.error(error);
      this.toastr.error('Ocurrió un error al agregar el producto.', 'Error');
    };

    if (this.id !== null) {
      // Si es una edición, llamar al método editarProducto con el ID y el objeto formData
      this._productoService.editarProducto(this.id, formData).subscribe(
        () => {
          this.toastr.info('Producto actualizado con éxito!', 'Actualizado');
          this.router.navigate(['/']);
        },
        onError
      );
    } else {
      // Si es un nuevo producto, llamar al método guardarProducto con el objeto formData
      this._productoService.guardarProducto(formData).subscribe(
        response => {
          console.log('Respuesta 02:', response);
          this.toastr.success('Producto registrado con éxito!', 'Registró éxitoso');


          
          this.router.navigate(['/listar-productos']);
        },
        error => {
          this.showTopCenter();
        }
      );
    }
  }



  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Producto';
      this.btnTitle = 'Actualizar';
      this._productoService.obtenerProducto(this.id).subscribe((data) => {
        this.productoForm.setValue({
          producto: data.nombre,
          categoria: data.categoria,
          precio: data.precio,
          descripcion: data.descripcion
          // imagen: data.imagen
        });
      });
    }
  }

  obtenerCategorias() {
    this._productoService.getCategorias().subscribe((data: Categoria[]) => {
      this.categorias= data;
      console.log(this.categorias)
    })

  }
}
