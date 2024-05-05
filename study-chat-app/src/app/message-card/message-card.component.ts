import { HttpClient } from '@angular/common/http';
import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import User from '../_interfaces/user';

@Component({
  selector: 'app-message-card',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './message-card.component.html',
  styleUrl: './message-card.component.scss'
})
export class MessageCardComponent {
  @Input() message?:{content:string, _id:string}
  http:HttpClient = inject(HttpClient);
  userService:UserService = inject(UserService);
  serverAddress:string = "http://localhost:3000/messages";
  isShowingForm:boolean = false;
  showEditForm:string = "edit-form--hide"

  editForm:FormGroup = new FormGroup({
    content: new FormControl("", [
      Validators.required
    ])
  })

  setShowForm(){
    this.isShowingForm = !this.isShowingForm;
    if(this.isShowingForm){
      this.showEditForm = "edit-form"
    }
    else{
      this.showEditForm = "edit-form--hide"
    }
  }

  handleEditFormSubmnit(){
    if(this.editForm.valid){
      this.http.patch(`${this.serverAddress}/${this.message?._id}`, this.editForm.value).subscribe({
        next: ( res ) => {
          const updatedMsg = res as {
            _id: string,
            content: string,
            keywords: string[]
          };
          this.message = updatedMsg;
        },
        error: ( err ) => {
          if(err){
            console.log(err);
          }
        }
      })
      this.editForm.reset();
      this.setShowForm();
    }
  }
  
handleDeleteButton(){
  this.http.delete(`${this.serverAddress}/${this.message?._id}`, {
    body:
    {userID: this.userService.user?._id}
  }).subscribe( {
    next: (res) => {
      const response = res as {
        user:User
      };
      if(this.message){
        document.getElementById(this.message?._id)?.remove();
      }
      this.userService.setUser(response.user);
    },
    error: (err)=> {
      if(err){
        console.log(err);
      }
    }
  }
)
}
  
}
