const BlockDeclaration = require('./BlockDeclaration');


class EventDeclaration extends BlockDeclaration {

  //indexed params can only be in event
  prepareParam(paramData) {
    var param = super.prepareParam(paramData);
    param.isIndexed = paramData.is_indexed;
    return param;
  }
}


module.exports = EventDeclaration;