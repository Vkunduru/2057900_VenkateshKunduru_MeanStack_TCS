import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';



export interface task{
  id:string;
  name:string;
  taskname:string;
  deadline:Date;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  Tasks:task[] = [];

  addTask(taskRef: NgForm) {
    let newTask = taskRef.value;
    console.log(newTask);

    this.Tasks.push(newTask);

    var tableContent: string = "";
    var headerTable: string = "<table border=1 style= 'margin: auto'> <tr> <th>Emp ID</th> <th>Name</th> <th>Task Details</th> <th>Deadline Date</th></tr>";

    if (this.Tasks != null) {
      this.Tasks.forEach((element) => {
        tableContent = tableContent + `<tr><td> ${element.id} </td><td> ${element.name} </td> <td> ${element.taskname} </td> <td> ${element.deadline} </td> </tr>`;
      });
    }
    var endTable = "</table>";

    tableContent = headerTable + tableContent + endTable;

    document.getElementById("taskslist")!.innerHTML = tableContent;
  }

}
