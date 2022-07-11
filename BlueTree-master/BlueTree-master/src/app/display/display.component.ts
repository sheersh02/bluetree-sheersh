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

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  constructor(private dialog:MatDialog,private api:ApiService){}
  ngOnInit(): void {
    this.getAllUser()
  }

  
  openDialog() {
    this.dialog.open(DialogComponent, {
     width:`30%`
    }).afterClosed().subscribe(val =>{
      if(val == 'save'){
        this.getAllUser();
      }
    })
  }

  getAllUser(){
    this.api.getUser().subscribe({
      next:(res)=>{      
        this.dataSource = new MatTableDataSource(res);      
        // if(res.value.status =="true"){
        //   this.trueFalse = "Active"
        // }else{
        //   this.trueFalse = "Inactive"
        // }
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      },
      error:()=>{
        alert("error")
      }
    })
  }

  editUser(row:any){
    this.dialog.open(DialogComponent,{
      width:'30%',data:row
    }).afterClosed().subscribe(val=>{
      if(val=='update'){
        this.getAllUser();
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUser(id:any){
    this.api.deleteUser(id).subscribe({
      next:(res)=>{
        alert("User Deleted Successfully");
        this.getAllUser();
      },error:()=>{
        alert("Error while Deleting The Record")
      }
    })
  }
}
