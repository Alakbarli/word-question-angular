export class KeyValue<T,U> {
    constructor(_key:T,_value:U) {
        this.key=_key;
        this.value=_value;
    }
    key:T;
    value:U;
    IsActive:boolean=true;
}
