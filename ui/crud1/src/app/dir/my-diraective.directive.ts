import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMyDiraective]'
})
export class MyDiraectiveDirective {
  regexStr ='^[0-9]+$';

  constructor(private _el:ElementRef) { }

  @HostListener('keypress', ['$event'])
  onKeyPress(event:any){
    return new RegExp(this.regexStr).test(event.key);
  }

  @HostListener('paste',['$event'])
  blockPaste(event: ClipboardEvent){
    event.preventDefault();
    //this.validateFileds(event);
  }

  //validateFileds(event:ClipboardEvent){
    //const pasteData = event.clipboardData?.getData('text/plain').replace(/[^0-9]/g,'');
    // document.execCommand('insertHTML',false,pasteData);
  //}
}
