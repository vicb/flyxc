import { html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { modalController } from '@ionic/core/components';

import { version } from 'package.json';

@customElement('about-modal')
export class AboutModal extends LitElement {
  render(): TemplateResult {
    return html`<ion-header>
        <ion-toolbar color="light">
          <ion-title>About flyXC.app</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <h3><ion-text color="primary">flyXC</ion-text></h3>
        <p>
          by <a href="https://github.com/vicb" target="_blank">Victor Berchet</a>,
          <a href="https://github.com/mmomtchev" target="_blank">Momtchil Momtchev</a>,
          <a href="https://github.com/osmeras" target="_blank">Stanislav Ošmera</a>,
          <a href="https://github.com/tris" target="_blank">Tristan Horn</a>,
          <a href="https://github.com/spasutto" target="_blank">Sylvain Pasutto</a>,
          <a href="https://github.com/flyingtof" target="_blank">flyingtof</a>
        </p>

        <p>
          You can contact us by <a href="mailto:contact@flyxc.app?subject=FlyXC" target="_blank">email</a>, or report
          any issue on <a href="https://github.com/vicb/flyxc/issues" target="_blank">github</a>
        </p>

        <ion-button @click=${this.handleCookieSettings}
          ><i class="las la-cookie-bite la-2x"></i> Cookie settings</ion-button
        >

        <ion-text color="medium">
          <ul style="list-style-type: none; padding: 0;">
            <li><em>version ${version}-${__BUILD_TIMESTAMP__}</em></li>
            <li><em>airspace ${__AIRSPACE_DATE__}</em></li>
          </ul>
        </ion-text>

        <h3><ion-text color="primary">Credits</ion-text></h3>

        <ion-text>
          <ul style="list-style-type: square; padding-inline-start: 20px;">
            <li>
              Airspaces are imported from <a href="https://www.openaip.net/" target="_blank">openaip</a>:
              <ion-text color="medium" style="font-style: italic"
                >"OpenAIP data is not certified and must not be used for primary navigation or flight planning. Never
                rely on openAIP data! OpenAIP data contains errors. Using openAIP data may result in serious injury or
                death."</ion-text
              >
            </li>
            <li>
              Thermal layers are generated by <a href="https://thermal.kk7.ch/" target="_blank">Michael von Kanel</a>
            </li>
            <li><a href="https://js.arcgis.com/" target="_blank">JS Arcgis API</a> powers the 3D map</li>
            <li><a href="https://ionicframework.com/" target="_blank">Ionic</a> powers the UI</li>
            <li>Icons are from <a href="https://icons8.com/" target="_blank">Line Awesome</a></li>
            <li>and many more open source libraries, projects, and artwork</li>
          </ul>
        </ion-text>
      </ion-content>
      <ion-footer>
        <ion-toolbar color="light">
          <ion-buttons slot="primary">
            <ion-button @click=${this.dismiss}>Close</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-footer> `;
  }

  protected handleCookieSettings(): void {
    (window as any).klaro?.show();
  }

  protected createRenderRoot(): HTMLElement {
    return this;
  }

  private async dismiss(): Promise<void> {
    const modal = await modalController.getTop();
    await modal?.dismiss();
  }
}
