import { UploadService } from '../upload.service'
import { Component, OnInit, ViewChild } from '@angular/core'


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent {

  @ViewChild('file') file
  public files: Set<File> = new Set()
  public progress;
  public upload = false;
  public showCancelButton = true;
  public uploading = false;
  public uploadSuccessful = false;
  public cancel = false;

  constructor(public uploadService: UploadService) { }

  addFiles() {
    this.file.nativeElement.click();
  }

  onFilesAdded() {
    this.upload = true;
    this.cancel = true;
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }
    console.log("Files: ", files);
  }

  cancelFiles() {
    this.files.clear();
    this.upload = false;
    this.cancel = false;
    this.progress = null;
  }

  uploadAction() {

    this.uploading = true;

    this.progress = this.uploadService.upload(this.files);

    let allProgressObservables = [];
    for (let key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
    }

    this.upload = false;

    this.showCancelButton = false;
  }
}