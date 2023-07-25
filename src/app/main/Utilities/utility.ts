import { KeyValue } from "src/app/models/key-value";

export class Utility {
    static makeId():string {
        var result= '';
        var characters= 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 50; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result+new Date().getTime().toString();
    }
    static GenerateKeyValue(stringNumberEnum:any):Array<KeyValue<any,any>>{
        let list=[] as Array<KeyValue<any,any>>;
        Object.keys(stringNumberEnum).filter(k=>isNaN(Number(k))).forEach(key=>{
            list.push(new KeyValue<any,any>(stringNumberEnum[key],key));
        })
        return list;
    }
}
