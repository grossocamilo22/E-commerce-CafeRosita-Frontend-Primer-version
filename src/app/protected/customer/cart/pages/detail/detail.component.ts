import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Detail_Order, Order } from 'src/app/protected/order/interfaces/interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../../../order/services/order.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { showButtons } from 'src/app/Components/interface';
import Swal from 'sweetalert2';
import { SaleService } from '../../../../admin/sale/services/sale.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['../../css/style.css']
})
export class DetailComponent implements OnInit {

  showButtonsTablePedido: showButtons = { deleteButton: true, updateButton: false, viewButton: false };
  showButtonsTableSale: showButtons = { deleteButton: false, updateButton: false, viewButton: true };
  showStepper!: boolean;
  showSales!: boolean;
  pageSizeOptionsDetails = [5, 8];
  sales: Order[] = [];
  listHeaderTableSales = ['Nombre', 'Fecha', 'Total Precio', 'Acciones'];
  propertySales = ['name', 'createdAt', 'total_price', 'actions'];
  details_Order: Detail_Order[] = [];
  listHeaderTableDetailOrder = ['Nombre producto', 'Cantidad', 'Precio', 'Acciones'];
  propertyDetailsOrder = ['Product.name', 'amount', 'price', 'actions'];
  dataSourceDetailsOrder = new MatTableDataSource<Detail_Order>;
  dataSourceSale = new MatTableDataSource<Order>;
  firstFormGroup: FormGroup = this.fb.group({
    details_Order: [this.details_Order, [Validators.required]]
  });
  secondFormGroup: FormGroup = this.fb.group({
    details_Order: [this.details_Order, [Validators.required]]
  });
  constructor(private router: Router, private fb: FormBuilder,private saleService:SaleService, private orderService: OrderService, private authService: AuthService) { }
  ngOnInit(): void {
    this.getOrders();
    this.getSales();
  }
  navigateByUrl() {
    this.router.navigateByUrl('cliente/productos');
  }

  getAction(event: any) {
    this.orderService.deleteDetailOrder(event.element.id).subscribe(
      (resp) => {
        if (resp.ok === true) {
          Swal.fire('Atención', 'Has eliminado el producto del carrito de compras', 'success')
          this.getOrders();
        }
      }
    )
  }

  changeStep(event: any) {
    if (event.selectedStep.state === 'step1') {

    } else if (event.selectedStep.state === 'step2') {

    }
  }

  saveSale(){
    this.orderService.updateOrder('pagado').subscribe(
      (resp)=>{
        if(resp.ok===true){
          Swal.fire('Hecho!','Tu pedido ha sido registrado de manera satisfactoria');
          this.getOrders();
          this.getSales();
        }
      }
    )
  }

  getSales() {
    this.saleService.findSalesByCustomer(Number(this.authService.user.uid!)).subscribe(
      (resp)=>{
        if(resp.ok===true){
          this.sales = resp.list || [];
          this.showSales = this.sales.length > 0 ? true : false;
          this.dataSourceSale.data = this.sales;
        }
      }
    )
  }
  getOrders() {
    this.orderService.getcountdetailOrder(this.authService.user.uid!).subscribe(
      (resp) => {
        if (resp.ok === true) {
          this.details_Order = resp.rows!;
          this.showStepper = this.details_Order.length > 0 ? true : false;
          this.dataSourceDetailsOrder.data = this.details_Order;
          this.firstFormGroup.get('details_Order')?.setValue(this.details_Order);
        }
      }
    )
  }
}
