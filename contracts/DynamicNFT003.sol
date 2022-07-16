// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DynamicNFT002 is ERC721Enumerable, Ownable {
  // baseURI of your inital asset metadata
  // string baseURI;
  // Changed Uri for the new asset metadata
  string[] levelUri;

  // create mapping of the Character for changing the asset
  struct Toon {
      // bool for wether the box is sealed or unboxed
      uint256 level;
  }
  // mapping  get filled with boxes erverytime someone claims a box
  mapping (uint256 => Toon) public toons;
  constructor() ERC721("BoxUnBoxNFT", "BUBN") {}


  // mint function which sets the nft in state sealed
  function mintNFT(string[] memory _levelURI) public onlyOwner {

    uint256 supply = totalSupply();
    // Set state to level 1
    Toon memory newToon = Toon(1);
    levelUri = _levelURI;
    // Add +1 to the supply of NFTs
    toons[supply + 1] = newToon;
    _safeMint(msg.sender, supply + 1);
  }



  // this is for changing the Asset
  function tokenURI(uint256 _tokenId) public view virtual override returns (string memory uri) {
    // checks if this token exists
    require(_exists(_tokenId),"ERC721Metadata: URI query for nonexistent token");
    Toon memory currentToon = toons[_tokenId];

    // if level is not bigger than array
    return levelUri[currentToon.level -1];
    // if(currentToon.level == 1) {
    //   return levelUri[0]; 
    // }else if(currentToon.level == 2){
    //   return levelUri[1];
    // }else if(currentToon.level == 3){
    //   return levelUri[2];
    // } else {
    //   return levelUri[0];
    // }
  }
  // unbox function to change the nft to unboxed
  function changeNFT(uint256 _tokenId, uint256 _level) public {
    //require(msg.sender == ownerOf(_tokenId), "You are not the owner of this NFT.");

    // dont allow higher level than array index
    Toon storage currentToon = toons[_tokenId];
    currentToon.level = _level;
  }

  string _contractURI = "ipfs://bafyreigv4sur6m6xq3lqk6qe5d7boy6abytyzve7qfwvqyztqo73igzryy/metadata.json";
  function contractURI() public view returns (string memory) {
    return _contractURI;
  }

  function safeTransferFrom(address from, address to, uint256 tokenId) public override {
    require(_isApprovedOrOwner(_msgSender(), tokenId), 'ERC721: transfer caller is not owner nor approved');
    _transfer(from, to, tokenId);
  }
}
