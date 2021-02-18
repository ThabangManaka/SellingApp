import { ProductService } from './../service/product.service';
import { CategoryService } from './../service/category.service';
import { FirebaseUploadService } from './../service/firebase-upload.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

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
        Phone:[
          {type:"required", message:"Please enter Phone.No"},
          {type:"minlength", message: "name must be at least 10 Numbers"}

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
    urls = [];
    constructor(private _formbuilder : FormBuilder,
      private router: Router,
      private firebaseUploadService : FirebaseUploadService,
      private categoryService : CategoryService,
      private productService : ProductService,
      private loadingController: LoadingController,
      private toastController: ToastController
      ) {
        this.categories$= categoryService.getCategories().subscribe(x => {
          this.categories = x
     // console.log(this.categories)
         });
       }

  ngOnInit() {
    this.validationFormUser = this._formbuilder.group({

      name: new FormControl('', Validators.compose([  Validators.required, Validators.minLength(3)
      ])),
      price: new FormControl('', Validators.compose([  Validators.required, Validators.minLength(2)
      ])),
      phone: new FormControl('', Validators.compose([  Validators.required, Validators.minLength(2)
      ])),
      location: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)
      ])),
      category: new FormControl('', Validators.compose([Validators.required,Validators.minLength(3)
      ])),
      description: new FormControl('', Validators.compose([Validators.required,Validators.minLength(5)
      ])),

      multiImages: this._formbuilder.array([])
    })
  }
  async productForm() {

    const toast = await this.toastController.create({
      message: 'Product Uploaded Successfully...',
      duration: 2000,
      position: "bottom",
      animated: true,
      color: "warning",
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

    this.productService.addProduct( this.validationFormUser.value).then(res =>{

     toast.present().then();
     loader.present().then(res => {
      this.router.navigateByUrl('/tabs/tab1')
     });

    loader.dismiss().then();
    } ).catch(res => {
      console.log(res);
    });
  }

  // uploadPhoto(event){
  //   this.barStatus =true;
  //   this.firebaseUploadService.storeImage(event.target.files[0]).then((res: any) =>{
  //      if (res) {
  //        this.barStatus = false;
  //        this.imageUrl = res;
  //        this.imagesUploads.unshift(res);

  //      }
  //   },
  //    (error : any) => {
  //     this.barStatus = true;
  //    }
  //   )
  // }
  createImage(img) {
    const newImage = new FormControl(img, Validators.required);
    (<FormArray>this.validationFormUser.get('multiImages')).push(newImage)
  }
  get multiImages(): FormArray {
    if (this.validationFormUser && this.validationFormUser.get('multiImages')) {
      return this.validationFormUser.get('multiImages') as FormArray;
    }
  }
  onFileUpload(event: any) {
    this.urls = [];
    let selectedFiles = event.target.files;

    if (selectedFiles) {
      for (let file of selectedFiles) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
          this.createImage(e.target.result);
        }
        reader.readAsDataURL(file);
      }
    }
  }

}
