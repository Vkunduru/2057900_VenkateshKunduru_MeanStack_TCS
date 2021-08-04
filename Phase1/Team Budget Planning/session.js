var budgetarray = [];
var singlebudget;

function addBudget(){

  singlebudget = { clientName: document.getElementById("BudgetForm").elements[0].value, projectName:document.getElementById("BudgetForm").elements[1].value, budget:document.getElementById("BudgetForm").elements[2].value};
  // console.log(singlebudget);
  budgetarray.push(singlebudget);
  console.log(budgetarray);
  if(window.localStorage.getItem('budgets') === null){
    window.localStorage.setItem( 'budgets', JSON.stringify(budgetarray) );
  }
  else{
    budgetarray = JSON.parse(window.localStorage.getItem('budgets'));
    budgetarray.push(singlebudget);
    window.localStorage.setItem( 'budgets', JSON.stringify(budgetarray) );
  }

}

function showBudget(){
  let obj = window.localStorage.getItem("budgets");
  let objJSON = JSON.parse(obj);
  var totalBudget = 0;

  var tableContent="";
  var headerTable ="<table border=1 style= 'margin: auto'> <tr> <th>Client Name</th> <th>Project Name</th> <th>Budget</th> </tr>";

  if(objJSON != null){
    objJSON.forEach( (element) =>{
      tableContent = tableContent + "<tr><td>"+element.clientName+"</td><td>"+element.projectName+"</td><td>"+element.budget+"</td></tr>";
      totalBudget = totalBudget + eval(element.budget);
    } );
  }
    
  var endTable="</table>";

  tableContent = headerTable+tableContent+endTable;

  document.getElementById("annualbudget").innerHTML= tableContent + "<br/> The total annual budget is: " + totalBudget;

}

function clearBudget(){
    window.localStorage.clear();
    showBudget();

}
