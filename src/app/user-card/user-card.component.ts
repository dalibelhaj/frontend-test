import { Component, Input, OnInit } from '@angular/core';
import { User } from '../entity/User';
import { ApiUsersService } from '../services/api-users.service';
import { Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<boolean>();
  @Output() EventSingeldata = new EventEmitter<any>();
  @Output()TrigerEdit = new EventEmitter<any>();
  @Input() itemm :any ;
  singleitem: any;
  addNewItem(value) {
    console.log(value)
    this.newItemEvent.emit(value);
  }
  addNewItem2(value) {
    console.log(value)
    this.newItemEvent.emit(value);
  }

  
  data: Array<any> ;
  user : User[]=[]
  editForm!: FormGroup;
  constructor(private myService:ApiUsersService ,private fb: FormBuilder) { 

    this.editForm = this.fb.group({
      nom:[''],
      prenom: [''],
      nombre_enfants: [''],

    } );
  }

  getdata(){

    this.myService.myMethod$.subscribe((data) => {
      this.data = data; 
     
     return  this.user = this.data;
  }
);
  }



  ngOnInit(): void {
    this.getdata();
    this.test()

  }
  test(){
    console.log(this.user);
  };

singelData(row):void{
  console.log(row);
  this.editForm.patchValue( {
    nom:row['nom'],
    prenom:row['prenom'],
    nombre_enfants: row['nombre_enfants'],

  });
this.singleitem = row;
this.EventSingeldata.emit(row);
}


changeValue(){
  console.log(this.singleitem['nom'])
  this.user.find(value => value.nom === this.singleitem['nom']).nombre_enfants = this.editForm.value.nombre_enfants;
  this.TrigerEdit.emit('true')
}

ngOnChanges(){

  console.log(this.itemm)
  this.user.find(value => value.nom === this.singleitem['nom']).nom = this.itemm['nom'];
  this.user.find(value => value.nom === this.singleitem['nom']).prenom = this.itemm['prenom']; 

}

}
