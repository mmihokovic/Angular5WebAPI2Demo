import { Component, Inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router, NavigationStart } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  selector: 'upload-dialog',
  templateUrl: 'upload-dialog.component.html',
  styleUrls: ['upload-dialog.component.css']
})
export class UploadDialogComponent implements OnInit{
  title: string;
  message: string;
  acceptedFileTypes: string;
  form: FormGroup;
  loading: boolean = false;
  fileName: string;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UploadDialogComponent>,
    private router: Router,
    private fb: FormBuilder) {

    this.title = data.title;
    this.message = data.message;
    this.acceptedFileTypes = data.acceptedFileTypes ? data.acceptedFileTypes : "*.*";
    this.fileName = "";

    document.body.style.overflowX = "initial";

    this.createForm();
  }

  ngOnInit() {
    this.router.events
      .map(event => event instanceof NavigationStart)
      .subscribe(() => {
        this.dialogRef.close(false);
      });
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      file: null
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.form.get('file').setValue(file);
      this.fileName = file.name;
    }
  }

  private prepareSave(): any {
    return this.form.get('file').value;
  }

  clearFile() {
    this.form.get('file').setValue(null);
    this.fileName = "";
    this.fileInput.nativeElement.value = '';
  }

  yesClick() {
    const formModel = this.prepareSave();
    this.dialogRef.close(formModel);
  }

  noClick() {
    this.dialogRef.close(false);
  }
}
