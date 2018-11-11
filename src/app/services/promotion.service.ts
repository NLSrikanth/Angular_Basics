import { Injectable } from '@angular/core';

import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { baseURL } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Restangular } from 'ngx-restangular';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private restangular: Restangular, 
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

    getPromotions(): Observable<Promotion[]> {
      return this.restangular.all('promotions').getList();
    }
  
    getPromotion(id: number): Observable<Promotion> {
      return  this.restangular.one('promotions', id).get();
    }
  
    getFeaturedPromotion(): Observable<Promotion> {
      return this.restangular.all('promotions').getList({featured: true})
        .pipe(map(promotions => promotions[0]));
    }

  // getPromotions(): Observable<Promotion[]> {
  //   return of(PROMOTIONS);
  // }

  // getPromotion(id: number): Observable<Promotion> {
  //   return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]);
  // }

  // getFeaturedPromotion(): Observable<Promotion> {
  //   return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]);
  // }
}
