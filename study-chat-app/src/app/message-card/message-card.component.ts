import { HttpClient } from '@angular/common/http';
import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
      // console.log(this.editForm.value);
      // console.log(this.message?._id);

      this.http.patch(`${this.serverAddress}/${this.message?._id}`, this.editForm.value.content).subscribe({
        next: ( res ) => {
          console.log(res);
        },
        error: ( err ) => {
          if(err){
            console.log(err);
          }
        },
        complete: () => {}
      })
      
      /*
        TODO: use ID to send to server
        Edit on server, return to client
        Use return data to change user's savedMessages array
          - import userService
          - use array.proto.findIndex( {callback funct} )
          - replace content of original with new stuff from server
      */
    }
  }
}
