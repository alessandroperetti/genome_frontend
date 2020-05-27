import { Component, OnInit } from '@angular/core';
import { ListFilesService } from '../services/list-files.service';
import { FilesList } from '../models/FilesList';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  filesList: FilesList[] = [];
  showSpinner: boolean;

  constructor(
    private listFilesService: ListFilesService
  ) {
    this.showSpinner = true;
    this.listFilesService.getFilesList().subscribe((files: FilesList[]) => {
      this.showSpinner = false;
      files.forEach(file => {
        this.filesList.push(file);
      });
    });
  }

  ngOnInit(): void { }

}
