class Cs142TemplateProcessor{
    constructor(template){
        this.template=template;
    }
    fillIn(dictionary){
        var temp = this.template;
        for(var key in dictionary){
            temp = temp.replace(new RegExp('\{\{' + key + '\}\}') , dictionary[key]);
        }
        temp = temp.replace(new RegExp('\{\{\ \w+ \}\}', "g") , "");
        return temp;
    }
    
}