import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) {
   }
url : string = "http://localhost:3000/employess";

   getEmployee(){
     return this.http.get(this.url)
   }

   updateEmployee(data:any,id) {
    let path = 'http://localhost:3000/employess/' + id;
     return this.http.put(path,data)
   }

   AddEmployee(data:any) {
   let path = 'http://localhost:3000/employess';
    return this.http.post(this.url,data)
  }

  deleteEmployee(id) {
    let path = 'http://localhost:3000/employess/' + id;
     return this.http.delete(path)
   }
}
