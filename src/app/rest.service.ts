import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../app/app.config';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    public http: HttpClient
  ) {
    console.log('Hello RestProvider Provider');
  }
  post1(action:any, data:any) {
    var headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    // headers.append('Access-Control-Allow-Origin', '*');
    // headers.append(
    //   'Access-Control-Allow-Methods',
    //   'GET, POST, DELETE, PUT, OPTIONS, TRACE, PATCH, CONNECT'
    // );
    // headers.append('Access-Control-Allow-Credentials', 'true');
    // headers.append(
    //   'Access-Control-Allow-Headers',
    //   'Origin, Content-Type, X-Auth-Token, Accept, Authorization, X-Request-With, Access-Control-Request-Method, Access-Control-Request-Headers'
    // );
    if (data.append) {
      data.append('appversion', localStorage.getItem('appversion'));
    } else {
      data.appversion = localStorage.getItem('appversion');
    }

    console.log(this.config.api_base);
    let refUrl: any;
    refUrl = this.config.api_base + action;
    return this.http.post(refUrl, data, { headers: headers });
  }

  post1DeliservLive(action:any, data:any) {
    var headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append(
      'Access-Control-Allow-Methods',
      'GET, POST, DELETE, PUT, OPTIONS, TRACE, PATCH, CONNECT'
    );
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append(
      'Access-Control-Allow-Headers',
      'Origin, Content-Type, X-Auth-Token, Accept, Authorization, X-Request-With, Access-Control-Request-Method, Access-Control-Request-Headers'
    );
    data.append('mobileMarker', '111');
    console.log('https://www.angalan.com/public/api/');
    let refUrl: any;
    refUrl = 'https://www.angalan.com/public/api/' + action;
    return this.http.post(refUrl, data, { headers: headers });
  }

  postRaw(url:any) {
    var headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append(
      'Access-Control-Allow-Methods',
      'GET, POST, DELETE, PUT, OPTIONS, TRACE, PATCH, CONNECT'
    );
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append(
      'Access-Control-Allow-Headers',
      'Origin, Content-Type, X-Auth-Token, Accept, Authorization, X-Request-With, Access-Control-Request-Method, Access-Control-Request-Headers'
    );
    console.log(url);
    return this.http.post(url, {}, { headers: headers });
  }

  postRawPaynamics(data:any) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    // headers = headers.append('Authorization', "Basic " + btoa("islatA97:"+"G4bQG7yyh2xA") );//test credentials
    headers = headers.append(
      'Authorization',
      'Basic ' + btoa('islacs8Z:' + 'HB6JSd5Q9at4')
    );
    // let url: any = 'https://payin.payserv.net/paygate/transactions/';//test credentials
    let url: any = 'https://payin.paynamics.net/paygate/transactions/';
    console.log(url);
    return this.http.post(url, data, { headers: headers });
  }

  getRaw(url:any) {
    return this.http.get(url);
  }

  get(url:any) {
    return this.http.get(this.config.api_base + url);
  }
}
