const BlockDeclaration = require('./BlockDeclaration');


class EnumDeclaration extends BlockDeclaration {


  parseAnnotationOptions() {
    return { typeHint: false };
  }


  getMembers() {
    return this.blockParsedData.members ? this.blockParsedData.members : [];
  }


  getStructure() {
    if (!this.blockParsedData) return {};


    // from annotation comes
    // {
    //    title : string
    //    description : string,
    //    params : {
    //      paramName : {
    //      description: string,
    //      typeHint: string | null,
    //      optional: bool,
    //      type : string  <-- added from params from block declaration
    //
    //    },
    // ...
    // }


    return Object.assign(
      {
        name: this.getName(),
        members: this.getMembers()
      },
      this.annotation);

  }
}


module.exports = EnumDeclaration;