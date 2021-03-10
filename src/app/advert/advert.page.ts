import { ProductService } from './../service/product.service';
import { CategoryService } from './../service/category.service';
import { FirebaseUploadService } from './../service/firebase-upload.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { SecureStorageService } from '../service/secure-storage.service';

@Component({
  selector: 'app-advert',
  templateUrl: './advert.page.html',
  styleUrls: ['./advert.page.scss'],
})
export class AdvertPage implements OnInit {
   barStatus = false;
   imagesUploads = [];
   imageUrl;


  //  name: string;
  //  imageUrl: string;
  //  price: number;
  //  description: string;
  //  salPercentage: number;

    valdationUserMessage = {
      Name: [
        {type:"required", message:"Please enter product name"},
        {type:"minlength", message: "name must be at least 3 character"}
        ],
        Price:[
          {type:"required", message:"Please enter price"}
        ]  ,

        Percentage: [
          {type:"required", message:"Please enter Percentages"}
          ],

      Description :[
        {type:"required", message:"Please enter description"},
         {type:"minlength", message: "description must be at least 5 character"}
      ],
      ImageUrl :[
        {type:"required", message:"Please enter image url"}

      ],


    }
    validationFormUser: FormGroup;
    categories$;
    categories: any;

    imageResponse: any;
    options: any;
    userDetail: any;

    constructor(private _formbuilder : FormBuilder,
      private router: Router,
      private categoryService : CategoryService,
      private productService : ProductService,
      private loadingController: LoadingController,
      private toastController: ToastController,
      private imagePicker: ImagePicker,
      private secureStorageService : SecureStorageService
      ) {
        this.categories$= categoryService.getCategories().subscribe(x => {
          this.categories = x
       });
     }

  ngOnInit() {
     this.secureStorageService.get('user').then(res => {
    this.userDetail =res

  })
 this.validationFormUser = this._formbuilder.group({
 name: new FormControl('', Validators.compose([  Validators.required, Validators.minLength(3)])),
 price: new FormControl('', Validators.compose([  Validators.required, Validators.minLength(2)   ])),
 
 imageUrl: new FormControl('', Validators.compose([  Validators.required ])),
 salPercentage: new FormControl('', Validators.compose([Validators.required])),
 description: new FormControl('', Validators.compose([Validators.required,Validators.minLength(5)])),
   sellerEmail: '',
   sellerFirstName:'',
   sellerLastName:'',
   status:'pending',
     date: new Date(),

    })
  }
  async productForm(form) {

    const toast = await this.toastController.create({
      message: 'Product Uploaded Successfully...',
      duration: 2000,
      position: "bottom",
      animated: true,
      buttons: [
          {
              side: "end",
              icon: 'checkmark-circle-outline',
              role: "cancel",
          }
      ]
  });

  const loader = await this.loadingController.create({
    message: 'Please Wait..',
    animated: true,
    duration: 4000,
    spinner: "circles",
    backdropDismiss: false,
    showBackdrop: true
});
  this.validationFormUser.value.sellerEmail  =   this.userDetail.email;
  this.validationFormUser.value.sellerFirstName =   this.userDetail.firstname;
  this.validationFormUser.value.sellerLastName =  this.userDetail.lastname;

    this.productService.requestProducts( this.validationFormUser.value).then(res =>{

     toast.present().then();
     loader.present().then(res => {
      this.router.navigateByUrl('/tabs/tab1')
     });

    loader.dismiss().then();
    } ).catch(res => {
      console.log(res);
    });

    this.validationFormUser.reset();
  }



}
