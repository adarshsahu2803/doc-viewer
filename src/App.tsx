import React from 'react';
import './App.css';
import {PdfViewerComponent, Navigation, Magnification, TextSelection, TextSearch, Print, Annotation, DynamicStampItem, SignStampItem, StandardBusinessStampItem, FormDesigner, FormFields} from '@syncfusion/ej2-react-pdfviewer';
import {ToolbarComponent, ItemsDirective, ItemDirective, ClickEventArgs, MenuComponent} from '@syncfusion/ej2-react-navigations';
PdfViewerComponent.Inject(Navigation, Magnification, TextSelection, TextSearch, Print, Annotation, FormDesigner, FormFields);

function App() {
  let viewer: PdfViewerComponent ;
  let matchCase: boolean ;
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
                    { text: 'Witness' , id: 'Sign Here' }, 
                    { text: 'Initial Here', id: 'Sign Here' }, 
                    { text: 'Sign Here', id: 'Sign Here' }, 
                    { text: 'Accepted', id: 'Sign Here'}, 
                    { text: 'Rejected', id: 'Sign Here' }],
            },
            {
                text: 'Standard Business',
                items: [
                    { text: 'Approved' , id: 'Standard Business' }, 
                    { text: 'Not Approved', id: 'Standard Business' }, 
                    { text: 'Draft', id: 'Standard Business' }, 
                    { text: 'Final', id: 'Standard Business'}, 
                    { text: 'Completed', id: 'Standard Business' },
                    { text: 'Confidential' , id: 'Standard Business' }, 
                    { text: 'For Public Release', id: 'Standard Business' }, 
                    { text: 'Not For Public Release', id: 'Standard Business' }, 
                    { text: 'For Comment', id: 'Standard Business'}, 
                    { text: 'Void', id: 'Standard Business' },
                    { text: 'Preliminary Results' , id: 'Standard Business' }, 
                    { text: 'Information Only', id: 'Standard Business' }
                ],
            },
        ],
    },
];

  function currentPageNumberTemplate() {
    return (<div><input type='text' id='currentPage' style={{ width:'46px', height: '28px', textAlign: 'center'}} onKeyDown={onChangeCurrentPageNumber}/></div>);
  }

  function onChangeCurrentPageNumber(e: any) {
    if(e.key === 'Enter') {
      viewer.navigation.goToPage(parseInt(e.target.value));
    }
  }

  function TotalPageNumbertemplate() {
    return (<div><span id='totalPage'>of 0</span></div>);
  }

  function zoomFactorTemplate() {
    return(
      <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
        <select name='zoomFactorlist' onChange={onZoomChanged} id="zoomFactorlist" style={{ width:'52px', height: '28px' }} >
          <option value="10" style={{textAlign: 'center'}}>10%</option>
          <option  disabled style={{fontSize: '3px'}}></option>       
          <option value="25" style={{textAlign: 'center'}}>25%</option>
          <option disabled style={{fontSize: '3px'}}></option>
          <option value="50" style={{textAlign: 'center'}}>50%</option>
          <option disabled style={{fontSize: '3px'}}></option>
          <option value="75" style={{textAlign: 'center'}}>75%</option>
          <option disabled style={{fontSize: '3px'}}></option>
          <option value="100" selected style={{textAlign: 'center'}}>100%</option>
          <option disabled style={{fontSize: '3px'}}></option>
          <option value="125" style={{textAlign: 'center'}}>125%</option>
          <option disabled style={{fontSize: '3px'}}></option>
          <option value="150" style={{textAlign: 'center'}}>150%</option>
          <option disabled style={{fontSize: '3px'}}></option>
          <option value="175" style={{textAlign: 'center'}}>175%</option>
          <option disabled style={{fontSize: '3px'}}></option>
          <option value="200" style={{textAlign: 'center'}}>200%</option>
          <option disabled style={{fontSize: '3px'}}></option>
          <option value="400" style={{textAlign: 'center'}}>400%</option>
          <option disabled style={{fontSize: '3px'}}></option>
          <option style={{textAlign: 'center'}}>Fit Page</option>
          <option disabled style={{fontSize: '3px'}}></option>
          <option style={{textAlign: 'center'}}>Fit Width</option>
          <option disabled style={{fontSize: '3px'}}></option>
        </select>
    </div>)
  }
 
  function onZoomChanged(e: any) {
    let zoomFactor : any = e.target.value;
    if(zoomFactor === 'Fit Page')
      viewer.magnification.fitToPage(); 
    else if(zoomFactor === 'Fit Width')
      viewer.magnification.fitToWidth();
    else
    viewer.magnification.zoomTo(parseFloat(zoomFactor));
   
  }

  function fileNameTemplate() {
    return (<div><span id="documentFileName" style={{fontWeight: 'bold', color:'white'}}></span></div>);
  }

  function stampTemplate() {
    return (<MenuComponent items={data} showItemOnClick={true} select={onItemSelect}></MenuComponent>)
  }

  function onItemSelect(args: any) {
    var stampId = args.element.id;
    var stampText = args.element.innerText;
    if(stampId === 'Dynamic' && stampText != null) {
      if(stampText === 'Revised')
      {
        viewer.annotation.setAnnotationMode('Stamp',DynamicStampItem.Revised);
      }
      else if(stampText == "Reviewed")
      {
        viewer.annotation.setAnnotationMode('Stamp', DynamicStampItem.Reviewed);
      }
      else if(stampText == "Received")
      {
        viewer.annotation.setAnnotationMode('Stamp', DynamicStampItem.Received);
      }
      else if(stampText == "Confidential")
      {
        viewer.annotation.setAnnotationMode('Stamp', DynamicStampItem.Confidential);
      }
      else if(stampText == "Approved")
      {
        viewer.annotation.setAnnotationMode('Stamp', DynamicStampItem.Approved);
      }
      else if(stampText == "NotApproved")
      {
        viewer.annotation.setAnnotationMode('Stamp',  DynamicStampItem.NotApproved);
      }
    }
    if(stampId === 'Sign Here' && stampText != null) {
      if(stampText === 'Witness')
      {
        viewer.annotation.setAnnotationMode('Stamp', undefined , SignStampItem.Witness);
      }
      else if(stampText == "Initial Here")
      {
        viewer.annotation.setAnnotationMode('Stamp', undefined, SignStampItem.InitialHere);
      }
      else if(stampText == "Sign Here")
      {
        viewer.annotation.setAnnotationMode('Stamp', undefined, SignStampItem.SignHere);
      }
      else if(stampText == "Accepted")
      {
        viewer.annotation.setAnnotationMode('Stamp', undefined, SignStampItem.Accepted);
      }
      else if(stampText == "Rejected")
      {
        viewer.annotation.setAnnotationMode('Stamp', undefined, SignStampItem.Rejected);
      }
    }
    if(stampId === 'Standard Business' && stampText != null) {
      if(stampText === 'Approved')
      {
        viewer.annotation.setAnnotationMode('Stamp', undefined, undefined, StandardBusinessStampItem.Approved);
      }
      else if(stampText == "Not Approved")
      {
        viewer.annotation.setAnnotationMode('Stamp', undefined,undefined, StandardBusinessStampItem.NotApproved);
      }
      else if(stampText == "Draft")
      {
        viewer.annotation.setAnnotationMode('Stamp', undefined,undefined, StandardBusinessStampItem.Draft);
      }
      else if(stampText == "Final")
      {
        viewer.annotation.setAnnotationMode('Stamp', undefined,undefined, StandardBusinessStampItem.Final);
      }
      else if(stampText == "Completed")
      {
        viewer.annotation.setAnnotationMode('Stamp', undefined,undefined, StandardBusinessStampItem.Completed);
      }
      else if(stampText == "Confidential")
      {
        viewer.annotation.setAnnotationMode('Stamp', undefined,undefined, StandardBusinessStampItem.Confidential);
      }
      else if(stampText == "For Public Release")
      {
        viewer.annotation.setAnnotationMode('Stamp', undefined,undefined, StandardBusinessStampItem.ForPublicRelease);
      }
      else if(stampText == "Not For Public Release")
      {
        viewer.annotation.setAnnotationMode('Stamp', undefined,undefined, StandardBusinessStampItem.NotForPublicRelease);
      }
      else if(stampText == "For Comment")
      {
        viewer.annotation.setAnnotationMode('Stamp', undefined,undefined, StandardBusinessStampItem.ForComment);
      }
      else if(stampText == "Void")
      {
        viewer.annotation.setAnnotationMode('Stamp', undefined,undefined, StandardBusinessStampItem.Void);
      }
      else if(stampText == "Preliminary Results")
      {
        viewer.annotation.setAnnotationMode('Stamp', undefined,undefined, StandardBusinessStampItem.PreliminaryResults);  
      }
      else if(stampText == "Information Only")
      {
        viewer.annotation.setAnnotationMode('Stamp', undefined,undefined, StandardBusinessStampItem.InformationOnly);
      }
    }
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
            <ItemDirective id="file_Open"  prefixIcon='e-pv-file-open-document-icon' tooltipText='Open'></ItemDirective>
            <ItemDirective template={currentPageNumberTemplate} tooltipText='Page Number' align='Center'></ItemDirective>
            <ItemDirective template={TotalPageNumbertemplate} tooltipText='Total Page Number' align='Center'></ItemDirective>            
            <ItemDirective type='Separator' align="Center" tooltipText="separator"/>
            <ItemDirective prefixIcon="e-pv-zoom-out-sample" id='zoom_out' align='Center' tooltipText="Zoom out"/>
            <ItemDirective template={zoomFactorTemplate} id='zoom_factor' align='Center' tooltipText="Zoom Factor"/>
            <ItemDirective prefixIcon="e-pv-zoom-in-icon" align='Center' id='zoom_in' tooltipText="Zoom in"></ItemDirective>           
            <ItemDirective type='Separator' align="Center" tooltipText="separator"></ItemDirective>            
            <ItemDirective prefixIcon='e-pv-text-select-tool-icon' id='text_selection_tool' align='Center' tooltipText="Text Selection tool"/>
            <ItemDirective prefixIcon="e-pv-pan-tool-icon" id='pan_tool' align='Center' tooltipText="Pan Mode"/>
            <ItemDirective type='Separator' align="Center" tooltipText="separator"></ItemDirective> 
            <ItemDirective prefixIcon="e-pv-annotation-icon" tooltipText="Edit Annotation" id='edit_annotation' align="Center"/>
            <ItemDirective type='Separator' align="Center" tooltipText="separator"></ItemDirective> 
            <ItemDirective prefixIcon="e-pv-formdesigner-icon" tooltipText="Add and Edit Form Fields" id='add_form_field' align="Center"/>
            <ItemDirective prefixIcon="e-pv-text-search-icon" tooltipText="Find Text" id='find_text' align="Right"/>                        
          </ItemsDirective>
        </ToolbarComponent>
      </div>
      <div id='editAnnotationToolbar' style={{'display': 'none'}}>
        <ToolbarComponent clicked={clickHandler}>
          <ItemsDirective>
            <ItemDirective prefixIcon='e-pv-highlight-icon' tooltipText="Highlight" id='highlight' align="Center"></ItemDirective> 
            <ItemDirective prefixIcon='e-pv-underline-icon'  tooltipText="Underline" id='underline' align="Center"></ItemDirective>                                                     
            <ItemDirective prefixIcon='e-pv-strikethrough-icon'  tooltipText="Strikethrough" id='strikethrough' align="Center"></ItemDirective>                                                              
            <ItemDirective type='Separator' tooltipText="separator"  align="Center"></ItemDirective> 

            <ItemDirective prefixIcon='e-pv-shape-line-icon'  tooltipText="Add Line" id='line' align="Center"></ItemDirective>                                       
            <ItemDirective prefixIcon='e-pv-shape-arrow-icon'  tooltipText="Add Arrow" id='arrow' align="Center"></ItemDirective>                                       
            <ItemDirective prefixIcon='e-pv-shape-rectangle-icon'  tooltipText="Add Reactangle" id='rectangle' align="Center"></ItemDirective>                                       
            <ItemDirective prefixIcon='e-pv-shape-circle-icon'  tooltipText="Add Circle" id='circle' align="Center"></ItemDirective>                                       
            <ItemDirective prefixIcon='e-pv-shape-pentagon-icon' tooltipText="Add Polygon" id='polygon' align="Center"></ItemDirective>                                                                       
            <ItemDirective type='Separator' tooltipText="separator"  align="Center"></ItemDirective>                     
                             
            <ItemDirective prefixIcon='e-pv-calibrate-distance-icon'  tooltipText="Calibrate Distance" id='calibrate_distance' align="Center"></ItemDirective>                          
            <ItemDirective prefixIcon='e-pv-calibrate-perimeter-icon'  tooltipText="Calibrate Perimeter" id='calibrate_perimeter' align="Center"></ItemDirective>                          
            <ItemDirective prefixIcon='e-pv-calibrate-area-icon'  tooltipText="Calibrate Area" id='calibrate_area' align="Center"></ItemDirective>                          
            <ItemDirective prefixIcon='e-pv-calibrate-radius-icon'  tooltipText="Calibrate Radius" id='calibrate_radius' align="Center"></ItemDirective>                          
            <ItemDirective prefixIcon='e-pv-calibrate-volume-icon'  tooltipText="Calibrate Volume" id='calibrate_volume' align="Center"></ItemDirective>                                                     
            <ItemDirective type='Separator' tooltipText="separator"  align="Center"></ItemDirective>                     
                             
            <ItemDirective prefixIcon='e-pv-freetext-icon'  tooltipText="Free Text" id='freeText' align="Center"></ItemDirective>
            <ItemDirective type='Separator' tooltipText="separator"  align="Center"></ItemDirective>                     
                             
            <ItemDirective template={stampTemplate} tooltipText="Add Stamp" id='stamp' align="Center"></ItemDirective>                          
            <ItemDirective type='Separator' tooltipText="separator"  align="Center"></ItemDirective>                     
                
            <ItemDirective prefixIcon='e-pv-handwritten-icon' id='signature' align="Center"></ItemDirective>                                                                     
            <ItemDirective type='Separator' tooltipText="separator"  align="Center"></ItemDirective>                     
                           
            <ItemDirective prefixIcon='e-pv-inkannotation-icon e-pv-icon' id='ink' align="Center"></ItemDirective>
          </ItemsDirective>
        </ToolbarComponent>
      </div>
      <div id='formFieldToolbar' style={{'display': 'none'}} className='e-tbar-btn:hover e-tbar-btn:focus'> 
        <ToolbarComponent clicked={clickHandler}>
          <ItemsDirective>
            <ItemDirective prefixIcon='e-pv-textbox-icon' tooltipText="Textbox" id='textbox' align="Center"></ItemDirective> 
            <ItemDirective prefixIcon='e-pv-password-icon' tooltipText="Password" id='password' align="Center"></ItemDirective>
            <ItemDirective prefixIcon='e-pv-checkbox-icon' tooltipText="Checkbok" id='checkbok' align="Center"></ItemDirective>
            <ItemDirective prefixIcon='e-pv-radiobutton-icon' tooltipText="Radio Button" id='radio_button' align="Center"></ItemDirective>
            <ItemDirective prefixIcon='e-pv-dropdown-icon' tooltipText="Drop Down" id='drop_down' align="Center"></ItemDirective>
            <ItemDirective prefixIcon='e-pv-listbox-icon' tooltipText="List Box" id='list_box' align="Center"></ItemDirective>
            <ItemDirective prefixIcon='e-pv-handwritten-icon' tooltipText="Add Signature" id='formField_signature' align="Center"></ItemDirective>                           
         </ItemsDirective>
        </ToolbarComponent>
      </div>
      <div id='SignatureToolbar' style={{'display': 'none',marginLeft:'840px'}}> 
        <div className="e-dropdown-popup" id="container_annotation_signature-popup" data-ripple="true">
            <ul onClick={onsignatureCilck}>
                <li style={{'width': '206px', 'display': 'flex', 'flexDirection': 'column', 'height': 'auto', 'alignItems': 'center', 'background': 'transparent', 'cursor': 'default'}} >
                  <button className="e-btn e-outline e-primary" style={{'width': 'auto', 'height': '36px'}}>Add Signature</button>
                </li>
                <li className="e-item e-separator"  style={{'margin': '8px 0px'}}/>
                <li aria-label="ADD INITIAL" style={{'width': '206px', 'display': 'flex', 'flexDirection': 'column', 'height': 'auto', 'alignItems': 'center', 'background': 'transparent' ,'cursor': 'default'}}>
                  <button className="e-btn e-outline e-primary" style={{'width': 'auto', 'height': '36px'}}>Add Initial</button>
                </li>
            </ul>
        </div>            
      </div>
      <div id='textSearchToolbar' style={{'display': 'none', left: 790, top: 137}}> 
        <div className="e-pv-search-bar" id="container_search_box" style={{ 'top': '88px', 'right': '0px'}}>
            <div>                        
                <input id='search_input' className='textsearchInput' type="text" placeholder="Find in document" />
                <button onClick={initiateTextSearch} style={{'border':'none','background':'none'}}  id="container_search_box-icon" className='e-pv-search-icon' />                                                
                <button onClick={previousTextSearch} className="e-pv-prev-search-icon" id="container_prev_occurrence"   style={{'border':'none','background':'none'}}  type="button"  aria-label="Previous Search text" />
                <button onClick={nextTextSearch} className="e-pv-next-search-icon" id="container_next_occurrence"  style={{'border':'none','background':'none'}} type="button" aria-label="Next Search text" />
            </div>
            <div style={{marginBottom: '15px'}}>               
                <label>
                  <input onClick={onCheckBoxChanged} id="container_match_case" className='matchCaseInput' type="checkbox" />
                  <span className='matchCaseSpan'>Match case</span>
                </label>
            </div>                   
        </div>
      </div>
      <PdfViewerComponent ref={(scope : any) => { viewer = scope; }} serviceUrl='https://localhost:44347/pdfviewer' 
      documentPath="PDF_Succinctly.pdf" style={{height:'640px'}}
      enableToolbar={false} documentLoad={onDocumentLoaded} pageChange={onPageChanged}></PdfViewerComponent>  

      <input type='file' id="fileUpload" accept='.pdf' 
      style={{ 'display': 'block', 'visibility': 'hidden', 'width': '0', 'height': '0'}}
      onChange={readFile}></input>   
    </div>
  );

  function onsignatureCilck(event : any) {
    let signatureText = event.target.innerText;
    let editAnnotationToolbar : HTMLElement = document.getElementById('editAnnotationToolbar') as  HTMLElement;
    if(editAnnotationToolbar.style.display === 'block') {
    if(signatureText === 'ADD SIGNATURE') {
      viewer.annotation.setAnnotationMode('HandWrittenSignature');
    }
    else if(signatureText === 'ADD INITIAL') {
      viewer.annotation.setAnnotationMode('Initial');
    }
  }

    let formFieldToolbar : HTMLElement = document.getElementById('formFieldToolbar') as  HTMLElement;
    if(formFieldToolbar.style.display === 'block') {
      if(signatureText === 'ADD SIGNATURE') {
        viewer.formDesignerModule.setFormFieldMode('SignatureField');
      }
      else if(signatureText === 'ADD INITIAL') {
        viewer.formDesignerModule.setFormFieldMode('InitialField');
      }
    }
  }

  function onCheckBoxChanged(event : any) {
    matchCase = event.target.checked;
  }

  function nextTextSearch() {
    viewer.textSearchModule.searchNext();
  }

  function previousTextSearch() {
    viewer.textSearchModule.searchPrevious();
  }

  function initiateTextSearch() {
    let inputElement: HTMLInputElement = document.getElementById('search_input') as HTMLInputElement;
    viewer.textSearchModule.searchText(inputElement.value, matchCase);
  }

  function onPageChanged() {
    let currentPageNumber = viewer.currentPageNumber;
    let inputElement: HTMLInputElement = document.getElementById('currentPage') as HTMLInputElement;
    inputElement.value = currentPageNumber.toString();
  }

  function onDocumentLoaded() {
    let pageCount : number = viewer.pageCount;
    let totalPageElement: HTMLInputElement = document.getElementById('totalPage') as HTMLInputElement;
    totalPageElement.textContent = 'of ' + pageCount;

    let inputElement: HTMLInputElement = document.getElementById('currentPage') as HTMLInputElement;
    inputElement.value = "1";

    let fileName : string= viewer.fileName;
    let fileNameElement: HTMLInputElement = document.getElementById('documentFileName') as HTMLInputElement;
    fileNameElement.textContent = fileName;
  }

  function clickHandler(args: ClickEventArgs) {
    switch (args.item.id){
        case 'file_Open':
          {
          let fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
          fileUpload.click();
          let editAnnotationToolbarElement : HTMLElement = document.getElementById('editAnnotationToolbar') as HTMLElement;       
          if(editAnnotationToolbarElement.style.display === "block")
          editAnnotationToolbarElement.style.display="none";
          
          let textSearchToolbarElement : HTMLElement = document.getElementById('textSearchToolbar') as HTMLElement;  
          if(textSearchToolbarElement.style.display === "block")
          textSearchToolbarElement.style.display="none";

          let signatureToolbarElement : HTMLElement = document.getElementById('SignatureToolbar') as HTMLElement;  
          if(signatureToolbarElement.style.display === "block")
          signatureToolbarElement.style.display="none";

          let formFieldToolbarElement : HTMLElement= document.getElementById('formFieldToolbar') as HTMLElement;  
          if(formFieldToolbarElement.style.display === "block")
          {
          formFieldToolbarElement.style.display="none";
          viewer.designerMode=false;
          }
        }
          break;
        case 'zoom_in':
          {
          viewer.magnification.zoomIn();
          
          let editAnnotationToolbarElement : HTMLElement = document.getElementById('editAnnotationToolbar') as HTMLElement;       
          if(editAnnotationToolbarElement.style.display === "block")
          editAnnotationToolbarElement.style.display="none";
            
          let textSearchToolbarElement : HTMLElement = document.getElementById('textSearchToolbar') as HTMLElement;  
          if(textSearchToolbarElement.style.display === "block")
          textSearchToolbarElement.style.display="none";

          let signatureToolbarElement : HTMLElement = document.getElementById('SignatureToolbar') as HTMLElement;  
          if(signatureToolbarElement.style.display === "block")
          signatureToolbarElement.style.display="none";

          let formFieldToolbarElement : HTMLElement= document.getElementById('formFieldToolbar') as HTMLElement;  
          if(formFieldToolbarElement.style.display === "block")
          {
            formFieldToolbarElement.style.display="none";
            viewer.designerMode=false;
          }
        }
          break;
        case 'zoom_out':
          {
          viewer.magnification.zoomOut();
          let editAnnotationToolbarElement : HTMLElement = document.getElementById('editAnnotationToolbar') as HTMLElement;       
          if(editAnnotationToolbarElement.style.display === "block")
          editAnnotationToolbarElement.style.display="none";
            
          let textSearchToolbarElement : HTMLElement = document.getElementById('textSearchToolbar') as HTMLElement;  
          if(textSearchToolbarElement.style.display === "block")
          textSearchToolbarElement.style.display="none";

          let signatureToolbarElement : HTMLElement = document.getElementById('SignatureToolbar') as HTMLElement;  
          if(signatureToolbarElement.style.display === "block")
          signatureToolbarElement.style.display="none";

          let formFieldToolbarElement : HTMLElement= document.getElementById('formFieldToolbar') as HTMLElement;  
          if(formFieldToolbarElement.style.display === "block")
          {
            formFieldToolbarElement.style.display="none";
            viewer.designerMode=false;
          }
        }
          break;
        case 'text_selection_tool':
          {
          viewer.interactionMode = 'TextSelection';
          let editAnnotationToolbarElement : HTMLElement = document.getElementById('editAnnotationToolbar') as HTMLElement;       
          if(editAnnotationToolbarElement.style.display === "block")
          editAnnotationToolbarElement.style.display="none";
            
          let textSearchToolbarElement : HTMLElement = document.getElementById('textSearchToolbar') as HTMLElement;  
          if(textSearchToolbarElement.style.display === "block")
          textSearchToolbarElement.style.display="none";

          let signatureToolbarElement : HTMLElement = document.getElementById('SignatureToolbar') as HTMLElement;  
          if(signatureToolbarElement.style.display === "block")
          signatureToolbarElement.style.display="none";

          let formFieldToolbarElement : HTMLElement= document.getElementById('formFieldToolbar') as HTMLElement;  
          if(formFieldToolbarElement.style.display === "block")
          {
            formFieldToolbarElement.style.display="none";
            viewer.designerMode=false;
          }
        }
          break;
        case 'pan_tool':
          {
          viewer.interactionMode = 'Pan';
          let editAnnotationToolbarElement : HTMLElement = document.getElementById('editAnnotationToolbar') as HTMLElement;       
          if(editAnnotationToolbarElement.style.display === "block")
          editAnnotationToolbarElement.style.display="none";
            
          let textSearchToolbarElement : HTMLElement = document.getElementById('textSearchToolbar') as HTMLElement;  
          if(textSearchToolbarElement.style.display === "block")
          textSearchToolbarElement.style.display="none";

          let signatureToolbarElement : HTMLElement = document.getElementById('SignatureToolbar') as HTMLElement;  
          if(signatureToolbarElement.style.display === "block")
          signatureToolbarElement.style.display="none";

          let formFieldToolbarElement : HTMLElement= document.getElementById('formFieldToolbar') as HTMLElement;  
          if(formFieldToolbarElement.style.display === "block")
          {
            formFieldToolbarElement.style.display="none";
            viewer.designerMode=false;
          }
        }
          break;
        case 'find_text':
          {
          let editAnnotationToolbarElement : HTMLElement = document.getElementById('editAnnotationToolbar') as HTMLElement;       
          if(editAnnotationToolbarElement.style.display === "block")
          editAnnotationToolbarElement.style.display="none";
          
          let signatureToolbarElement : HTMLElement = document.getElementById('SignatureToolbar') as HTMLElement;  
          if(signatureToolbarElement.style.display === "block")
          {
              signatureToolbarElement.style.display="none";
          }

          let textSearchToolbarElement : HTMLElement= document.getElementById('textSearchToolbar') as HTMLElement;  
          if(textSearchToolbarElement.style.display === "block")
          textSearchToolbarElement.style.display="none";
          else     
          textSearchToolbarElement.style.display="block";

          let formFieldToolbarElement : HTMLElement = document.getElementById('formFieldToolbar') as HTMLElement;  
          if(formFieldToolbarElement.style.display === "block")
          {
          formFieldToolbarElement.style.display="none";
          viewer.designerMode=false;
          }
          break;
        }
        case 'print':
          {
          viewer.print.print();
          let editAnnotationToolbarElement : HTMLElement = document.getElementById('editAnnotationToolbar') as HTMLElement;       
          if(editAnnotationToolbarElement.style.display == "block")
          editAnnotationToolbarElement.style.display="none";
          
          let textSearchToolbarElement : HTMLElement = document.getElementById('textSearchToolbar') as HTMLElement;  
          if(textSearchToolbarElement.style.display == "block")
          textSearchToolbarElement.style.display="none";
          
          let signatureToolbarElement : HTMLElement = document.getElementById('SignatureToolbar') as HTMLElement;  
          if(signatureToolbarElement.style.display == "block")
          signatureToolbarElement.style.display="none";

          let formFieldToolbarElement : HTMLElement= document.getElementById('formFieldToolbar') as HTMLElement;  
          if(formFieldToolbarElement.style.display == "block")
          {
          formFieldToolbarElement.style.display="none";
          viewer.designerMode=false;
          }
          }
          break;
        case 'download':
          {
            let editAnnotationToolbarElement : HTMLElement = document.getElementById('editAnnotationToolbar') as HTMLElement;       
          if(editAnnotationToolbarElement.style.display == "block")
          editAnnotationToolbarElement.style.display="none";
          
          let textSearchToolbarElement : HTMLElement = document.getElementById('textSearchToolbar') as HTMLElement;  
          if(textSearchToolbarElement.style.display == "block")
          textSearchToolbarElement.style.display="none";
          
          let signatureToolbarElement : HTMLElement = document.getElementById('SignatureToolbar') as HTMLElement;  
          if(signatureToolbarElement.style.display == "block")
          signatureToolbarElement.style.display="none";

          let formFieldToolbarElement : HTMLElement= document.getElementById('formFieldToolbar') as HTMLElement;  
          if(formFieldToolbarElement.style.display == "block")
          {
          formFieldToolbarElement.style.display="none";
          viewer.designerMode=false;
          }
          viewer.download();
          }
          break;
        case 'highlight':
          viewer.annotationModule.setAnnotationMode('Highlight');
          break;
        case 'underline':
          viewer.annotationModule.setAnnotationMode('Underline');
          break;
        case 'strikethrough':
          viewer.annotationModule.setAnnotationMode('Strikethrough');
          break;
        case 'edit_annotation':
          let formFieldToolbarElement : HTMLInputElement = document.getElementById('formFieldToolbar') as HTMLInputElement;  
          if(formFieldToolbarElement.style.display === "block")
          {
            formFieldToolbarElement.style.display="none";
            viewer.designerMode=false;
          }
          
          let textSearchToolbarElement : HTMLElement = document.getElementById('textSearchToolbar') as HTMLElement;  
          if(textSearchToolbarElement.style.display === "block")
          textSearchToolbarElement.style.display="none";

          let signatureToolbarElement : HTMLElement = document.getElementById('SignatureToolbar') as HTMLElement;  
          if(signatureToolbarElement.style.display === "block")
          {
              signatureToolbarElement.style.display="none";
          }

          let editAnnotationToolbar = document.getElementById('editAnnotationToolbar') as HTMLInputElement;
          if(formFieldToolbarElement.style.display === "block")
          {
            editAnnotationToolbar.style.display = 'none';
          }
          else
          {
            editAnnotationToolbar.style.display = 'block';
          }
          break;
        case 'line':
          viewer.annotationModule.setAnnotationMode('Line');
          break;
        case 'arrow':
          viewer.annotationModule.setAnnotationMode('Arrow');
          break;
        case 'rectangle':
          viewer.annotationModule.setAnnotationMode('Rectangle');
          break;
        case 'circle':
          viewer.annotationModule.setAnnotationMode('Circle');
          break;
        case 'polygon':
          viewer.annotationModule.setAnnotationMode('Polygon');
          break;
        case 'calibrate_distance':
          viewer.annotationModule.setAnnotationMode('Distance');
          break;
        case 'calibrate_perimeter':
          viewer.annotation.setAnnotationMode("Perimeter");
          break;
        case 'calibrate_area':
          viewer.annotation.setAnnotationMode("Area");
          break;
        case 'calibrate_radius':
          viewer.annotation.setAnnotationMode("Radius");
          break;
        case 'calibrate_volume':
          viewer.annotation.setAnnotationMode("Volume");
          break;
        case 'freeText':
          viewer.annotationModule.setAnnotationMode('FreeText');
          break;
        case 'signature':
        case 'formField_signature':
          {
           
            const element : any =  document.querySelector('.e-dropdown-popup');
                     
            if(args.item.id === "formField_signature")
            {               
              element.style.left ="625px";
              element.style.top ="128px";       
            }
            else
            {
              element.style.left ="790px";
              element.style.top ="137px";                  
            }

            let textSearchToolbarElement : HTMLElement = document.getElementById('textSearchToolbar') as HTMLElement;  
            if(textSearchToolbarElement.style.display === "block")
            {
              textSearchToolbarElement.style.display="none";
            }

            let signatureToolbarElement : HTMLElement = document.getElementById('SignatureToolbar') as HTMLElement;  
            if(signatureToolbarElement.style.display === "block")
            {
              signatureToolbarElement.style.display="none";
            }
            else
            {
              signatureToolbarElement.style.display="block";
            }                 
           
          }
          break;
        case 'ink':
          viewer.annotationModule.setAnnotationMode('Ink');
          break;
        case 'textbox':
          viewer.formDesignerModule.setFormFieldMode('Textbox');
          break;
        case 'password': 
          viewer.formDesignerModule.setFormFieldMode("Password");
          break;
        case 'checkbok': 
          viewer.formDesignerModule.setFormFieldMode("CheckBox");
          break;
        case 'radio_button': 
          viewer.formDesignerModule.setFormFieldMode("RadioButton");
          break;
        case 'drop_down': 
          viewer.formDesignerModule.setFormFieldMode("DropDown");
          break;
        case 'list_box': 
          viewer.formDesignerModule.setFormFieldMode("ListBox");
          break;
        case 'add_form_field':
        {
          let editAnnotationToolbar = document.getElementById('editAnnotationToolbar') as HTMLInputElement;
          if(editAnnotationToolbar.style.display === "block")
          {
            editAnnotationToolbar.style.display = 'none';
          }

          let signatureToolbarElement : HTMLElement = document.getElementById('SignatureToolbar') as HTMLElement;  
          if(signatureToolbarElement.style.display === "block")
          {
              signatureToolbarElement.style.display="none";
          }

          let textSearchToolbarElement : HTMLElement = document.getElementById('textSearchToolbar') as HTMLElement;  
            if(textSearchToolbarElement.style.display === "block")
            {
              textSearchToolbarElement.style.display="none";
            }
          
          let formFieldToolbarElement : HTMLInputElement = document.getElementById('formFieldToolbar') as HTMLInputElement;  
            if(formFieldToolbarElement.style.display === "block")
            {
              formFieldToolbarElement.style.display="none";
              viewer.designerMode=false;
            }
            else
            {
              formFieldToolbarElement.style.display="block";
              viewer.designerMode=true;
            }
       }
       break;
    }
  }
  
  function readFile(e: any) {
    let uploadedFile = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(uploadedFile);
    reader.onload = function(evt)
    {
      let uploadedFileUrl : string = (evt.currentTarget as any).result;
      viewer.load(uploadedFileUrl,'');
      viewer.downloadFileName = viewer.fileName = uploadedFile.name;
      let totalPageElement: HTMLInputElement = document.getElementById('totalPage') as HTMLInputElement;
      totalPageElement.textContent = 'of ' + viewer.pageCount;
    }
  }
}

export default App;
