import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchObject } from 'src/app/Components/crud/interface/interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { showButtons } from '../interface';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  @Input() showButtonAdd:boolean=true;
  @Input() searchName: string = '';
  @Input() propertyColumns: string[] = [];
  @Input() showButtonsTableCrud:showButtons={updateButton:true,deleteButton:true,viewButton:true};
  @Input() headerColumnsName: string[] = []
  @Input() dataTable: any = [];
  @Input() showSearchDate: boolean = false;
  @Input() showSearchFieldName:boolean = true;
  @Input() nameComponent: string = "";
  @Output() valueSearch = new EventEmitter<SearchObject>();
  pageSizeOptions = [5, 10, 15, 20];
  miFormulario: FormGroup = this.fb.group({
    name: [''],
    date: []
  });

  constructor(private router: Router, private fb: FormBuilder,private service:AuthService) {
  }


  ngOnInit(): void {

  }

  add() {
    this.router.navigateByUrl(`${this.service.user.rol}/${this.nameComponent}/crear`)
  }

  onChangesSearch() {
    if (this.isValidDate(this.miFormulario.get('date')?.value)) {
      this.valueSearch.emit({ name: this.miFormulario.get('name')?.value, date: this.miFormulario.get('date')?.value });
    } else {
      this.miFormulario.get('date')?.setValue('');
      this.valueSearch.emit({ name: this.miFormulario.get('name')?.value, date: this.miFormulario.get('date')?.value });
    }
  }

  isValidDate(date: any) {
    return date instanceof Date && !isNaN(Number(date));
  }





}
