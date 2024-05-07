import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.page.html',
  styleUrls: ['./liste.page.scss'],
})
export class ListePage {
  TodoListe: string[] = [];


 
  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      this.TodoListe = JSON.parse(storedItems);
    }
  }

  async addItem() {
    const alert = await this.alertController.create({
      header: 'Neuen Eintrag hinzufügen',
      inputs: [
        {
          name: 'newItem',
          type: 'text',
          placeholder: 'Neuer Eintrag',
        }
      ],
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          handler: () => {
            console.log('Abgebrochen');
          }
        },
        {
          text: 'Hinzufügen',
          handler: (data) => {
            const newItem = data.newItem.trim();
            if (newItem !== '') {
              this.TodoListe.push(newItem);
              this.save();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'bottom',
    });
  
    await toast.present();
  }

  save() {
    this.presentToast('Der Eintrag wurde hinzugefügt!');
    const itemsAsText = JSON.stringify(this.TodoListe);
    localStorage.setItem('items', itemsAsText);
  }

  reorderItems(ev: any) {
    const element = this.TodoListe[ev.detail.from];
    this.TodoListe.splice(ev.detail.from, 1);
    this.TodoListe.splice(ev.detail.to, 0, element);
    ev.detail.complete(this.TodoListe);
  }

  editItem(index: number) {
    const oldItem = this.TodoListe[index];
    this.alertController.create({
      header: 'Eintrag bearbeiten',
      inputs: [
        {
          name: 'editedItem',
          type: 'text',
          placeholder: 'Bearbeiteter Eintrag',
          value: oldItem
        }
      ],
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel'
        },
        {
          text: 'Speichern',
          handler: (data) => {
            const newItem = data.editedItem.trim();
            if (newItem !== '') {
              this.TodoListe[index] = newItem;
              this.save();
            }
          }
        }
      ]
    }).then(alert => {
      alert.present();
    });
  }
  
  deleteItem(i: number) {
    this.TodoListe.splice(i, 1);
    this.save();
    this.presentToast('Eintrag wurde gelöscht!');
  }
}
