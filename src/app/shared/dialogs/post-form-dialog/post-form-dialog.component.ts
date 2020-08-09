import { PostService } from 'src/app/shared/services/post.service';
import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-post-form-dialog',
  templateUrl: './post-form-dialog.component.html',
  styleUrls: ['./post-form-dialog.component.scss']
})
export class PostFormDialogComponent implements OnInit {
  form: FormGroup;
  file;
  constructor(
    private dialogRef: NbDialogRef<PostFormDialogComponent>,
    private formBuilder: FormBuilder,
    private PostService: PostService,
  ) {
    this.form = this.formBuilder.group({
      title: [this.PostService.selectedArticle ? this.PostService.selectedArticle.value.title : '', Validators.required],
      body: [this.PostService.selectedArticle ? this.PostService.selectedArticle.value.body : '', Validators.required],
    });
   }

  ngOnInit(): void {
  }
  uploadImage(event) {
    this.file = event.target.files[0];
  }
  close() {
    this.dialogRef.close();
  }
  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close({...this.form.value, file: this.file});
    }
  }
}
