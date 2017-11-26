# socialProject
Maybe it will be a social network

Now:
1. In sign-up form user should select country, then city (list of cities is changed when user selects country), then user should select school and university (list of schools and universities is also decreased due to the city selection).
2. There are frontend and backend validation.
3. JWT authentication with tokens (info about current user is saved in the localStorage, I also use bcrypt for password).
4. I use guards: canActivate() and canDeactivate().
5. I use routing between components.
6. In sql there are 5 tables now (users, countries, cities, schools, universities).

Later I will add admin-panel and roles to users.