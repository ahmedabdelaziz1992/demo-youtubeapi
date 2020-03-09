import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { map, debounceTime, filter, distinctUntilChanged } from 'rxjs/operators';
import { NgbdSortableHeaderDirective, SortEvent, compare } from '../_helpers/sortableHeader.directive';
import { YoutubeService } from '../_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DecimalPipe]
})
export class HomeComponent implements OnInit {
  apiResponse: any;
  videos: any[];
  channelId: string;
  channelName: FormControl = new FormControl();
  filter: FormControl = new FormControl();
  @ViewChildren(NgbdSortableHeaderDirective) headers: QueryList<NgbdSortableHeaderDirective>;
  // Pagination
  page = 1;
  pageSize = 10;
  collectionSize;

  constructor(private youTubeService: YoutubeService) {
  }

  ngOnInit(): void {
    this.videos = [];
    this.searchByChannel();
    this.filterByTitle();

    this.initWithFavChannel('Amr Diab');
  }

  filterByTitle() {
    this.filter.valueChanges.subscribe(value => {
      // Go to first page in pagination in order to see the results
      this.page = 1;
      if (value !== '') {
        this.videos = this.videos.filter(video => {
          const term = value.toLowerCase();
          return video.snippet.title.toLowerCase().indexOf(term) > -1;
        });
      } else {
        this.videos = this.apiResponse.items;
      }
    });
  }

  initWithFavChannel(text) {
    this.youTubeService.getChannelByName(text).subscribe((res: any) => {
      const channelId = res.items[0]?.id;
      this.getChannelData(channelId, 50);
    }, (err) => {
      console.log('error', err);
    });
  }

  searchByChannel() {
    this.channelName.valueChanges
      .pipe(
        // get value
        map((value: any) => {
          return value;
        }),
        // if character length greater then 2
        filter(res => res.length > 2),
        // Time in milliseconds between key events
        debounceTime(1000),
        // If previous query is diffent from current
        distinctUntilChanged()
        // subscription for response
      ).subscribe((text: string) => {
        this.youTubeService.getChannelByName(text).subscribe((res: any) => {
          const channelId = res.items[0]?.id;
          this.getChannelData(channelId, 50);
        }, (err) => {
          console.log('error', err);
        });
      });
  }

  getChannelData(channelId, maxResults) {
    this.youTubeService.getChannelVideos(channelId, maxResults).subscribe((res: any) => {
      this.videos = res.items;
      this.apiResponse = res;
      this.collectionSize = this.videos.length;
      this.youTubeService.set('channel', res.items);
    }, (err) => {
      console.log(err);
    });
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting videos
    if (direction === '') {
      this.videos = this.videos;
    } else {
      this.videos = [...this.videos].sort((a, b) => {
        const res = compare(a.snippet[column], b.snippet[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

}
