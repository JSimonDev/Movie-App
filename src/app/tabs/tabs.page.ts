import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private storageService: StorageService) {}

  get getFavorites() {
    return this.storageService.getlocalMovies
  }

}
