import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { environment } from "../../environments/environment"; 

@Injectable({
  providedIn: 'root'
})

export class UploadService {
  FOLDER = 'YUMY';

  constructor() { }

  uploadFile(file) {
    const contentType = file.type;
    const bucket = new S3(
          {
              accessKeyId: 'AKIAYK4TA6G6UUS4ULNM ',
              secretAccessKey: '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',
              region: 'sa-east-1'
          }
      );
      const params = {
          Bucket: 'jsa-angular-engenha',
          Key: this.FOLDER + file.name,
          Body: file,
          ACL: 'public-read',
          ContentType: contentType
      };
      bucket.upload(params, function (err, data) {
          if (err) {
              console.log('There was an error uploading your file: ', err);
              return false;
          }
          console.log('Successfully uploaded file.', data);
          return true;
      });

}
}
