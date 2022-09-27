import {Component, OnInit} from '@angular/core';
import {User} from './entity/User';
import {ApiUsersService} from 'src/app/services/api-users.service'
import { Subject } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{
  
  public data: Array<any> ;
  selectedFile : File = null;
  etat=false;
  title = 'test-technique';
  listUsers:User[]=[];
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: File = null;
  SingelData: any;
  editDat: any;
 getedit:any

  eventsSubject: Subject<void> = new Subject<void>();

  public constructor(private myService: ApiUsersService) {
    
    
}
  ngOnInit(): void {

  }


  jsonObj :[{}]// json object



  /*
  * @ToDo
  * */
  LoadListUsersFromJson(event){
    this.selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(this.selectedFile, "UTF-8");
    fileReader.onload = () => {
    //console.log(fileReader.result.toString());
    this.jsonObj=(JSON.parse(fileReader.result.toString()));
    console.log(this.jsonObj)
    this.data=this.jsonObj;
  
    this.myService.myMethod(this.data);
  
    }
    fileReader.onerror = (error) => {
    console.log(error);
    }
    }
  
 

  /*
  * @ToDo
  * */
  SaveListUsersInJson(){}



  addItem(newItem) {
    this.etat = newItem;
 
  }

  getsingdata(data){
    this.SingelData = data
   
  }

  editData(event){
    this.editDat = event

  }
  emitEventToChild(event) {
    this.eventsSubject.next();
  }
  emit(event) {
    this.getedit=event;
  }


}
