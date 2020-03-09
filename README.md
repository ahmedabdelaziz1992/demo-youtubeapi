# AssetTask

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.2.

## Development server

Run `npm install` for downloading all the dependancies.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

This app is also hosted on GithubPages. Navigate to `https://achmed4.github.io/demo-youtubeapi/asset-task`.

## Style design

I used sass as preprocessor for styling with the `7-1 architecture pattern`.

## App and Code Structure

The app and code structure of the task mostly follows the best practice recommendations in the official [Angular Style Guide](https://angular.io/guide/styleguide), with a few of my own tweaks here and there.

## The index.ts

The index.ts files in each folder are barrel files that group the exported modules from a folder together so they can be imported using the folder path instead of the full module path and to enable importing multiple modules in a single import (e.g. `import { AuthenticationService, UserService } from '../_services'`).

## Ng Bootstrap

Decided to use ng-bootstrap it has wide range of UI components that built from the ground up using only Bootstrap 4 CSS with APIs designed for the Angular ecosystem.

## Angular Interceptors

Decided to use angular interceptors to control the loader on on every HTTP request.

## The youtube.service

This service responsible for calling the Youtube API V3. It also has the methods for setting and retrieving from the localStorage.

## The user.service

This service responsible for calling `googleAuthService` to signin the user using (ng-gapi) module. In order to make authorized requests to like and dislike videos from the user's Youtube account.

But I decided to stop using it and save data in localStorage since google requires to verify `OAuth consent screen` and authorized domains in order to use authorized scope like `https://www.googleapis.com/auth/youtube.force-ssl`.

## Further help

Don't hesitate to contact me anytime.
