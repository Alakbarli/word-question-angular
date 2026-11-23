import { Story } from "./story";
import { Unit } from "./unit";
import { Word } from "./word";

export class DB {
    Units:Array<Unit>;
    Words:Array<Word>;
    Stories:Array<Story>;
    ActivePage:string;
    UnitSelectVal:Array<number>;
    LanguageVal:number;
    constructor(){
        this.Units=[];
        this.Words=[];
        this.Stories=[];
        this.ActivePage="word-question";
        this.UnitSelectVal=[0];
        this.LanguageVal=0;
    }

}
