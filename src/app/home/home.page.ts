import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import {DatabaseService} from '../services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  todos=[];
  constructor(private databaseProvider:DatabaseService,private toast:ToastController) {}
  ngOnInit(): void {}

  ionViewWillEnter(){
    this.loadTodos();
  }

  async presentToast() {
      const toast = await this.toast.create({
        message: 'kayıtlar silindi',
        duration: 2000
      });
      toast.present();
    }
    loadTodos(){
      this.databaseProvider.getAllTodo().then(todos=>{
        this.todos=todos;
      });
    }

    deleteTodo(id){
      this.databaseProvider.deleteTodo(id);
      this.loadTodos();
      this.presentToast();
    }
  }


