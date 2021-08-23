import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {EmployeeService} from '../shared/employee.service';
@Component({
  selector: 'app-table-crud-action',
  templateUrl: './table-crud-action.component.html',
   styleUrls: ['./table-crud-action.component.scss']
 
})
export class TableCrudActionComponent implements OnInit {
  public submitted: boolean = false;
  employeeDetails = [];
  response : any;
  action = 'create';
  constructor(private fb: FormBuilder, private employeeService : EmployeeService
    ) { }
  display = "none";
  ngOnInit() {
    this.getEmployee()
   }

   AddEmployeeForm = this.fb.group({
     id : [''],
    firstName: ['', Validators.compose([Validators.required])],
    lastName: ['', Validators.compose([Validators.required])],
    email: ['', Validators.compose([Validators.required])],
    mobileNo: ['', Validators.compose([Validators.required])],
    salary: ['', Validators.compose([Validators.required])],

  });
  getEmployee() {
    this.employeeService.getEmployee().subscribe((res:any)=>{
      this.response = res;
      
      
      
    })
  }
  AddEmployee(data){
    if(!this.AddEmployeeForm.valid){
      this.submitted = true
      return
    }
    else {
      let id;
      let param ={
        "firstName" : this.AddEmployeeForm.value.firstName,
        "lastName" : this.AddEmployeeForm.value.lastName,
        "email" : this.AddEmployeeForm.value.email,
        "mobileNo" : this.AddEmployeeForm.value.mobileNo,
        "salary" : this.AddEmployeeForm.value.salary,
      }
      console.log(param);
      if(data == 'create') {
        this.employeeService.AddEmployee(param).subscribe(res=>{
          console.log(res);
          this.ngOnInit();
          this.onCloseHandled();
        })
   
      }
      else if(data == 'update') {
        console.log(this.AddEmployeeForm,'id');
        
        this.employeeService.updateEmployee(param,this.AddEmployeeForm.value.id).subscribe((res)=>{
          console.log(res);
          this.ngOnInit();
          this.onCloseHandled();
        })
      }   
    }
  }

  editEmployee(employee){
    this.action = 'update';
    console.log(employee);
    
    this.openModal(this.action);
    this.AddEmployeeForm.setValue({
      id:employee.id,
      firstName : employee.firstName,
      lastName : employee.lastName,
      email : employee.email,
      mobileNo : employee.mobileNo,
      salary : employee.salary,
    })
  }
  deleteEmployee(employee) {
    this.response.forEach((element,index) => {
      if(element.id == employee.id) {
        this.employeeService.deleteEmployee(element.id).subscribe(res =>{
          this.response.splice(index,1)
          this.ngOnInit()
        })
        
      }
    });

  }
  openModal(data?) {
    data == 'update' ? this.action = 'update' : this.action = 'create';    
    this.AddEmployeeForm.reset();
    this.submitted = false
    this.display = "block";
  }
  onCloseHandled() {
    this.AddEmployeeForm.reset();
    this.submitted = false
    this.display = "none";
  }
}