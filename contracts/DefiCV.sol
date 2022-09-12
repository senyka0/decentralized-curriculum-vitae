//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DefiCV {
    mapping(address => string[2][]) Users;
    address[] UserAdresses;

    function addCV(string memory CID, string memory time) public {
        if (Users[msg.sender].length == 0) {
            UserAdresses.push(msg.sender);
        }
        Users[msg.sender].push([CID, time]);
    }

    function getUser(address addr) public view returns (string[2][] memory) {
        return Users[addr];
    }

    function getUserAdresses() public view returns (address[] memory) {
        return UserAdresses;
    }
}
