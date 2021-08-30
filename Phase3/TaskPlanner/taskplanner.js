let http = require("http");
let url = require("url");
let fs = require("fs");


let addTaskPage = `
<html>
        <head>

        </head>
        <body>
        <h2>Add Task</h2>
        <form action="addTask">

            <label>EmpID</label>
            <input type="text" name="empid"/><br/>
            <label>TaskID</label>
            <input type="text" name="taskid"/><br/>
            <label>Task</label>
            <input type="text" name="task"/><br/>
            <label>deadline</label>
            <input type="date" name="deadline"/><br/>

            <input type="submit" value="submit"/>
            <input type="reset" value="reset"/> <br/>
            </form>

        </body>
</html>
`
let deleteTaskPage = `
<head>

</head>
<body>
    <h2>Delete Task</h2>
    <form action="deleteTask">

        <label>TaskID</label>
        <input type="text" name="dtaskid"/><br/>
        <input type="submit" value="Delete Task"/>
       <input type="reset" value="reset"/> <br/>

    </form>

</body>
</html> 
`

let listTasksPage = `
<head>

</head>
<body>
    <h2>List Tasks</h2>
    <form action="listTasks">
        <input type="submit" value="List All Tasks"/>
    </form>
</body>
</html>
`

let server = http.createServer((request, response) => {
    let urlInfo = url.parse(request.url, true);
    //console.log(urlInfo)
    //console.log("path "+urlInfo.path)   // path :path name with query details 
    //console.log("pathName"+urlInfo.pathname)    // pathname : only path 
    if (urlInfo.path != "/favicon.ico") {
        if (urlInfo.path == "/") {

            response.write(addTaskPage);
            response.write(deleteTaskPage);
            response.write(listTasksPage);

        } else if (urlInfo.pathname == "/addTask") {
            let newTask = urlInfo.query;

            let tasklist = JSON.parse(fs.readFileSync("tasks.json").toString());

            let result = tasklist.find(t => t.taskid == newTask.taskid);

            if (result == undefined) {
                tasklist.push( {empid:newTask.empid,taskid:newTask.taskid,task:newTask.task,deadline:newTask.deadline});
                fs.writeFileSync("tasks.json",JSON.stringify(tasklist));

                response.writeHead(200, { "content-type": "text/html" });
                response.write("Task Successfully Added");
                response.write(addTaskPage);
                response.write(deleteTaskPage);
                response.write(listTasksPage);


            } else {
                response.writeHead(200, { "content-type": "text/html" });
                response.write("Task ID must be unique!!");
                response.write(addTaskPage);
                response.write(deleteTaskPage);
                response.write(listTasksPage);
            }
        } else if (urlInfo.pathname == "/deleteTask") {
            let deleteTaskid = urlInfo.query;
            let tasklist = JSON.parse(fs.readFileSync("tasks.json").toString());
            let result = tasklist.findIndex(t => t.taskid == deleteTaskid.dtaskid);
            if( result != -1){

                tasklist.splice(result, 1,);
                fs.writeFileSync("tasks.json", JSON.stringify(tasklist));

                response.writeHead(200, { "content-type": "text/html" });
                response.write("Task successfully deleted");
                response.write(addTaskPage);
                response.write(deleteTaskPage);
                response.write(listTasksPage);
            }
            else{
                response.writeHead(200, { "content-type": "text/html" });
                response.write("No task with that task id exists.");
                response.write(addTaskPage);
                response.write(deleteTaskPage);
                response.write(listTasksPage);
            }
        } else if (urlInfo.pathname == "/listTasks") {
            let tasklist = JSON.parse(fs.readFileSync("tasks.json").toString());
            var tC = "";
            var tH = `<table border=1px solid black>  
                        <tr>
                            <th>
                                EMPID
                            </th>
                            <th>
                                TaskID
                            </th>
                            <th>
                                Task
                            </th>
                            <th>
                                Deadline
                            </th>
                        </tr>
                    `
            tasklist.forEach(element => {
                tC += `<tr>
                            <td>
                                ${element.empid}
                            </td>
                            <td>
                                ${element.taskid}
                            </td>
                            <td>
                                ${element.task}
                            </td>
                            <td>
                                ${element.deadline}
                            </td>
                        </tr>`
                
            });
            var tE = `</table>`

            response.write(addTaskPage);
            response.write(deleteTaskPage);
            response.write(listTasksPage);
            response.write(tH + tC + tE);
        }
        else {
            response.write(addTaskPage);
            response.write(deleteTaskPage);
            response.write(listTasksPage);
        }
    }

    response.end();

})

server.listen(9090, () => console.log("Server running on port number 9090"))