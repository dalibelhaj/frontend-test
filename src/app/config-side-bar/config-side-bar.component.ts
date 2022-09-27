import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { User } from '../entity/User';
import { ApiUsersService } from '../services/api-users.service';


@Component({
  selector: 'app-config-side-bar',
  templateUrl: './config-side-bar.component.html',
  styleUrls: ['./config-side-bar.component.css']
})
export class ConfigSideBarComponent implements OnInit {

  @Input() item :any ;
  @Input() jtem : any;
  @Output() EventEditdata = new EventEmitter<any>();
  user:User;
  oneuser:any;
  public data: Array<any> ;
  singeldata: Array<any>;
  editForm!: FormGroup;
  constructor(private myService:ApiUsersService,private fb: FormBuilder) { 
   
    this.editForm = this.fb.group({
      nom:[''],
      prenom: [''],
      nombre_enfants: [''],

    } );
    

    
  }

  getdata(){

    this.myService.myMethod$.subscribe((data) => {
      this.data = data; 
     
  }
);
  }

  ngOnInit(): void {
    this.getdata();
      // this.events.subscribe(() => this.changeValue());
  }



  ngOnChanges(){
    console.log(this.item)
    console.log(this.item['nom'])
   
    this.editForm.patchValue( {
     nom:this.item['nom'],
     prenom:this.item['prenom'],
     nombre_enfants: this.item['nombre_enfants'],

   });

   if(this.jtem=='true'){
    this.changeValue()

   }
 
  }



  changeValue(){

    

    this.EventEditdata.emit();

  }

}
