pragma solidity ^0.4.4;

/**
* Contract has structure
*/
contract HasStruct {

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

}