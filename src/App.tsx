import React from 'react';
import './App.css';
import { PdfViewerComponent, Navigation, Magnification, TextSelection, TextSearch, Print, Annotation, DynamicStampItem, SignStampItem, StandardBusinessStampItem, FormDesigner, FormFields } from '@syncfusion/ej2-react-pdfviewer';
import { ToolbarComponent, ItemsDirective, ItemDirective, ClickEventArgs, MenuComponent } from '@syncfusion/ej2-react-navigations';
PdfViewerComponent.Inject(Navigation, Magnification, TextSelection, TextSearch, Print, Annotation, FormDesigner, FormFields);

function App() {
  let viewer: PdfViewerComponent;
  let matchCase: boolean;
  const data = [
    {
      iconCss: 'e-pv-stamp-icon',
      items: [
        {
          text: 'Dynamic',
          items: [
            { text: 'Revised', id: 'Dynamic' },
            { text: 'Reviewed', id: 'Dynamic' },
            { text: 'Received', id: 'Dynamic' },
            { text: 'Confidential', id: 'Dynamic' },
            { text: 'Approved', id: 'Dynamic' },
            { text: 'Not Approved', id: 'Dynamic' },
          ],
        },
        {
          text: 'Sign Here',
          items: [
            { text: 'Witness', id: 'Sign Here' },
            { text: 'Initial Here', id: 'Sign Here' },
            { text: 'Sign Here', id: 'Sign Here' },
            { text: 'Accepted', id: 'Sign Here' },
            { text: 'Rejected', id: 'Sign Here' }],
        },
        {
          text: 'Standard Business',
          items: [
            { text: 'Approved', id: 'Standard Business' },
            { text: 'Not Approved', id: 'Standard Business' },
            { text: 'Draft', id: 'Standard Business' },
            { text: 'Final', id: 'Standard Business' },
            { text: 'Completed', id: 'Standard Business' },
            { text: 'Confidential', id: 'Standard Business' },
            { text: 'For Public Release', id: 'Standard Business' },
            { text: 'Not For Public Release', id: 'Standard Business' },
            { text: 'For Comment', id: 'Standard Business' },
            { text: 'Void', id: 'Standard Business' },
            { text: 'Preliminary Results', id: 'Standard Business' },
            { text: 'Information Only', id: 'Standard Business' }
          ],
        },
      ],
    },
  ];

  function currentPageNumberTemplate() {
    return (<div><input type='text' id='currentPage' style={{ width: '46px', height: '28px', textAlign: 'center' }} onKeyDown={onChangeCurrentPageNumber} /></div>);
  }

  function onChangeCurrentPageNumber(e: any) {
    if (e.key === 'Enter') {
      viewer.navigation.goToPage(parseInt(e.target.value));
    }
  }

  function TotalPageNumbertemplate() {
    return (<div><span id='totalPage'>of 0</span></div>);
  }

  function zoomFactorTemplate() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <select name='zoomFactorlist' onChange={onZoomChanged} id="zoomFactorlist" style={{ width: '52px', height: '28px' }} >
          <option value="10" style={{ textAlign: 'center' }}>10%</option>
          <option disabled style={{ fontSize: '3px' }}></option>
          <option value="25" style={{ textAlign: 'center' }}>25%</option>
          <option disabled style={{ fontSize: '3px' }}></option>
          <option value="50" style={{ textAlign: 'center' }}>50%</option>
          <option disabled style={{ fontSize: '3px' }}></option>
          <option value="75" style={{ textAlign: 'center' }}>75%</option>
          <option disabled style={{ fontSize: '3px' }}></option>
          <option value="100" selected style={{ textAlign: 'center' }}>100%</option>
          <option disabled style={{ fontSize: '3px' }}></option>
          <option value="125" style={{ textAlign: 'center' }}>125%</option>
          <option disabled style={{ fontSize: '3px' }}></option>
          <option value="150" style={{ textAlign: 'center' }}>150%</option>
          <option disabled style={{ fontSize: '3px' }}></option>
          <option value="175" style={{ textAlign: 'center' }}>175%</option>
          <option disabled style={{ fontSize: '3px' }}></option>
          <option value="200" style={{ textAlign: 'center' }}>200%</option>
          <option disabled style={{ fontSize: '3px' }}></option>
          <option value="400" style={{ textAlign: 'center' }}>400%</option>
          <option disabled style={{ fontSize: '3px' }}></option>
          <option style={{ textAlign: 'center' }}>Fit Page</option>
          <option disabled style={{ fontSize: '3px' }}></option>
          <option style={{ textAlign: 'center' }}>Fit Width</option>
          <option disabled style={{ fontSize: '3px' }}></option>
        </select>
      </div>)
  }

  function onZoomChanged(e: any) {
    let zoomFactor: any = e.target.value;
    if (zoomFactor === 'Fit Page')
      viewer.magnification.fitToPage();
    else if (zoomFactor === 'Fit Width')
      viewer.magnification.fitToWidth();
    else
      viewer.magnification.zoomTo(parseFloat(zoomFactor));

  }

  function fileNameTemplate() {
    return (<div><span id="documentFileName" style={{ fontWeight: 'bold', color: 'white' }}></span></div>);
  }

  return (
    <div className="App">
      <div className='e-pdf-toolbar'>
        <ToolbarComponent cssClass='customtoolbar' clicked={clickHandler}>
          <ItemsDirective>
            <ItemDirective template={fileNameTemplate} id='file_name' align='Left' tooltipText="File Name"></ItemDirective>
            <ItemDirective prefixIcon="e-pv-print-document-icon" tooltipText="Print" id='print' align="Right"></ItemDirective>
            <ItemDirective prefixIcon="e-pv-download-document-icon" tooltipText="Download" id='download' align="Right"></ItemDirective>
          </ItemsDirective>
        </ToolbarComponent>
      </div>
      <div >
        <ToolbarComponent clicked={clickHandler}>
          <ItemsDirective>
            <ItemDirective id="file_Open" prefixIcon='e-pv-file-open-document-icon' tooltipText='Open'></ItemDirective>
            <ItemDirective template={currentPageNumberTemplate} tooltipText='Page Number' align='Center'></ItemDirective>
            <ItemDirective template={TotalPageNumbertemplate} tooltipText='Total Page Number' align='Center'></ItemDirective>
            <ItemDirective type='Separator' align="Center" tooltipText="separator" />
            <ItemDirective prefixIcon="e-pv-zoom-out-sample" id='zoom_out' align='Center' tooltipText="Zoom out" />
            <ItemDirective template={zoomFactorTemplate} id='zoom_factor' align='Center' tooltipText="Zoom Factor" />
            <ItemDirective prefixIcon="e-pv-zoom-in-icon" align='Center' id='zoom_in' tooltipText="Zoom in"></ItemDirective>
            <ItemDirective type='Separator' align="Center" tooltipText="separator"></ItemDirective>
            <ItemDirective prefixIcon='e-pv-text-select-tool-icon' id='text_selection_tool' align='Center' tooltipText="Text Selection tool" />
            <ItemDirective prefixIcon="e-pv-pan-tool-icon" id='pan_tool' align='Center' tooltipText="Pan Mode" />
            <ItemDirective type='Separator' align="Center" tooltipText="separator"></ItemDirective>
            <ItemDirective prefixIcon="e-pv-annotation-icon" tooltipText="Edit Annotation" id='edit_annotation' align="Center" />
            <ItemDirective type='Separator' align="Center" tooltipText="separator"></ItemDirective>
            <ItemDirective prefixIcon="e-pv-formdesigner-icon" tooltipText="Add and Edit Form Fields" id='add_form_field' align="Center" />
            <ItemDirective prefixIcon="e-pv-text-search-icon" tooltipText="Find Text" id='find_text' align="Right" />
          </ItemsDirective>
        </ToolbarComponent>
      </div>
      <div id='editAnnotationToolbar' style={{ 'display': 'none' }}>
        <ToolbarComponent clicked={clickHandler}>
          <ItemsDirective>
          </ItemsDirective>
        </ToolbarComponent>
      </div>
      <div id='formFieldToolbar' style={{ 'display': 'none' }} className='e-tbar-btn:hover e-tbar-btn:focus'>
        <ToolbarComponent clicked={clickHandler}>
          <ItemsDirective>
          </ItemsDirective>
        </ToolbarComponent>
      </div>
      <div id='SignatureToolbar' style={{ 'display': 'none', marginLeft: '840px' }}>
        <div className="e-dropdown-popup" id="container_annotation_signature-popup" data-ripple="true">
          <ul onClick={onsignatureCilck}>
            <li style={{ 'width': '206px', 'display': 'flex', 'flexDirection': 'column', 'height': 'auto', 'alignItems': 'center', 'background': 'transparent', 'cursor': 'default' }} >
              <button className="e-btn e-outline e-primary" style={{ 'width': 'auto', 'height': '36px' }}>Add Signature</button>
            </li>
            <li className="e-item e-separator" style={{ 'margin': '8px 0px' }} />
            <li aria-label="ADD INITIAL" style={{ 'width': '206px', 'display': 'flex', 'flexDirection': 'column', 'height': 'auto', 'alignItems': 'center', 'background': 'transparent', 'cursor': 'default' }}>
              <button className="e-btn e-outline e-primary" style={{ 'width': 'auto', 'height': '36px' }}>Add Initial</button>
            </li>
          </ul>
        </div>
      </div>
      <div id='textSearchToolbar' style={{ 'display': 'none', left: 790, top: 137 }}></div>
      <PdfViewerComponent ref={(scope: any) => { viewer = scope; }} serviceUrl='https://localhost:44347/pdfviewer'
        documentPath="PDF_Succinctly.pdf" style={{ height: '640px' }}
        enableToolbar={false} documentLoad={onDocumentLoaded} pageChange={onPageChanged}></PdfViewerComponent>

      <input type='file' id="fileUpload" accept='.pdf'
        style={{ 'display': 'block', 'visibility': 'hidden', 'width': '0', 'height': '0' }}
        onChange={readFile}></input>
    </div>
  );

  function onsignatureCilck(event: any) {
    let signatureText = event.target.innerText;
    let editAnnotationToolbar: HTMLElement = document.getElementById('editAnnotationToolbar') as HTMLElement;
    if (editAnnotationToolbar.style.display === 'block') {
      if (signatureText === 'ADD SIGNATURE') {
        viewer.annotation.setAnnotationMode('HandWrittenSignature');
      }
      else if (signatureText === 'ADD INITIAL') {
        viewer.annotation.setAnnotationMode('Initial');
      }
    }

    let formFieldToolbar: HTMLElement = document.getElementById('formFieldToolbar') as HTMLElement;
    if (formFieldToolbar.style.display === 'block') {
      if (signatureText === 'ADD SIGNATURE') {
        viewer.formDesignerModule.setFormFieldMode('SignatureField');
      }
      else if (signatureText === 'ADD INITIAL') {
        viewer.formDesignerModule.setFormFieldMode('InitialField');
      }
    }
  }

  function onPageChanged() {
    let currentPageNumber = viewer.currentPageNumber;
    let inputElement: HTMLInputElement = document.getElementById('currentPage') as HTMLInputElement;
    inputElement.value = currentPageNumber.toString();
  }

  function onDocumentLoaded() {
    let pageCount: number = viewer.pageCount;
    let totalPageElement: HTMLInputElement = document.getElementById('totalPage') as HTMLInputElement;
    totalPageElement.textContent = 'of ' + pageCount;

    let inputElement: HTMLInputElement = document.getElementById('currentPage') as HTMLInputElement;
    inputElement.value = "1";

    let fileName: string = viewer.fileName;
    let fileNameElement: HTMLInputElement = document.getElementById('documentFileName') as HTMLInputElement;
    fileNameElement.textContent = fileName;
  }

  function clickHandler(args: ClickEventArgs) {
    switch (args.item.id) {
      case 'file_Open':
        {
          let fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
          fileUpload.click();
          let editAnnotationToolbarElement: HTMLElement = document.getElementById('editAnnotationToolbar') as HTMLElement;
          if (editAnnotationToolbarElement.style.display === "block")
            editAnnotationToolbarElement.style.display = "none";

          let textSearchToolbarElement: HTMLElement = document.getElementById('textSearchToolbar') as HTMLElement;
          if (textSearchToolbarElement.style.display === "block")
            textSearchToolbarElement.style.display = "none";

          let signatureToolbarElement: HTMLElement = document.getElementById('SignatureToolbar') as HTMLElement;
          if (signatureToolbarElement.style.display === "block")
            signatureToolbarElement.style.display = "none";

          let formFieldToolbarElement: HTMLElement = document.getElementById('formFieldToolbar') as HTMLElement;
          if (formFieldToolbarElement.style.display === "block") {
            formFieldToolbarElement.style.display = "none";
            viewer.designerMode = false;
          }
        }
        break;
      case 'zoom_in':
        {
          viewer.magnification.zoomIn();

          let editAnnotationToolbarElement: HTMLElement = document.getElementById('editAnnotationToolbar') as HTMLElement;
          if (editAnnotationToolbarElement.style.display === "block")
            editAnnotationToolbarElement.style.display = "none";

          let textSearchToolbarElement: HTMLElement = document.getElementById('textSearchToolbar') as HTMLElement;
          if (textSearchToolbarElement.style.display === "block")
            textSearchToolbarElement.style.display = "none";

          let signatureToolbarElement: HTMLElement = document.getElementById('SignatureToolbar') as HTMLElement;
          if (signatureToolbarElement.style.display === "block")
            signatureToolbarElement.style.display = "none";

          let formFieldToolbarElement: HTMLElement = document.getElementById('formFieldToolbar') as HTMLElement;
          if (formFieldToolbarElement.style.display === "block") {
            formFieldToolbarElement.style.display = "none";
            viewer.designerMode = false;
          }
        }
        break;
      case 'zoom_out':
        {
          viewer.magnification.zoomOut();
          let editAnnotationToolbarElement: HTMLElement = document.getElementById('editAnnotationToolbar') as HTMLElement;
          if (editAnnotationToolbarElement.style.display === "block")
            editAnnotationToolbarElement.style.display = "none";

          let textSearchToolbarElement: HTMLElement = document.getElementById('textSearchToolbar') as HTMLElement;
          if (textSearchToolbarElement.style.display === "block")
            textSearchToolbarElement.style.display = "none";

          let signatureToolbarElement: HTMLElement = document.getElementById('SignatureToolbar') as HTMLElement;
          if (signatureToolbarElement.style.display === "block")
            signatureToolbarElement.style.display = "none";

          let formFieldToolbarElement: HTMLElement = document.getElementById('formFieldToolbar') as HTMLElement;
          if (formFieldToolbarElement.style.display === "block") {
            formFieldToolbarElement.style.display = "none";
            viewer.designerMode = false;
          }
        }
        break;
      case 'text_selection_tool':
        {
          viewer.interactionMode = 'TextSelection';
          let editAnnotationToolbarElement: HTMLElement = document.getElementById('editAnnotationToolbar') as HTMLElement;
          if (editAnnotationToolbarElement.style.display === "block")
            editAnnotationToolbarElement.style.display = "none";

          let textSearchToolbarElement: HTMLElement = document.getElementById('textSearchToolbar') as HTMLElement;
          if (textSearchToolbarElement.style.display === "block")
            textSearchToolbarElement.style.display = "none";

          let signatureToolbarElement: HTMLElement = document.getElementById('SignatureToolbar') as HTMLElement;
          if (signatureToolbarElement.style.display === "block")
            signatureToolbarElement.style.display = "none";

          let formFieldToolbarElement: HTMLElement = document.getElementById('formFieldToolbar') as HTMLElement;
          if (formFieldToolbarElement.style.display === "block") {
            formFieldToolbarElement.style.display = "none";
            viewer.designerMode = false;
          }
        }
        break;
      case 'pan_tool':
        {
          viewer.interactionMode = 'Pan';
          let editAnnotationToolbarElement: HTMLElement = document.getElementById('editAnnotationToolbar') as HTMLElement;
          if (editAnnotationToolbarElement.style.display === "block")
            editAnnotationToolbarElement.style.display = "none";

          let textSearchToolbarElement: HTMLElement = document.getElementById('textSearchToolbar') as HTMLElement;
          if (textSearchToolbarElement.style.display === "block")
            textSearchToolbarElement.style.display = "none";

          let signatureToolbarElement: HTMLElement = document.getElementById('SignatureToolbar') as HTMLElement;
          if (signatureToolbarElement.style.display === "block")
            signatureToolbarElement.style.display = "none";

          let formFieldToolbarElement: HTMLElement = document.getElementById('formFieldToolbar') as HTMLElement;
          if (formFieldToolbarElement.style.display === "block") {
            formFieldToolbarElement.style.display = "none";
            viewer.designerMode = false;
          }
        }
        break;
      case 'find_text':
        {
          let editAnnotationToolbarElement: HTMLElement = document.getElementById('editAnnotationToolbar') as HTMLElement;
          if (editAnnotationToolbarElement.style.display === "block")
            editAnnotationToolbarElement.style.display = "none";

          let signatureToolbarElement: HTMLElement = document.getElementById('SignatureToolbar') as HTMLElement;
          if (signatureToolbarElement.style.display === "block") {
            signatureToolbarElement.style.display = "none";
          }

          let textSearchToolbarElement: HTMLElement = document.getElementById('textSearchToolbar') as HTMLElement;
          if (textSearchToolbarElement.style.display === "block")
            textSearchToolbarElement.style.display = "none";
          else
            textSearchToolbarElement.style.display = "block";

          let formFieldToolbarElement: HTMLElement = document.getElementById('formFieldToolbar') as HTMLElement;
          if (formFieldToolbarElement.style.display === "block") {
            formFieldToolbarElement.style.display = "none";
            viewer.designerMode = false;
          }
          break;
        }
      case 'print':
        {
          viewer.print.print();
          let editAnnotationToolbarElement: HTMLElement = document.getElementById('editAnnotationToolbar') as HTMLElement;
          if (editAnnotationToolbarElement.style.display == "block")
            editAnnotationToolbarElement.style.display = "none";

          let textSearchToolbarElement: HTMLElement = document.getElementById('textSearchToolbar') as HTMLElement;
          if (textSearchToolbarElement.style.display == "block")
            textSearchToolbarElement.style.display = "none";

          let signatureToolbarElement: HTMLElement = document.getElementById('SignatureToolbar') as HTMLElement;
          if (signatureToolbarElement.style.display == "block")
            signatureToolbarElement.style.display = "none";

          let formFieldToolbarElement: HTMLElement = document.getElementById('formFieldToolbar') as HTMLElement;
          if (formFieldToolbarElement.style.display == "block") {
            formFieldToolbarElement.style.display = "none";
            viewer.designerMode = false;
          }
        }
        break;
      case 'download':
        {
          let editAnnotationToolbarElement: HTMLElement = document.getElementById('editAnnotationToolbar') as HTMLElement;
          if (editAnnotationToolbarElement.style.display == "block")
            editAnnotationToolbarElement.style.display = "none";

          let textSearchToolbarElement: HTMLElement = document.getElementById('textSearchToolbar') as HTMLElement;
          if (textSearchToolbarElement.style.display == "block")
            textSearchToolbarElement.style.display = "none";

          let signatureToolbarElement: HTMLElement = document.getElementById('SignatureToolbar') as HTMLElement;
          if (signatureToolbarElement.style.display == "block")
            signatureToolbarElement.style.display = "none";

          let formFieldToolbarElement: HTMLElement = document.getElementById('formFieldToolbar') as HTMLElement;
          if (formFieldToolbarElement.style.display == "block") {
            formFieldToolbarElement.style.display = "none";
            viewer.designerMode = false;
          }
          viewer.download();
        }
        break;
    }
  }

  function readFile(e: any) {
    let uploadedFile = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(uploadedFile);
    reader.onload = function (evt) {
      let uploadedFileUrl: string = (evt.currentTarget as any).result;
      viewer.load(uploadedFileUrl, '');
      viewer.downloadFileName = viewer.fileName = uploadedFile.name;
      let totalPageElement: HTMLInputElement = document.getElementById('totalPage') as HTMLInputElement;
      totalPageElement.textContent = 'of ' + viewer.pageCount;
    }
  }
}

export default App;