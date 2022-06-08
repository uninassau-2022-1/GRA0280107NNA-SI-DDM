import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})

export class CrudService {
  
  private dbInstance: SQLiteObject;
  readonly db_name: string = "urnaDA.db";
  readonly db_table: string = "userTable";
  USERS: [{user_id: '', name: '', codigo: '', qntvotos: '', porcentagem: ''}] ;
  Votos;
  constructor(
    private platform: Platform,
    private sqlite: SQLite    
  ) { 
    this.databaseConn();
  }

    // Create SQLite database 
    databaseConn() {
        this.platform.ready().then(() => {
          this.sqlite.create({
              name: this.db_name,
              location: 'default'
            }).then((sqLite: SQLiteObject) => {
              this.dbInstance = sqLite;
              sqLite.executeSql(`
                  CREATE TABLE IF NOT EXISTS ${this.db_table} (
                    user_id INTEGER PRIMARY KEY, 
                    name varchar(255),
                    codigo number(2),
                    qntvotos number(20),
                    porcentagem varchar(20)
                  )`, [])
                .then(() => {
                })
                .catch((error) => alert(JSON.stringify(error)));
            })
            .catch((error) => alert(JSON.stringify(error)));
        });   
    }

    // Crud
    public addItem(n, e) {
      // validation
      if (!n.length || !e.length) { 
        alert('Provide both email & name');
        return;
      }
      this.dbInstance.executeSql(`
      INSERT INTO ${this.db_table} (name, email) VALUES ('${n}', '${e}')`, [])
        .then(() => {
          alert("Success");
          this.getCandidates();
        }, (e) => {
          alert(JSON.stringify(e.err));
        });
    }

    public insertCandidate(){
      this.dbInstance.executeSql(`
      INSERT INTO ${this.db_table} (name, codigo, qntvotos, porcentagem) VALUES ('Lula', 13, 0, '0'), ('Bolsonaro', 17, 0, '0'), ('Moro', 20, 0, '0')`, [])
      .then((res) => {
        alert("Sucess");
        this.USERS = res;
      }, (e) => {
        alert(JSON.stringify(e.err));
      })
      return this.USERS;
    }

    public getCandidates() {
      return this.dbInstance.executeSql(`SELECT * FROM ${this.db_table}`, []).then((res) => {
        this.USERS = [{user_id: '', name: '', codigo: '', qntvotos: '', porcentagem: ''}];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            this.USERS.push(res.rows.item(i));
          }
          return this.USERS;
        }
      },(e) => {
        alert(JSON.stringify(e));
      });
    }

    // Get user
    public getVotos(id): Promise<any> {
      return this.dbInstance.executeSql(`SELECT qntvotos FROM ${this.db_table} WHERE codigo = ?`, [id])
      .then((res) => {
        return this.Votos;
      });
    }

    public inserirVotos(id, qntvotos) {
      let data = [qntvotos];
      return this.dbInstance.executeSql(`UPDATE ${this.db_table} SET qntvotos = ? WHERE codigo = ${id}`, data)
    }

    public inserirPorcentagemMoro(id, porcentagem) {
      let data = [porcentagem];
      return this.dbInstance.executeSql(`UPDATE ${this.db_table} SET porcentagem = ? where codigo = ${id}`, data)
    }

    public inserirPorcentagemBolsonaro(id, porcentagem) {
      let data = [porcentagem];
      return this.dbInstance.executeSql(`UPDATE ${this.db_table} SET porcentagem = ? where codigo = ${id}`, data)
    }

    public inserirPorcentagemLula(id, porcentagem) {
      let data = [porcentagem];
      return this.dbInstance.executeSql(`UPDATE ${this.db_table} SET porcentagem = ? where codigo = ${id}`, data)
    }

    // Update
    updateUser(id, name, email) {
      let data = [name, email];
      return this.dbInstance.executeSql(`UPDATE ${this.db_table} SET name = ?, email = ? WHERE user_id = ${id}`, data)
    }  

    // Delete
    deleteUser(user) {
      this.dbInstance.executeSql(`
      DELETE FROM ${this.db_table} WHERE user_id = ${user}`, [])
        .then(() => {
          alert("User deleted!");
          this.getCandidates();
        })
        .catch(e => {
          alert(JSON.stringify(e))
        });
    }

}