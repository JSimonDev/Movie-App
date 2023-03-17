import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const URL = environment.videoPath

@Pipe({
  name: 'video'
})
export class VideoPipe implements PipeTransform {

  transform(video: string): string {

    const videoURL = `${URL}${video}`

    return videoURL;
  }

}
