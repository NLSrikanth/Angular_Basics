import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
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
export class LeaderService {

  constructor(private restangular: Restangular, 
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

    getLeaders(): Observable<Leader[]> {
      return this.restangular.all('leaders').getList();
    }
  
    getLeader(id: number): Observable<Leader> {
      return  this.restangular.one('leaders', id).get();
    }
  
    getFeaturedLeader(): Observable<Leader> {
      return this.restangular.all('leaders').getList({featured: true})
        .pipe(map(leaders => leaders[0]));
    }

  // getLeaders(): Observable<Leader[]> {
  //   return of(LEADERS);
  // }

  // getLeader(id: number): Observable<Leader> {
  //   return of(LEADERS.filter((leader) => (leader.id === id))[0]);
  // }

  // getFeaturedLeader(): Observable<Leader> {
  //   return of(LEADERS.filter((leader) => leader.featured)[0]);
  // }

}
