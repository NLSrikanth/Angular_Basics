import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { baseURL } from '../shared/baseurl';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Restangular } from 'ngx-restangular';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private restangular: Restangular, 
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }


    getDishes(): Observable<Dish[]> {
      return this.restangular.all('dishes').getList();
    }
  
    getDish(id: number): Observable<Dish> {
      return  this.restangular.one('dishes', id).get();
    }
  
    getFeaturedDish(): Observable<Dish> {
      return this.restangular.all('dishes').getList({featured: true})
        .pipe(map(dishes => dishes[0]));
    }
  
  //   getDishes(): Observable<Dish[]> {
  //     return this.http.get(baseURL + 'dishes')
  //       .map(res => {
  //         return this.processHTTPMsgService.extractData(res);
  // });

    getDishIds(): Observable<number[] | any> {
      return this.getDishes()
        .pipe(map(dishes => dishes.map(dish => dish.id)),
          catchError(error => error ));
    }

    putDish(dish: Dish): Observable<Dish> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      return this.http.put<Dish>(baseURL + 'dishes/' + dish.id, dish, httpOptions)
        .pipe(catchError(this.processHTTPMsgService.handleError));
  
    }
}