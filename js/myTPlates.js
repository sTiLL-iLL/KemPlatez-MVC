
this.TPEngine = function() {
    var mdl={};
    var kompiler = function(templateString, model) {
        var rgx = /~>{([^:]+)?:}/g, 
        rgex = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, 
        segment = 'var r=[];\n', position = 0, 
        kompile = function(chunk, ixjs) {
            ixjs ? (segment += chunk.match(rgex) ? chunk + '\n' : 'r.push(' + chunk + ');\n') : 
            (segment += chunk != '' ? 'r.push("' + chunk.replace(/"/g, '\\"') + '");\n' : '');
            return kompile;
        };
        while (match = rgx.exec(templateString)) {
            kompile(templateString.slice(position, match.index))(match[1], true);
            position = (match.index + match[0].length);
        }
        ;
        kompile(templateString.substr(position, templateString.length - position));
        segment += 'return r.join("");';
        return new Function(segment.replace(/[\r\t\n]/g, '')).apply(model);
    }, 
    template = function(elementID, prop, templateString) {
        var c = {
            tStr: templateString,
            tProp: prop,
            tVal: document.getElementById(elementID)
        };
        return c;
    }, 
    applyBind = function(templt, model) {
        if(model && model !== mdl) {
            mdl = model;
        }
        if (templt.tVal.id && templt.tStr && templt && mdl) {
            template = templt;
            var el = document.getElementById(template.tVal.id);
            el[template.tProp] = kompiler(template.tStr, mdl);
            template.tVal = el;
        }
    };
    return {
        Template: template,
        BindSet: applyBind
    };
};
