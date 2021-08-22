import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


export interface creds{
  username: string;
  password: string;
};

export interface contactdetails{
  contactname: string;
  phonenumber: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loginRef = new FormGroup({
    username: new FormControl(""),
    password: new FormControl("")
  })

  regRef = new FormGroup({
    firstname: new FormControl(""),
    lastname: new FormControl(""),
    uname: new FormControl(""),
    pwd: new FormControl("")
  })

  contactRef = new FormGroup({
    contactname: new FormControl(""),
    phonenumber: new FormControl("")
  })

  log:boolean = true;
  reg:boolean = false;
  prof:boolean = false;
  msg:string = "";
  msg2:string = "";

  
  accounts:creds[] = [];
  contacts: contactdetails[] = [];

  // credentials:creds = {}
  // //should check against a value in local storage
  // // if present should route to profile page
  // // not not present should ask for correct username pass

  addUser(){
    var newUser = this.regRef.value;

    var addnewuser:creds = {username: newUser.uname , password: newUser.pwd};
    var obj = window.sessionStorage.getItem("accs");

    if( obj == null){
      this.accounts.push(addnewuser);
      window.sessionStorage.setItem("accs", JSON.stringify(this.accounts));
    }
    else{
      this.accounts = JSON.parse(obj);
      this.accounts.push(addnewuser); 
      window.sessionStorage.setItem("accs", JSON.stringify(this.accounts));
    }

    this.log = true;
    this.reg = false;
    this.prof = false;
  }


  validateUser(){

    var obj = window.localStorage.getItem("accs");
    if( obj != null){
      this.accounts = JSON.parse(obj);
    }
    var user = this.loginRef.value;
    var showmsg:boolean = true;

    console.log(this.accounts);

    this.accounts.forEach(cred => { 
      if (cred.username == user.username && cred.password == user.password) {
        window.sessionStorage.setItem('user', user.username);
        this.showProfilePage();
        showmsg = false;
      }
    });

    if(showmsg) {
      this.msg = "Invalid Credentials! Try Again!"
    }
    this.loginRef.reset();
  }

  addContact(){
    var contact = this.contactRef.value;
    let uname = window.sessionStorage.getItem('user');
    var addnewcontact:contactdetails = {contactname: contact.contactname, phonenumber: contact.phonenumber};
    
    let objname: string = `contcs-${uname}`;
    var obj = window.sessionStorage.getItem(objname);

    if (obj == null) {
      this.contacts.push(addnewcontact);
      window.sessionStorage.setItem(objname, JSON.stringify(this.contacts));
    }
    else {
      this.contacts = JSON.parse(obj);
      this.contacts.push(addnewcontact);
      window.sessionStorage.setItem(objname, JSON.stringify(this.contacts));
    }
  }

  showContacts(){

    let uname = window.sessionStorage.getItem('user');
    let objname:string = `contcs-${uname}`;
    this.contacts = [];
    console.log(objname);
    let obj1 = window.sessionStorage.getItem(objname);
    console.log(obj1);

    if( obj1 != null){
      this.contacts = JSON.parse(obj1);
    }

    var tableContent: string = "";
    var headerTable: string = "<table border=1 style= 'margin: auto'> <tr> <th>Contact Name</th> <th>Phone Number</th> </tr>";

    if (this.contacts != null) {
      this.contacts.forEach((element) => {
        tableContent = tableContent + "<tr><td>" + element.contactname + "</td><td>" + element.phonenumber + "</td></tr>";
      });
    }

    var endTable = "</table>";

    tableContent = headerTable + tableContent + endTable;

    document.getElementById("contactdeets")!.innerHTML = tableContent;
  }


  showRegPage(){
      this.log = false;
      this.reg = true;
      this.prof = false;
  }

  showLoginPage(){
    this.log = true;
    this.reg = false;
    this.prof = false;
  }

  showProfilePage(){

    var user = window.sessionStorage.getItem("user");
    this.msg2 = `Welcome ${user}`;

    this.log = false;
    this.reg = false;
    this.prof = true;
  }
}
