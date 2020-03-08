import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  apiKey: string = environment.apiKey;

  constructor(public http: HttpClient) { }

  /*
  List Channel by User Name
  'https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&forUsername={GoogleDevelopers}&key={YOUR_API_KEY}'

  Get Channel cover
  https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&forUsername={USERNAME}&key={YOUR_API_KEY}

  user name + cover
  'https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics%2CbrandingSettings&forUsername={GoogleDevelopers}&key={YOUR_API_KEY}'
  */

  // tslint:disable-next-line:ban-types
  getChannelVideos(channelId, maxResults): Observable<object> {
    // tslint:disable-next-line:max-line-length
    const url = `https://www.googleapis.com/youtube/v3/search?key=${this.apiKey}&channelId=${channelId}&order=date&part=snippet &type=video,id&maxResults=${maxResults}`;
    return this.http.get(url)
      .pipe(map((res) => {
        return res;
      }));
  }

  getChannelByName(channelName: string): Observable<object> {
    console.log(channelName.replace(/\s/g, ''));
    // tslint:disable-next-line:max-line-length
    const url = `https://www.googleapis.com/youtube/v3/channels?key=${this.apiKey}&forUsername=${channelName.replace(/\s/g, '')}&part=id`;
    // const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&forUsername=${name}&key=${this.apiKey}`;
    return this.http.get(url)
      .pipe(map((res) => {
        return res;
      }));
  }

  getVideoInfo(id: string) {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${this.apiKey}`;
    return this.http.get(url)
      .pipe(map((res) => {
        return res;
      }));
  }
}
