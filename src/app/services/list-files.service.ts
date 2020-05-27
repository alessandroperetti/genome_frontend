import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { FilesList } from '../models/FilesList';

@Injectable({
  providedIn: 'root'
})
export class ListFilesService {

  constructor(
    private httpClient: HttpClient
  ) {}

  getFilesList(): Observable<FilesList[]> {
    return this.httpClient.get<FilesList[]>(`${environment.serverURL}${environment.list}`);
  }
}
