export class Story {
    constructor(_id:string,_level:string,_length:number,_tags:string,_content:string) {
        this.id=_id;
        this.level=_level;
        this.lenght=_length;
        this.tags=_tags;
        this.content=_content;
    }
    id:string;
    level:string;
    lenght:number;
    tags:string;
    content:string;
}