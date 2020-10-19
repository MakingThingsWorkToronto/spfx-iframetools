import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import Iframetools from './components/Iframetools';
import emptytools from './components/emptytools';
import styles from './components/Iframetools.module.scss';
import * as strings from 'IframetoolsWebPartStrings';

export interface IIframetoolsWebPartProps {
  hideControls: boolean;
}

export default class IframetoolsWebPart extends BaseClientSideWebPart <IIframetoolsWebPartProps> {

  public render(): void {
    
    let element : JSX.Element = null;
    const inIFrame : boolean = window.location !== window.parent.location;

    if(this.displayMode == DisplayMode.Edit){
      element = React.createElement(Iframetools, {});
      console.log("iFrame Tools: In edit mode");
    } else if(this.properties.hideControls && inIFrame ){
      element = React.createElement(emptytools, {});
      this._hideSelf();
      this._hideControls();
      console.log("iFrame Tools: Firing up iframe tools");
    } else {
      this._hideSelf();
      console.log("iFrame Tools: Doing nothing, should we hide controls: " + this.properties.hideControls + " are we in iframe: " + inIFrame);
    }

    ReactDom.render(element, this.domElement);

  }
  
  private _hideSelf() : void {
    const section = this._findAncestor(this.domElement, ".ControlZone");
    if(section) section.style.display = "none";
  }

  private _hideControls() : void {
    window.setInterval(()=>{
      if(document.body.className.indexOf(styles.hideInIframe) === -1) {
        document.body.className += " " + styles.hideInIframe;
        console.log("iFrame Tools: Hiding Content.");
      }
    },1000);
  }

  private _findAncestor (el:any, sel:string) {
    while ((el = el.parentElement) && !((el.matches || el.matchesSelector).call(el,sel)));
    return el;
}

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupName: strings.GroupName,
              groupFields: [
                PropertyPaneToggle('hideControls', {
                  key: "hideControls",
                  label: strings.ToggleHiderLabel,
                  checked: this.properties.hideControls
                })
              ]
            }
          ]
        }
      ]
    };
  }

}
