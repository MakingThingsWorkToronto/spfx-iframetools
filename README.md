## spfx-iframetools

Hides the SharePoint Hub Navigation when the page is viewed in an iframe.  

### Using the web part

Deploy to the App Catalog. 

Add the web part to the end of the page.

Edit the web part and enable Hide in iFrame setting.


### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

gulp clean - TODO
gulp test - TODO
gulp serve - TODO
gulp bundle - TODO
gulp package-solution - TODO
