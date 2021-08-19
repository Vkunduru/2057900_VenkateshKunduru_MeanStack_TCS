import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExamquestionsService } from './examquestions.service';
import { questionanswer } from './questionanswer.model';
import { question } from './questions.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  questionsList:question[] = [];
  questAns:questionanswer[] = [];
  examForm: FormGroup;
  msg:string = "";

  constructor(public examSer:ExamquestionsService, public form:FormBuilder){
    this.examForm = form.group({});
   }

  ngOnInit(): void {

    this.examSer.getQuestions().subscribe(data =>{
      for( var q of data){
        this.examForm?.addControl(q.quest, this.form.control(""));
        this.questionsList.push(q);
      }
    })
  }

  submit(): void {
    console.log(this.examForm.value);
    var attempt = this.examForm.value;
    this.examSer.getAnswers().subscribe(answers => {
      var j = 0;
      var k = 0;
      for(var answer of answers){
        this.questAns.push(answer);

        var elements = document.getElementsByTagName('span');
        for(j = 4*k ; j < elements.length; j++){
          if(elements[j].innerHTML == answer.correctAns ){
            elements[j].setAttribute('style','color:green');
            break;
          }
        }
        k++;
      }

      var totalscore: number = 0;
      var questions: string[] = Object.keys(attempt);
      
      for (var i = 0; i < questions.length; i++) {
        for (var obj of this.questAns) {
          if (questions[i] == obj.quest) {
            if (attempt[questions[i]] == obj.correctAns) {
              totalscore += 1;
            }
          }
        }
      }

      if (totalscore >= 10) {
        this.msg = `You Passed! ${totalscore}/10`;
      }
      else {
        this.msg = `You Failed! ${totalscore}/10`;
      }

    })    

  }
}
