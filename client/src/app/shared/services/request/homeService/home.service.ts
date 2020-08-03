import { Injectable } from '@angular/core';
import {BaseContextService} from "../../base-context.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
const httpHeaders: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
const httpImageHeaders: HttpHeaders = new HttpHeaders({'Content-Type': 'multipart/form-data' });
import {backendUri} from '../../../common/constants';


@Injectable({
  providedIn: 'root'
})
export class HomeService extends BaseContextService {

  constructor(private http: HttpClient) {
    super();
  }


  getPictureOfTheDayService() {
    return new Promise((resolve, reject) => {
      this.http.get(backendUri + '/api/picOfTheDaySvc')
        .subscribe(
          (data: any) => {
                  if (data.status === 200) {
                    resolve(data);
                  } else {
                    reject('');
                  }
                },
                error => {
                  console.log(`ERROR[getPictureOfTheDayService()]: `, error);
                  reject(error);
                }
      );
    });
  }

  // TODO: NEED TO FIX TO ENABLE API CALLS..
  getPodPicture() {
    return new Promise((resolve, reject) => {
      this.http.get(backendUri + '/api/getPicOfTheDay')
        .subscribe(
          (data: any) => {
            console.log(`WHAT DATA: `, data);
          },
          error => {
            console.log(`ERROR[getPodPicture()]: `, error);
            reject(error);
          }
        );
    });
  }

}
