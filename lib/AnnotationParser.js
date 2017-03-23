function parseParamStr(annotation, str, options) {

  let annotationPrefix = `@${ annotation } `;

  let [param, typeHint, ...paramDesc] = str.substring(annotationPrefix.length).split(' ');
  let optional = false;

  let paramData = {};

  if (typeHint == undefined) {
    typeHint = null;
  }
  else {
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
  }
  paramData['description'] = paramDesc.join(' ');

  if (options.typeHint) paramData['typeHint'] = typeHint;
  if (options.optional) paramData['optional'] = optional;

  return { [param]: paramData };
}


module.exports = {


  parse: function (annotationString, _options = {}) {


    let options = Object.assign({}, {
      typeHint: true,
      optional: false
    }, _options);

    let annotation = {
      //title - from @dev
      'title': '',

      //rest of annotation, except @dev и @param (method, events and public vars) и @title (contract)
      'description': '',

      //from @param
      'params': {},

      //from @return
      'returns': {}
    };


    annotationString.split(/\r?\n/).forEach(str => {

      for (let titleParam of ['@title', '@dev'])
        if (str.startsWith(titleParam + ' ')) {
          annotation.title = str.substring(titleParam.length + 1);
        }


      for (let paramAnnotation of ['param', 'return']) {
        if (str.startsWith(`@${ paramAnnotation }`)) {
          Object.assign(annotation[paramAnnotation + 's'], parseParamStr(paramAnnotation, str, options));
        }
      }


      if (!str.startsWith('@')) annotation.description += str;
    });

    if (!Object.keys(annotation.returns).length) delete  annotation.returns;


    if (!annotation.title) {
      annotation.title = annotation.description;
      annotation.description = '';
    }
    return annotation;
  }
};