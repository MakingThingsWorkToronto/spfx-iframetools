import * as React from 'react';
import styles from './Iframetools.module.scss';
import { IIframetoolsProps } from './IIframetoolsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as strings from 'IframetoolsWebPartStrings';

export default class Iframetools extends React.Component<IIframetoolsProps, {}> {
  public render(): React.ReactElement<IIframetoolsProps> {
    return (
      <div className={ styles.iframetools }>
        <h1 className={ styles.label }>{strings.EditText}</h1>
      </div>
    );
  }
}
