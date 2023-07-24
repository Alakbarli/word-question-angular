export class TextCortexPost {
    constructor(_prompt:string,_keywords:Array<string>,_sourceLang:string,_targetLang:string,_title:string) {
        this.context=_prompt;
        this.keywords=_keywords;
        this.source_lang=_sourceLang;
        this.target_lang=_targetLang;
        this.title=_title;
    }
  context: string;
  keywords: Array<string>;
  max_tokens= 512;
  model= "chat-sophos-1"
  n= 1;
  source_lang: string;
  target_lang: string;
  temperature= 0.65
  title: string;
}
