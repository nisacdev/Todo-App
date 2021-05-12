import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  todo ={};
  constructor(private databaseProvider:DatabaseService, private router:Router, private toast:ToastController) { }

  ngOnInit() {}
    async presentToast(){
      const toast=await this.toast.create({
        message:'Kayıt başarıyla eklendi',
        duration:2000
      });
      toast.present();
    }
    addTodo(){
      this.databaseProvider.addTodo(this.todo['title'], this.todo['desc']).then((data)=>{
        alert("Veriler eklendi");
      }).catch(e=>console.log(JSON.stringify(e)));
      this.presentToast();
      this.todo={};
      this.router.navigate(['/']);
    }

}
