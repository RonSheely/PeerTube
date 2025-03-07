import { Injectable, inject } from '@angular/core'
import { Router } from '@angular/router'
import { AbstractLazyLoadResolver } from './abstract-lazy-load.resolver'
import { Video } from '@app/shared/shared-main/video/video.model'
import { SearchService } from '@app/shared/shared-search/search.service'

@Injectable()
export class VideoLazyLoadResolver extends AbstractLazyLoadResolver<Video> {
  protected router = inject(Router)
  private searchService = inject(SearchService)

  protected finder (url: string) {
    return this.searchService.searchVideos({ search: url })
  }

  protected buildUrl (video: Video) {
    return Video.buildWatchUrl(video)
  }
}
