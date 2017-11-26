import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable }                           from 'rxjs/Rx';
import { User }                                 from '../user';
import { Country }                              from '../country';
import { City }                                 from '../city';
import { Router }                               from '@angular/router';
import { AuthService }                          from '../auth.service';
import { DataService }                          from '../data.service';
import { count }                                from 'rxjs/operators/count';
import { University }                           from '../university';
import { School }                               from '../school';
import { ComponentCanDeactivate }               from '../guards/save-data.guard';
import { CodegenComponentFactoryResolver }      from '@angular/core/src/linker/component_factory_resolver';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {

  user: User;
  users: User[];
  model: any = {};
  loading = false;
  returnUrl: string;

  message: string = '';

  countries: Country[];

  cities: City[];
  newCities: City[];

  universities: University[];
  newUniversities: University[];

  schools: School[];
  newSchools: School[];

  constructor(
    private router: Router,
    private authService: AuthService,
    private dataService: DataService
  ) {
    this.user = new User();
  }

  ngOnInit() {
    this.dataService.getCountries()
      .subscribe(countries => {
        this.countries = countries;
      });

    this.dataService.getCities()
      .subscribe(cities => {
        this.cities = cities;
        this.newCities = cities;
      });

    this.dataService.getUniversities()
      .subscribe(universities => {
        this.universities = universities;
        this.newUniversities = universities;
      });

    this.dataService.getSchools()
      .subscribe(schools => {
        this.schools = schools;
        this.newSchools = schools;
      });
  }

  canDeactivate(): boolean | Observable<boolean> {
    console.log("candeactivate");
    if (this.loading === false) {
      console.log("if");
      return confirm("Are you sure to leave this page? Some data haven't been saved yet.");
    }
    else {
      console.log("else");
      return true;
    }
  }

  registerUser(user) {
    this.loading = true;
    console.log("user", user);
    if (user.password !== user.passwordConfirm) {
      this.loading = false;
      this.message = "Different passwords! Check data you entered some seconds ago.";
    }
    else {
      this.authService.registerUser(user)
        .subscribe((content) => {
          console.log("content", content);
          if (content['success']==true) {
            this.router.navigate(['/profile']);
            this.authService.setUser(user);
          } else {
            this.loading = false;
            console.log("mistake");
            this.message = content['message'];
          }
        })
    }
  }


  getCitiesByCountryId(countryId: string): City[] {
    console.log("cities", this.cities);
    this.newCities = this.cities.filter(function (city) {
      return city.country_id === parseInt(countryId, 10);
    });
    if (this.newSchools || this.newUniversities) {
      this.getUniversitiesByCityId(this.newCities[0].id.toString());
      this.getSchoolsByCityId(this.newCities[0].id.toString());
    }
    return this.newCities;
  }

  getSchoolsByCityId(cityId: string): any {
    this.newSchools = this.schools.filter(function (school) {
      return school.city_id === parseInt(cityId, 10);
    });
    return this.newSchools;
  }

  getUniversitiesByCityId(cityId: string): any {
    this.newUniversities = this.universities.filter(function (university) {
      return university.city_id === parseInt(cityId, 10);
    });
    return this.newUniversities;
  }
}
