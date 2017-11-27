import { Injectable }              from '@angular/core';
import { Observable }              from 'rxjs/Observable';
import { of }                      from 'rxjs/observable/of';
import { Country }                 from './country';
import { City }                    from './city';
import { University }              from './university';
import { School }                  from './school';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  private serverURL = "http://localhost:3000/entities";

  getCountries(): Observable<Country[]>{
    const url = `${this.serverURL}/getcountries`;
    let countries = this.http.get<Country[]>(url);
    console.log("I found countries", countries);
    return countries;
  }

  getCities(): Observable<City[]>{
    const url = `${this.serverURL}/getcities`;
    let cities = this.http.get<City[]>(url);
    return cities;
  }

  getSchools(): Observable<School[]>{
    const url = `${this.serverURL}/getschools`;
    let schools = this.http.get<School[]>(url);
    return schools;
  }

  getUniversities(): Observable<University[]>{
    const url = `${this.serverURL}/getuniversities`;
    let universities = this.http.get<University[]>(url);
    return universities;
  }
}
