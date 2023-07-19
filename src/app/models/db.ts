import { Unit } from "./unit";
import { Word } from "./word";

export class DB {
    Units:Array<Unit>;
    Words:Array<Word>;
    ActivePage:string;
    UnitSelectVal:Array<number>;
    LanguageVal:number;
    constructor(){
        this.Units=[];
        this.Words=[];
        this.ActivePage="word-question";
        this.UnitSelectVal=[0];
        this.LanguageVal=0;
    }

    addUnitToList(u:Unit){
        this.Units.push(u);
    }
    addWordToList(w:Word){
        this.Words.push(w);
    }
    findUnit(n:number)
    {
        return this.Units.find(u=>u.id==n)
    }
    findWord(n:number,unitId:number)
    {
        return this.Words.find(
            w=>w.id==n&&
            ((unitId==0)?true:w.unitId==unitId)
            )
    }
    //check method
    findWordByUnitId(unitId:number)
    { let w=this.Words;
        return w.filter(
            w=>w.unitId==unitId
            )
    }
    filterWord(id:number){
        return this.Words=this.Words.filter(w=>w.id!=id);
    }
    filterUnit(id:number){
        return this.Units=this.Units.filter(u=>u.id!=id);
    }
}
