import { RatingsService } from './../service/ratings.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.page.html',
  styleUrls: ['./ratings.page.scss'],
})
export class RatingsPage implements OnInit {
 ratings: any;
  constructor(private ratingsService: RatingsService,
    private loadingController: LoadingController) { }

  async ngOnInit() {
    const loader = await this.loadingController.create({
      message: 'Loading..',
      animated: true,
      spinner: "circles",
      backdropDismiss: false,
      duration: 2000,
      showBackdrop: true
  });
  loader.present().then();

  this.ratingsService.getRatings().subscribe(res=> {
 
   this.ratings = res
   loader.dismiss().then();

})
  }

}
