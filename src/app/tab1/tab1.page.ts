import { BadgeService } from './../service/badge.service';
import { Router } from '@angular/router';

import { CategoryService } from './../service/category.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ProductService } from '../service/product.service';
import { Badge } from '@ionic-native/badge/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  categories$;
  categories: any;
  saleProduct: any;
  badgeNumberTotal: any;
  badgeNumber: number;
  sliderConfig = {
  spaceBetween: 10,
 slidesPerView: 1.6,
 centeredSlides: true
  }
  public slideOpts = {
    slidesPerView: 1.2,
    spaceBetween: 50,
    centeredSlides: true,
    initialSlide: 2,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 200,
      modifier: 1,
      slideShadows: false,
    },
    on: {
      beforeInit() {
        const swiper = this;

        swiper.classNames.push(`${swiper.params.containerModifierClass}coverflow`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);

        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
      },
      setTranslate() {
        const swiper = this;
        const {
          width: swiperWidth, height: swiperHeight, slides, $wrapperEl, slidesSizesGrid, $
        } = swiper;
        const params = swiper.params.coverflowEffect;
        const isHorizontal = swiper.isHorizontal();
        const transform$$1 = swiper.translate;
        const center = isHorizontal ? -transform$$1 + (swiperWidth / 2) : -transform$$1 + (swiperHeight / 2);
        const rotate = isHorizontal ? params.rotate : -params.rotate;
        const translate = params.depth;
        // Each slide offset from center
        for (let i = 0, length = slides.length; i < length; i += 1) {
          const $slideEl = slides.eq(i);
          const slideSize = slidesSizesGrid[i];
          const slideOffset = $slideEl[0].swiperSlideOffset;
          const offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;

          let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
          let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
          // var rotateZ = 0
          let translateZ = -translate * Math.abs(offsetMultiplier);

          let translateY = isHorizontal ? 0 : params.stretch * (offsetMultiplier);
          let translateX = isHorizontal ? params.stretch * (offsetMultiplier) : 0;

          // Fix for ultra small values
          if (Math.abs(translateX) < 0.001) translateX = 0;
          if (Math.abs(translateY) < 0.001) translateY = 0;
          if (Math.abs(translateZ) < 0.001) translateZ = 0;
          if (Math.abs(rotateY) < 0.001) rotateY = 0;
          if (Math.abs(rotateX) < 0.001) rotateX = 0;

          const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

          $slideEl.transform(slideTransform);
          $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;

        }

        // Set correct perspective for IE10
        if (swiper.support.pointerEvents || swiper.support.prefixedPointerEvents) {
          const ws = $wrapperEl[0].style;
          ws.perspectiveOrigin = `${center}px 50%`;
        }
      },
      setTransition(duration) {
        const swiper = this;
        swiper.slides
          .transition(duration)
          .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
          .transition(duration);
      }
    }
  }
  constructor(private categoryService : CategoryService,
    private productService: ProductService,
    private loadingController: LoadingController,
    private router : Router,
    private badge: Badge,
    private  badgeService : BadgeService) {

  }


 async ngOnInit() {
  this.getBadge()
  //console.log(this.badgeNumberTotal)
    const loader = await this.loadingController.create({
      message: 'Please Wait..',
      animated: true,
      spinner: "circles",
      backdropDismiss: false,
      showBackdrop: true
  });
  await loader.present().then();
  this.categories$= this.categoryService.getCategoriesLimit().subscribe(x => {
    this.categories = x
      loader.dismiss().then();

   });

   this.productService.saleProduct().subscribe(x => {

      this.saleProduct = x

   })

  }

  async getBadge(){
    try {
      let badgeAmount = await this.badge.get();

      this.badgeNumberTotal = badgeAmount
      console.log(this.badgeNumberTotal)
    } catch (e) {
      console.error(e);
    }
  }
 async clearBadges(){
  try {
    let badge = await this.badge.clear
  }catch (e) {
    console.error(e);
  }

 }


}
