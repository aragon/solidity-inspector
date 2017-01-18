pragma solidity ^0.4.4;

import "./Owned.sol";

/**
* Contract can be destroyed by owner
*/
contract Mortal is Owned {


    /** Function to recover the funds on the contract */
    function kill() {
       if (msg.sender == owner) selfdestruct(owner);
    }
}