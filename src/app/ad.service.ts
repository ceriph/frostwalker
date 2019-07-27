import {Injectable} from "@angular/core";
import {AdMobPro} from "@ionic-native/admob-pro/ngx";
import {Platform} from "ionic-angular";

@Injectable()
export class AdService {

  adId = 'ca-app-pub-4458284068451323/1153909851';
  isTesting = true;
  autoShow = false;

  showAds = false;

  constructor(private ad: AdMobPro,
              private platform: Platform) {

    this.prepareInterstitial();
    this.prepareReward();

    document.addEventListener('onAdLoaded', () => {
      console.log("Ad loaded event");
      this.showAds = true;
    });

    document.addEventListener('onAdFailLoad', () => {
      console.log("Ad failed event");
      this.showAds = false;
    });

    document.addEventListener('onAdDismiss', () => {
      this.prepareInterstitial();
      this.prepareReward();
    });
  }

  prepareInterstitial() {
    if (this.platform.is('cordova')) {
      console.log("Preparing interstitial ad...");
      this.ad.prepareInterstitial({
        // adId: this.adId,
        isTesting: this.isTesting,
        autoShow: this.autoShow
      }).then(() => console.log("Ad ready"))
    }
  }

  prepareReward() {
    if (this.platform.is('cordova')) {
      console.log("Preparing reward ad...");
      this.ad.prepareRewardVideoAd({
        // adId: this.adId,
        isTesting: this.isTesting,
        autoShow: this.autoShow
      }).then(() => console.log("Ad ready"));
    }
  }

  showInterstitial(onSuccess?, onFailure?) {
    if (this.platform.is('cordova') && this.showAds) {
      this.ad.showInterstitial();
      if (onSuccess) onSuccess();
    } else {
      if (onFailure) {
        onFailure();
      } else {
        alert("Failed to load ad")
      }
    }
  }

  showReward(onSuccess?, onFailure?) {
    if (this.platform.is('cordova') && this.showAds) {
      this.ad.showRewardVideoAd();
      if (onSuccess) onSuccess();
    } else {
      if (onFailure) {
        onFailure();
      } else {
        alert("Failed to load ad")
      }
    }
  }
}
