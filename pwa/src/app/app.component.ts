import { Component } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private toastController: ToastController,
    ) {

  }

  async ngOnInit(){
    if (this.platform.is("ios")) {
      const updateToast = await this.toastController.create({
        duration: 60000,
        message:
          "Instale esta aplicación web en su teléfono: toque el ícono Compartir en la parte inferior central y luego seleccione 'Agregar a la pantalla de inicio'.",
        buttons: [
          {
            text: "Ok",
            role: "Ok",
            side: "start",
          },
          {
            icon: "share",
            role: "share",
            side: "end",
          },
        ],
        color: "dark",
      });
      await updateToast.present();
      let res = await updateToast.onDidDismiss();
    }
  }
}
