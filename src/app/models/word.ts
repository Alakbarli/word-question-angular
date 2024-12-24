export class Word {
    id:number;
    nameAz:string;
    nameEn:string;
    unitId:number;
    hide1?:boolean;
    hide2?:boolean;

    constructor(id:number,_nameAz:string,_nameEn:string,_unitId:number){
        this.id=id;
        this.nameAz=_nameAz;
        this.nameEn=_nameEn;
        this.unitId=_unitId;
    }
}
