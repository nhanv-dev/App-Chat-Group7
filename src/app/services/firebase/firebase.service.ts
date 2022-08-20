import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  tests: Observable<any[]> | undefined;

  constructor(private afs: AngularFirestore) {
  }

  getTests() {
    this.tests = this.afs.collection('test').valueChanges();
    return this.tests;
  }

}
