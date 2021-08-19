import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http'
import { question } from './questions.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamquestionsService{

  constructor(public http:HttpClient) {
    
   }

   getQuestions() {
     return this.http.get<question[]>("/assets/questionlist.json");
   }

   getAnswers(){
     return this.http.get<question[]>("/assets/questionanswers.json")
   }
}
