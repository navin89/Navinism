import { Component, OnInit } from '@angular/core';
import {BaseContextService} from "../../../shared/services/base-context.service";
import {DomSanitizer} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {ApplicationStateService} from "../../../application-state.service";


// @Component({
//   selector: 'app-pod',
//   templateUrl: './pod.component.html',
//   styleUrls: ['./pod.component.css']
// })
// export class PodComponent extends BaseContextService implements OnInit {
//
//   isAutoRefresh;
//   refreshSub;
//   isLoading =true;
//   isDashboardReady =false;
//   isDashboardReadyForAvatar =false;
//   podTitle;
//   podImg;
//   podDate;
//   podCopyRight;
//   podDescription;
//
//
//   constructor(private homesvc: HomeService) {
//     super();
//   }
//
//   ngOnInit(): void {
//     setTimeout(()=> {
//       // console.log(`Navinism Dashboard Component loaded`);
//       setTimeout(()=> {
//         this.isDashboardReadyForAvatar = true;
//       }, 1000);
//       this.isLoading = false;
//       this.isDashboardReady = true;
//       this.loadData();
//     }, 2800);
//   }
//
//   ngOnDestroy(): void {}
//
//   loadData() {
//     this.homesvc.getPictureOfTheDayService().then( (result: any)=> {
//       const parsedResp = JSON.parse(result.data);
//       this.podTitle = parsedResp.title;
//       this.podDate = moment(parsedResp.date).format("MM-DD-YYYY");
//       this.podCopyRight = parsedResp.copyright;
//       this.podDescription = parsedResp.desc;
//       this.podImg = parsedResp.isPicAvail === false ? "assets/picOfTheDay.jpg" : "http://localhost:3010/api/getPicOfTheDay";
//
//     }, error=> {
//       // console.log(`at the front err= `, error);
//       this.podTitle = "NO PICTURE";
//     });
//
//   }
//
//   autoRefresh(){
//
//   }
//
// }

@Component({
  selector: 'app-pod',
  templateUrl: './pod.component.html'
})
export class PodComponent extends BaseContextService {

  isMobileResolution: boolean = true;

  constructor(private router: Router,
              private sanitizer: DomSanitizer,
              private applicationStateService: ApplicationStateService) {
    super();
  }

}
