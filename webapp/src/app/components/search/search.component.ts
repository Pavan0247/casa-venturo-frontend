import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { BookingComponent } from '../booking/booking.component';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{

  public searchForm!:FormGroup;

  newslist: any[] = [];
  constructor(private dialog: MatDialog,private formBuilder :FormBuilder,private service: SearchService){}
  ngOnInit(): void{
    this.searchForm=this.formBuilder.group({
      keyword:[''],
      options:['']
    })
    // this.getNews();
  }

  openDialog() {
    this.dialog.open(BookingComponent, {
     width:'30%'
    });
  }

  onSubmit(){
    console.log(this.searchForm.value)
    if(this.searchForm.value.keyword == ""||this.searchForm.value.keyword == null || this.searchForm.value.options == ""||this.searchForm.value.options == null){
      this.getNews();
      alert("data not availbel")
    }else{
    this.service.searchByKeyword(this.searchForm.value.keyword,this.searchForm.value.options).subscribe({
      next:(res) =>{
        this.newslist = res;
        console.log(res);          
      },
      error:(err)=>{
        alert("Error while fetching the records")
      }

    })
    this.searchForm.reset();
  }
}

  getNews(){
    this.service.getServices().subscribe({
      next:(res) =>{
        this.newslist = res.content;
        console.log(res.content);          
      },
      error:(err)=>{
        alert("Error while fetching the records")
      }
    })
  }

}
