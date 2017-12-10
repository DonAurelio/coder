export class Message {
    
    constructor(public type:string, public css:string, public text:string, public hidden:boolean ){

    }

    toggle(): void {
        this.hidden = !this.hidden;
    }
}