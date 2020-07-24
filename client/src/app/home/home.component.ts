import {Component, OnDestroy, OnInit} from '@angular/core';
import {BaseContextService} from "../shared/services/base-context.service";
import {HomeService} from "../shared/services/request/homeService/home.service";
import {HttpClient} from "@angular/common/http";
import {from} from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseContextService implements OnInit, OnDestroy {

  refreshSub;
  isLoading = true;
  picOfDayTitle;
  picOfTheDayImg;

  constructor(private homesvc: HomeService, private http: HttpClient) {
    super();

  }


  ngOnInit(): void {
    console.log(`InFITniti Home component loaded`);
    this.loadData();

  }

  ngOnDestroy(): void {}

  loadData() {
    setTimeout( ()=> {
      this.homesvc.getPictureOfTheDayService().then(async (result: any)=> {
        const parsedRes = JSON.parse(result.data);
        // console.log(`Parsed`, parsedRes);
        this.picOfDayTitle = parsedRes.title;
        this.picOfTheDayImg = parsedRes.pic;

      }, error=> {
        // console.log(`at the front err= `, error);
        this.picOfDayTitle = "NO PICTURE";
      });

      this.isLoading = false;
    }, 2000);
  }

}
