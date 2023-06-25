import { DialogActionTypes } from "../main/const/dialog-action-types";

export class WordDialogData {
    constructor(nameAz:string|null|undefined,nameEn:string|null|undefined,unitId:number|null|undefined,actionType:DialogActionTypes) {
        this.nameAz=nameAz;
        this.nameEn=nameEn;
        this.unitId=unitId;
        this.actionType=actionType
    }
    nameAz:string|null|undefined;
    nameEn:string|null|undefined;
    unitId:number|null|undefined;
    actionType:DialogActionTypes;
}