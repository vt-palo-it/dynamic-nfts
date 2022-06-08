// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./standards/ERC2981PerToken.sol";

/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */

contract BlocSkillzNFT001 is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    uint private availableNFTs = 0;

    /**
    * @dev Mints NFT
    */
 
    constructor() ERC721("BlocSkillz", "BLS") {}

    /**
       * @dev Mints `tokenId` and transfers it to `to`.
     *
     * WARNING: Usage of _mint method is discouraged, use {_safeMint} whenever possible
     *
     * Requirements:
     *
     * - `tokenId` must not exist.
     * - `to` cannot be the zero address.
     *
     * Emits a {Transfer} event.
     */

/**
       * @dev .
     *
     * WARNING: Added a restriction of 20 Tokens to the safeMint function
     *
     */
    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _exists(tokenId);
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    /**
    * @dev .
     * _contractURI is for the OpenSea contract level metadata
     */

    string _contractURI = "ipfs://metadata.json";
    function contractURI() public view returns (string memory) {
    return _contractURI;
}
    /**
    * @dev Safely transfers `tokenId` token from `from` to `to`.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must exist and be owned by `from`.
     * - If the caller is not `from`, it must be approved to move this token by either {approve} or {setApprovalForAll}.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     *
     * function safeTransferFrom(
     *     address from,
     *     address to,
     *     uint256 tokenId
     * ) public override {
     *     require(
     *         _isApprovedOrOwner(_msgSender(), tokenId),
     *         'ERC721: transfer caller is not owner nor approved'
     *     );
     *     _transfer(from, to, tokenId);
     * }
     * 
    */



}
