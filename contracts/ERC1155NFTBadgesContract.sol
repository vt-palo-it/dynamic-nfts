// contracts/NFTBadgesContract.sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTBadges is ERC1155, AccessControl, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    string public name;
    string public symbol;
    mapping (uint256 => string) private uris;
    mapping (string => uint256) private tokens;

    constructor(
        string memory _name,
        string memory _symbol
    )
        ERC1155("") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(URI_SETTER_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);

        name = _name;
        symbol = _symbol;

        //start token ID from index 1 for invalid token name check
        _tokenIdCounter.increment();
    }



    function uri(uint256 tokenId) override public view returns (string memory) {
        require(bytes(uris[tokenId]).length != 0, "uri for this token id is not set"); 
        return(uris[tokenId]);
    }

    function getTokenCount() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

    function setTokenId(string memory tokenName) public onlyRole(URI_SETTER_ROLE) {
        require(tokens[tokenName] == 0, "Cannot set token name twice"); 
        uint256 tokenId = _tokenIdCounter.current();
        tokens[tokenName] = tokenId;
        _tokenIdCounter.increment();
    }

    function getTokenId(string memory tokenName) public view returns (uint256) {
        require(tokens[tokenName] > 0, "No token exist with this name");
        return tokens[tokenName];
    }

    function setTokenUriById(uint256 tokenId, string memory _uri) public onlyRole(URI_SETTER_ROLE) {
        require(bytes(uris[tokenId]).length == 0, "Cannot set uri twice"); 
        uris[tokenId] = _uri; 
    }

    function setTokenUri(string memory tokenName, string memory _uri) public onlyRole(URI_SETTER_ROLE) {
        uint256 tokenId = getTokenId(tokenName);
        setTokenUriById(tokenId, _uri);
    }

    function getTokenUri(string memory tokenName) public view returns (string memory) {
        uint256 tokenId = getTokenId(tokenName);
        return uri(tokenId);
    }

    function setToken(string memory tokenName, string memory _uri) public onlyRole(URI_SETTER_ROLE) {
        setTokenId(tokenName);
        setTokenUri(tokenName, _uri);
    }


    function getBalance(address _account, string memory tokenName) public onlyRole(DEFAULT_ADMIN_ROLE) view returns (uint256) {
        uint256 tokenId = getTokenId(tokenName);
        return balanceOf(_account, tokenId);
    }

    function mint(address account, string memory tokenName, uint256 amount, bytes memory data)
        public
        onlyRole(MINTER_ROLE) {
        uint256 tokenId = getTokenId(tokenName);
        _mint(account, tokenId, amount, data);
    }

    function getBalanceBatch(address[] memory accounts, string[] memory tokenNames) public onlyRole(DEFAULT_ADMIN_ROLE) view returns (uint256[] memory) {
        uint256[] memory ids = new uint256[](tokenNames.length);
        
        for (uint i=0; i < tokenNames.length; i++) {
            ids[i] = getTokenId(tokenNames[i]);
        }
        return balanceOfBatch(accounts, ids);
    }

    function mintBatch(address to, string[] memory tokenNames, uint256[] memory amounts, bytes memory data)
        public
        onlyRole(MINTER_ROLE) {
        uint256[] memory ids = new uint256[](tokenNames.length);
        
        for (uint i=0; i < tokenNames.length; i++) {
            ids[i] = getTokenId(tokenNames[i]);
        }

        _mintBatch(to, ids, amounts, data);
    }

    // The following functions are overrides required by Solidity.

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155, AccessControl)
        returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}