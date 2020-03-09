import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YoutubeService, UserService } from '../_services';
import { faThumbsUp, faThumbsDown, faEye } from '@fortawesome/free-solid-svg-icons';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-channel-details',
  templateUrl: './channel-details.component.html',
  styleUrls: ['./channel-details.component.scss'],
  providers: [NgbRatingConfig]
})
export class ChannelDetailsComponent implements OnInit {
  videoId;
  videoUrl;
  videoThumbnailUrl;
  apiResponse: any;
  videoInfo: any;
  selectedRate = 0;
  rateCtrl: FormControl = new FormControl('');
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faEye = faEye;
  addedToFav: boolean;
  constructor(
    private youTubeService: YoutubeService,
    private route: ActivatedRoute,
    private userService: UserService,
    config: NgbRatingConfig) {
    config.max = 5;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.videoId = params.id;
      this.videoUrl = `https://www.youtube.com/embed/${this.videoId}?enablejsapi=1`;
      this.videoInformation(this.videoId);
    });

    this.rateCtrl.valueChanges.subscribe(value => {
      this.rateVideo(value);
    });

    const videos = this.youTubeService.get('vidoes');
    const favoriteList = this.youTubeService.get('favoriteList');
    if (videos !== null) {
      const ratedVideoIndex = this.youTubeService.get('vidoes').findIndex((video) => video.id === this.videoId);
      this.selectedRate = videos[ratedVideoIndex].rate;
    }
    if (favoriteList !== null) {
      const favoriteVideoIndex = this.youTubeService.get('favoriteList').findIndex((video) => video.id === this.videoId);
      if (favoriteVideoIndex > -1) {
        this.addedToFav = true;
      }
    }
  }

  videoInformation(id) {
    this.youTubeService.getVideoInfo(id).subscribe((res: any) => {
      this.apiResponse = res;
      this.videoThumbnailUrl = res.items[0].snippet.thumbnails.high.url;
      this.videoInfo = res.items[0];
    }, this.onError);
  }

  thumbVideo(rate: string) {
    this.userService.signIn();
    if (this.userService.isUserSignedIn) {
      this.youTubeService.rateVideo(this.videoId, rate, this.userService.getToken()).subscribe(res => {
        console.log(res);
      }, this.onError);
    } else {
      this.userService.signIn();
    }
  }

  onError(err) {
    console.error(err);
  }

  rateVideo(event: number) {
    if (event !== null) {
      const videos = this.youTubeService.get('vidoes');
      if (videos !== null) {
        const ratedVideoIndex = this.youTubeService.get('vidoes').findIndex((video) => video.id === this.videoId);
        if (ratedVideoIndex > -1) {
          videos[ratedVideoIndex].rate = event;
          this.youTubeService.set('vidoes', videos);
        } else {
          const newVideo = {
            id: this.videoId,
            rate: event
          };
          videos.push(newVideo);
          this.youTubeService.set('vidoes', videos);
        }
      } else {
        this.youTubeService.set('vidoes', [{
          id: this.videoId,
          rate: event
        }]);
      }
    }
  }

  addToFavorite() {
    const favoriteList = this.youTubeService.get('favoriteList');
    if (favoriteList !== null) {
      const favoriteVideoIndex = this.youTubeService.get('favoriteList').findIndex((video) => video.id === this.videoId);
      if (favoriteVideoIndex > -1) {
        favoriteList.splice(favoriteVideoIndex, 1);
        this.addedToFav = false;
        this.youTubeService.set('favoriteList', favoriteList);
      } else {
        const newVideo = {
          id: this.videoId,
          rate: this.selectedRate,
          addFlag: true
        };
        favoriteList.push(newVideo);
        this.addedToFav = true;
        this.youTubeService.set('favoriteList', favoriteList);
      }
    } else {
      this.addedToFav = true;
      this.youTubeService.set('favoriteList', [{
        id: this.videoId,
        rate: this.selectedRate,
        addFlag: true
      }]);
    }
  }

}
