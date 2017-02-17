pragma solidity ^0.4.4;

/**
* Contract has public arrays
*/
contract HasPublicArray {


  /**
   * My structure lon long description
   * @dev my structure short description
   * @param someString Description of string param
   * @param someUint
   */
   struct MyStruct  {
      string someString;
      uint someUint;
      address someAddress;
   }


   /**
   * Array of strings is here
   */
   string[] public someStrings;


   /**
   * Array of structs is here
   */
   MyStruct[] public someStructs;


   MyStruct[] public someAnotherStructs;


}