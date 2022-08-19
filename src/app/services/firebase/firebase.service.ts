import {Injectable} from '@angular/core';
import {Storage, ref, uploadBytesResumable, getDownloadURL} from "@angular/fire/storage";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  public files: any[] = [];
  public downloadURL: string = '';

  constructor(private storage: Storage) {
  }

  chooseFile(event: any) {
    console.log('choose file')
    this.files.push(event.target.files[0])
  }

  addData() {
    console.log('add data');
    this.files.forEach(async (file: any) => {
      const storageRef = ref(this.storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes);
          console.log('Upload is ' + progress + '% done');
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File url: ', downloadURL)
          })
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File url: ', downloadURL)
            this.downloadURL = downloadURL;
            return downloadURL;
          })
        }
      )
      return;
    })
  }

}
