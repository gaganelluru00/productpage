import { Component, OnInit } from '@angular/core';
import { HttpClientService, Product } from '../service/http-client.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  category:string="All Products";
  filter:string="";
  searchProduct:string="";
  categoryProducts:Product[];
  allProducts:Product[];
  products:Product[];
  columnDisplay:number=3;
  noShow:boolean=false;
  discountPercent:string="";
 

  

  constructor(private httpClientService:HttpClientService,private route:Router) {
    
   }

  ngOnInit(): void {
    this.httpClientService.getAllProducts().subscribe(response=>{
      this.allProducts=response;
      this.categoryProducts=this.allProducts;
     this.products=this.removeDuplicates(this.allProducts,'productCategory');
     console.log(this.products);
      
    });
  }

  // products based on selection in category dropdown 
  getCategoryProducts(c){
    this.category=c.target.innerHTML;
    
    this.noShow=true;
    this.httpClientService.getCategory(this.category).subscribe(response=>{
     this.categoryProducts=response;
    });

    }



   //products based on selection in category dropdown and discount dropdown
    getDiscountProducts(c){
      this.discountPercent=c.target.innerHTML;
      localStorage.setItem("category",this.category);
     this.noShow=true;
      this.httpClientService.getDiscount(localStorage.getItem("category"),this.discountPercent).subscribe(response=>{
        this.categoryProducts=response;
      })
      console.log(this.categoryProducts);
    }



   


  
  removeDuplicates(array, key) {
      let lookup = new Set();
      return array.filter(obj => !lookup.has(obj[key]) && lookup.add(obj[key]));
  }

  search(){
    this.httpClientService.getSearchProducts(this.searchProduct).subscribe(response=>{
      this.categoryProducts=response;
    })
  }


//perform action on click --slider images
  show(){
    alert("1");
  }

  
//to open and close coupons popup
closePop(){
  document.getElementById('id01').style.display='none'
}
openPop(){
  document.getElementById('id01').style.display='block'
}


//scroll bar in the coupon popup
openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}

}
