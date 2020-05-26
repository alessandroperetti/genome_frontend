import { Injectable } from '@angular/core'
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';



@Injectable({
  providedIn: 'root',
})
export class UploadService {

  public numFiles: number;

  constructor(
    private http: HttpClient,
    private matSnackBar: MatSnackBar) {}
  
  public upload(files: Set<File>):
    { [key: string]: { progress: Observable<number> } } {

    // this will be the our resulting map
    const status: { [key: string]: { progress: Observable<number> } } = {};
    this.numFiles = files.size;

    files.forEach(file => {
      // create a new multipart-form for every file
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);

      // create a http-post request and pass the form
      // tell it to report the upload progress
      const req = new HttpRequest('POST', environment.serverURL + environment.upload, formData, {
        reportProgress: true
      });

      // create a new progress-subject for every file
      const progress = new Subject<number>();

      // send the http-request and subscribe for progress-updates
      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {

          console.log(event);
          // calculate the progress percentage
          const percentDone = Math.round(100 * event.loaded / event.total);

          // pass the percentage into the progress-stream
          progress.next(percentDone);
        } else if (event instanceof HttpResponse) {
          // Close the progress-stream if we get an answer form the API
          // The upload is complete
          progress.complete();
          this.setNumFiles();
        }
      });

      // Save every progress-observable in a map of all observables
      status[file.name] = {
        progress: progress.asObservable()
      };
    });

    // return the map of progress.observables
    return status;
  }

  private setNumFiles(){
    this.numFiles = this.numFiles - 1; 
    console.log("num: " , this.numFiles);
    if(this.numFiles === 0){
      this.matSnackBar.open('Files have been uploded', 'Undo', {
        duration: 3000
      });
    }
    
  }
}