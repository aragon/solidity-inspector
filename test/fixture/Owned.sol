pragma solidity ^0.4.4;

/**
* Contract with owner
*/
contract Owned {
    /** Owner of the contract*/
    address public owner;

    string someNotPublicVar;

    /** Ititialization owner of contract */
    function Owned() {
       owner = msg.sender;
     }
}