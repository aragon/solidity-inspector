module.exports = {


    parse: function (annotationString) {

        var annotation = {
            //title - from @dev
            'title': '',

            //rest of annotation, except @dev и @param (method, events and public vars) и @title (contract)
            'description': '',

            //from @param
            'params': {}
        };


        annotationString.split(/\r?\n/).forEach(str => {

            for (var titleParam of ['@title', '@dev'])
                if (str.startsWith(titleParam + ' ')) {
                    annotation.title = str.substring(titleParam.length + 1);
                }

            if (str.startsWith('@param ')) {

                var [param , typeHint, ...paramDesc] = str.substring(7).split(' ');
                var optional = false;

                if (typeHint.substr(0, 1) == '{' && typeHint.substr(typeHint.length - 2, 2) == '=}') {
                    typeHint = typeHint.substr(1, typeHint.length - 3);
                    optional = true;
                }
                else if (typeHint.substr(0, 1) == '{' && typeHint.substr(typeHint.length - 1, 1) == '}') {
                    typeHint = typeHint.substr(1, typeHint.length - 2);
                }
                else {
                    paramDesc.unshift(typeHint);
                    typeHint = null;
                }

                annotation.params[param] = {
                    'description': paramDesc.join(' '),
                    'typeHint': typeHint,
                    'optional': optional
                };
            }

            if (!str.startsWith('@')) annotation.description += str;
        });


        annotation.title = annotation.title || annotation.description;
        return annotation;
    }
}