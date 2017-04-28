pragma solidity ^0.4.4;


import "./HasStruct.sol";


/**
* Contract has public vars
*/
contract HasPublicVar is HasStruct {


    /** Some uint counter */
    uint public someCounter = 0;

    /** Public var with struct */
    //MyStruct public someStruct;
}