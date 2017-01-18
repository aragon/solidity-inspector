pragma solidity ^0.4.4;

/**
* Contract can be destroyed by owner
*/
contract Mortal {
    /** Define variable owner of the type address*/
    address owner;

    /** this function is executed at initialization and sets the owner of the contract */
    function Mortal() {
       owner = msg.sender;
     }

    /** Function to recover the funds on the contract */
    function kill() {
       if (msg.sender == owner) selfdestruct(owner);
    }
}