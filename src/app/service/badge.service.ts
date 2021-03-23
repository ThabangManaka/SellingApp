import { Injectable } from '@angular/core';
import { Badge } from '@ionic-native/badge/ngx';

@Injectable({
  providedIn: 'root'
})
export class BadgeService {

  constructor(private badge: Badge) { }

  async requestPermission(){
    try {
      let permission = await this.badge.requestPermission();
      console.log(permission)
    } catch (e) {
      console.error(e);
    }
  }


  async getBadge(){
    try {
      let badgeAmount = await this.badge.get();
      console.log(badgeAmount)
    } catch (e) {
      console.error(e);
    }
  }
  async  setBadge(badgeNumber :number) {
    try{
      let badge = await this.badge.set(badgeNumber);
      console.log(badge)
     }catch (e) {
     console.error(e);
   }
  }
  async increaseBadge(badgeNumber : number){
      try{
       let badge = await this.badge.increase(Number(badgeNumber));
       console.log(badge)
      }catch (e) {
      console.error(e);
    }
  }

  async clearBadges() {
    try{
      let badge = await this.badge.clear()
      console.log(badge)
     }catch (e) {
     console.error(e);
   }
  }
}
