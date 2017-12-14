export class Message {

    constructor(public type:string, public css:string,public inline_css, public text:string, public hidden:boolean){

    }

    toggle(): void {
        this.hidden = !this.hidden;
    }

    success(text:string): void {
        this.type = 'Success';
        this.css = 'alert alert-success';
        this.inline_css = 'text-success';
        this.text = text;
        this.hidden = false;
    }

    warning(text:string): void {
        this.type = 'Warnning';
        this.css = 'alert alert-warning';
        this.inline_css = 'text-warning';
        this.text = text;
        this.hidden = false;
    }

    info(text:string): void {
        this.type = 'Info';
        this.css = 'alert alert-info';
        this.inline_css = 'text-info';
        this.text = text;
        this.hidden = false;
    }

    error(text:string): void {
        this.type = 'Error';
        this.css = 'alert alert-danger';
        this.inline_css = 'text-danger';
        this.text = text;
        this.hidden = false;
    }


}