import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {
  listProductos!: Producto;
  idproduct!: string

  isLoading = true;//variable rastreador de carga de producto
  constructor(private router:ActivatedRoute,
    private _productoService: ProductoService
    // , private toastr: ToastrService
  ) { } 

  ngOnInit(): void {
    // this.listProductos = new Producto()
    // this.obtenerProductos();
    this.isLoading = true;//comienza la carga/el isLoading esta
    this.idproduct = this.router.snapshot.params['id'];
    this._productoService.detalleProductoById(this.idproduct).subscribe(data => {
      console.log("detalles de: "+this.idproduct);
      // this.detalleProductoById(id);

      this.listProductos = data;
      this.isLoading = false;//carga de productos/el isLisLoadingoader cambia a false

    })
  }
  







}
