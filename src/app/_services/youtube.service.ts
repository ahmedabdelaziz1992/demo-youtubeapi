import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private readonly API_KEY: string = 'AIzaSyDxDDFUOfke0MyptxrCg4S_RFCJNBPd-q4';
  API_URL: string = environment.apiUrl;

  constructor(public http: HttpClient) { }

  getChannelVideos(channelId, maxResults): Observable<object> {
    const url = `${this.API_URL}/search?key=${this.API_KEY}&channelId=${channelId}&order=date&part=snippet &type=video,id&maxResults=${maxResults}`;
    return this.http.get(url)
      .pipe(map((res) => {
        return res;
      }));
  }

  getChannelByName(channelName: string): Observable<object> {
    const url = `${this.API_URL}/channels?key=${this.API_KEY}&forUsername=${channelName.replace(/\s/g, '')}&part=id`;
    return this.http.get(url)
      .pipe(map((res) => {
        return res;
      }));
  }

  getVideoInfo(id: string) {
    const url = `${this.API_URL}/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${this.API_KEY}`;
    return this.http.get(url)
      .pipe(map((res) => {
        return res;
      }));
  }

  // To Like and Dislike From YoutubeAPI
  rateVideo(videoId, rate, authtoken) {
    const url = `${this.API_URL}/videos/rate?id=${videoId}&rating=${rate}&key=${this.API_KEY}`;
    return this.http.post(url, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authtoken}`
      })
    });
  }

  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  get(key: string) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }

}
