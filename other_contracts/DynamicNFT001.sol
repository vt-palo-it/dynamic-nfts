// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DynamicNFT001 is ERC721Enumerable, Ownable {
// baseURI of your inital asset metadata
  string baseURI;
// Changed Uri for the new asset metadata
  string public changedUri;
// pause the contract and stops from minting
  bool public paused = false;

// create mapping of the Character for changing the asset
  struct Toon {
      // bool for wether the box is sealed or unboxed
      uint256 level;
  }
// mapping  get filled with boxes erverytime someone claims a box
  mapping (uint256 => Toon) public toons;
  constructor() ERC721("DynamicNFT", "DNFT") {}
    
  // internal function to return the current base URI
  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }
  // mint function which sets the nft in state sealed
  function claim(string memory _initBaseURI, string memory _initChangedUri) public {
    require(!paused, "Contract is paused");
    uint256 supply = totalSupply();
    // set state sealed of this box
    Toon memory newToon = Toon(1);
    setBaseURI(_initBaseURI);
    setChangedURI(_initChangedUri);
    // we take the boxes mapping and add supply + 1 to add it to the next mapping
    toons[supply + 1] = newToon;
    _safeMint(msg.sender, supply + 1);
  }

// this is for changing the Asset
  function tokenURI(uint256 _tokenId) public view virtual override returns (string memory) {
    // checks if this token exists
    require(_exists(_tokenId),"ERC721Metadata: URI query for nonexistent token");
    Toon memory currentToon = toons[_tokenId];

    if(currentToon.level == 1) {
        return _baseURI(); 
    }else if(currentToon.level == 2){
        return changedUri;
    }}

// unbox function to change the nft to unboxed
 function changeNFT(uint256 _tokenId, uint256 level) public {
    require(msg.sender == ownerOf(_tokenId), "You are not the owner of this NFT.");

    Toon storage currentToon = toons[_tokenId];
    currentToon.level = 2;
  }

//set reveal MetaData URI
  function setChangedURI(string memory _ChangedURI) public onlyOwner {
    changedUri = _ChangedURI;
  }
//set inital MetaData URI
  function setBaseURI(string memory _newBaseURI) public onlyOwner {
    baseURI = _newBaseURI;
  }
// pause can only owner
  function pause(bool _state) public onlyOwner {
    paused = _state;
  }

 string _contractURI = "ipfs://bafyreigv4sur6m6xq3lqk6qe5d7boy6abytyzve7qfwvqyztqo73igzryy/metadata.json";
    function contractURI() public view returns (string memory) {
    return _contractURI;
}
function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
  ) public override {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            'ERC721: transfer caller is not owner nor approved'
        );
        _transfer(from, to, tokenId);
  }

    /// @inheritdoc	ERC165
    // function supportsInterface(bytes4 interfaceId)
    // public
    // view
    // virtual
    // override(ERC721)
    // returns (bool)
    // {
    //     return super.supportsInterface(interfaceId);
    // }

}
