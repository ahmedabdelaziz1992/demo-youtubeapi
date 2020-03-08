import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YoutubeService } from '../_services';
import { faThumbsUp, faThumbsDown, faEye } from '@fortawesome/free-solid-svg-icons';

let data = {
  "kind": "youtube#videoListResponse",
  "etag": "\"SJZWTG6xR0eGuCOh2bX6w3s4F94/YP1M9DatMesCOEx5qqMA7oDIyHc\"",
  "pageInfo": {
    "totalResults": 1,
    "resultsPerPage": 1
  },
  "items": [
    {
      "kind": "youtube#video",
      "etag": "\"SJZWTG6xR0eGuCOh2bX6w3s4F94/7zPX2Toz-ePAHB7ujHZzlPRw2z4\"",
      "id": "5C9S0V28aqQ",
      "snippet": {
        "publishedAt": "2020-02-18T13:29:42.000Z",
        "channelId": "UCpui0-2JqcAcII4ybpB1q3w",
        "title": "Amr Diab - Rooh | عمرو دياب - روح",
        "description": "Amr Diab - Rooh | عمرو دياب - روح\n\nAmr Diab - Rooh, from album \"#Sahran\" Produced by #Nay ©2020. \n\nGet it now: https://amrdiab.lnk.to/Sahran\n\nLyrics: Ahmed Zaghlool\nComposer: Ahmed Zaghlool\nMusic Arranger & Mixage: Osama Elhendy\n\nOfficial Facebook: http://www.facebook.com/AmrDiab\nOfficial Twitter: http://www.twitter.com/AmrDiab\nOfficial Instagram: http://instagram.com/amrdiab\nOfficial Website: http://www.AmrDiab.net",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/5C9S0V28aqQ/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/5C9S0V28aqQ/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/5C9S0V28aqQ/hqdefault.jpg",
            "width": 480,
            "height": 360
          },
          "standard": {
            "url": "https://i.ytimg.com/vi/5C9S0V28aqQ/sddefault.jpg",
            "width": 640,
            "height": 480
          },
          "maxres": {
            "url": "https://i.ytimg.com/vi/5C9S0V28aqQ/maxresdefault.jpg",
            "width": 1280,
            "height": 720
          }
        },
        "channelTitle": "Amr Diab",
        "categoryId": "10",
        "liveBroadcastContent": "none",
        "defaultLanguage": "en",
        "localized": {
          "title": "Amr Diab - Rooh | عمرو دياب - روح",
          "description": "Amr Diab - Rooh | عمرو دياب - روح\n\nAmr Diab - Rooh, from album \"#Sahran\" Produced by #Nay ©2020. \n\nGet it now: https://amrdiab.lnk.to/Sahran\n\nLyrics: Ahmed Zaghlool\nComposer: Ahmed Zaghlool\nMusic Arranger & Mixage: Osama Elhendy\n\nOfficial Facebook: http://www.facebook.com/AmrDiab\nOfficial Twitter: http://www.twitter.com/AmrDiab\nOfficial Instagram: http://instagram.com/amrdiab\nOfficial Website: http://www.AmrDiab.net"
        },
        "defaultAudioLanguage": "ar"
      },
      "contentDetails": {
        "duration": "PT4M24S",
        "dimension": "2d",
        "definition": "hd",
        "caption": "false",
        "licensedContent": true,
        "projection": "rectangular"
      },
      "statistics": {
        "viewCount": "3019908",
        "likeCount": "48051",
        "dislikeCount": "1004",
        "favoriteCount": "0",
        "commentCount": "329"
      }
    }
  ]
};


@Component({
  selector: 'app-channel-details',
  templateUrl: './channel-details.component.html',
  styleUrls: ['./channel-details.component.scss']
})
export class ChannelDetailsComponent implements OnInit {
  videoId;
  videoUrl;
  apiResponse: any;
  videoInfo: any;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faEye = faEye;
  constructor(private youTubeService: YoutubeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.videoId = params.id;
      this.videoUrl = `https://www.youtube.com/embed/${this.videoId}?enablejsapi=1`;
      this.videoInformation(this.videoId);
    });
  }

  videoInformation(id) {
    this.youTubeService.getVideoInfo(id).subscribe((res: any) => {
      this.apiResponse = res;
      this.videoInfo = res.items[0];
    }, (err) => {
      console.log('error', err);
    });
  }

}
