import { Injectable } from '@angular/core';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';
import { data } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  database:SQLiteObject;
  constructor(private sqlite:SQLite) {
    this.sqlite.create({
      name:'todo.db',
      location:'default'
    })
    .then((db:SQLiteObject)=>{
      db.executeSql('create table IF NOT EXISTS todo(ID INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, desc TEXT)',[]);
      this.database=db;
    })
    .catch(e=>console.log(e));
   }
   addTodo(title,desc){
    return this.database.executeSql("insert into todo (title,desc) values ('"+title+"','"+desc+"')").then((data)=>{
      alert('veri eklendi');
      return data;
    });
   }

   getAllTodo(){
    return this.database.executeSql('select * from todo',[]).then((data)=>{
      let todos=[];
      if(data.rows.length>0){
        for(let i=0;i<data.rows.length;i++){
          todos.push({ID:data.rows.item(i).ID,title:data.rows.item(i).title, desc:data.rows.item(i).desc});
        }
      }
        return todos;
    });
   }

   updateTodo(id){
    return this.database.executeSql('select * from todo where ID='+id,[]).then((data)=>{
      let todos = [];
      if(data.rows.length>0){
        for(let i=0;i<data.rows.length;i++){
          todos.push({ID:data.rows.item(i).ID, title:data.rows.item(i).title,desc:data.rows.item(i).desc});    
        }
      }
      return todos;
    });
   }

   updateTodoSave(title,desc,id){
    return this.database.executeSql("update todo set title='"+title+"',desc='"+desc+"'where ID="+id).then((data)=>{
      alert('güncellenme başarılı');
      return data;
    });
   }

   deleteTodo(id){
     this.database.executeSql('delete from todo where ID='+id);
   }
}
