import * as React from 'react';
import styles from './Iframetools.module.scss';
import { IIframetoolsProps } from './IIframetoolsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as strings from 'IframetoolsWebPartStrings';

export default class emptytools extends React.Component<IIframetoolsProps, {}> {
  public render(): React.ReactElement<IIframetoolsProps> {
    return (
      <div className={ styles.hideControl }>Hiding controls</div>
    );
  }
}
