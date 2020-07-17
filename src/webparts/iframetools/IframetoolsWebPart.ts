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
      document.body.classList.add(styles.hideInIframe);
      console.log("iFrame Tools: Firing up iframe tools");
    } else {
      console.log("iFrame Tools: Doing nothing, should we hide controls: " + this.properties.hideControls + " are we in iframe: " + inIFrame);
    }

    ReactDom.render(element, this.domElement);

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
