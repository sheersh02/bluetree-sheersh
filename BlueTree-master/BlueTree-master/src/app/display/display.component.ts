import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {
  trueFalse:any;

  displayedColumns: string[] = ['name', 'email' , 'dob', 'age','salary', 'status','action'];
  dataSource !: MatTableDataSource<any>;


  @ViewChild(MatSort) sort !: MatSort;
  constructor(private dialog:MatDialog,private server:ApiService){}
 
  ngOnInit(): void {
    this.getAllEmp()
  }

  
  openDialog() {
    this.dialog.open(DialogComponent, {
     width:`30%`
    }).afterClosed().subscribe(data =>{
      if(data == 'save'){
        this.getAllEmp();
      }
    })
  }

  getAllEmp(){
    this.server.getEmp().subscribe({
      next:(res)=>{      
        this.dataSource = new MatTableDataSource(res);      
        this.dataSource.sort = this.sort
      },
      error:()=>{
        alert("error while loading data")
      }
    })
  }

  editEmp(data:any){
    this.dialog.open(DialogComponent,{
      width:'30%',data:data
    }).afterClosed().subscribe(data=>{
      if(data=='update'){
        this.getAllEmp();
      }
    })
  }

  deleteEmp(id:any){
    this.server.deleteEmp(id).subscribe({
      next:(res)=>{
        alert("deleted one entry");
        this.getAllEmp();
      },error:()=>{
        alert("Error while Deleting The entry")
      }
    })
  }
}
