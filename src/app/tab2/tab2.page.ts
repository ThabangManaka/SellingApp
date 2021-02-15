import { ProductService } from './../service/product.service';
import { CategoryService } from './../service/category.service';
import { FirebaseUploadService } from './../service/firebase-upload.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
   barStatus = false;
   imagesUploads = [];
   imageUrl;
    valdationUserMessage = {
      Name: [
        {type:"required", message:"Please enter product name"},
        {type:"minlength", message: "name must be at least 3 character"}
        ],
        Price:[
          {type:"required", message:"Please enter price"},

        ],
      Location:[
        {type:"required", message:"Please enter your location"},
         {type:"minlength", message: "Password must be at least 5 character"}
      ],
      Category :[
        {type:"required", message:"Please select category"},

      ],
      Description :[
        {type:"required", message:"Please enter description"},
         {type:"minlength", message: "description must be at least 5 character"}
      ],

    }
    validationFormUser: FormGroup;
    categories$;
    categories: any;
    selectedFile: any;
    constructor(private _formbuilder : FormBuilder,
      private router: Router,
      private firebaseUploadService : FirebaseUploadService,
      private categoryService : CategoryService,
      private productService : ProductService) {
        this.categories$= categoryService.getCategories().subscribe(x => {
          this.categories = x
          console.log(this.categories)
         });
       }

  ngOnInit() {
    this.validationFormUser = this._formbuilder.group({

      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      price: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])),

      location: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])),
      category: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])),
      description: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])),
      imageName: new FormControl('', Validators.compose([
        Validators.required,

      ])),
    })
  }
  productForm() {
    this.validationFormUser.value.imageName = this.imageUrl;

    this.productService.addProduct( this.validationFormUser.value).then(res =>{
      this.router.navigateByUrl('/tabs/tab1');
    } ).catch(res => {
      console.log(res);
    });
  }

  uploadPhoto(event){
    this.barStatus =true;
    this.firebaseUploadService.storeImage(event.target.files[0]).then((res: any) =>{
       if (res) {
         this.barStatus = false;
         this.imageUrl = res;
         this.imagesUploads.unshift(res);

       }
    },
     (error : any) => {
      this.barStatus = true;
     }
    )
  }


}
