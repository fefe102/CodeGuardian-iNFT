// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract DemoINFT is ERC721, Ownable {
    uint256 private _nextTokenId = 1;

    mapping(uint256 tokenId => bytes32 root) private _manifestRoots;
    mapping(uint256 tokenId => string uri) private _tokenURIs;

    event DemoMinted(address indexed to, uint256 indexed tokenId, bytes32 manifestRoot, string metadataURI);
    event ManifestRootUpdated(uint256 indexed tokenId, bytes32 manifestRoot);

    constructor(string memory name_, string memory symbol_, address initialAdmin) ERC721(name_, symbol_) Ownable(initialAdmin) {}

    function mintDemo(address to, string calldata metadataURI, bytes32 manifestRoot) external onlyOwner returns (uint256 tokenId) {
        tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _tokenURIs[tokenId] = metadataURI;
        _manifestRoots[tokenId] = manifestRoot;

        emit DemoMinted(to, tokenId, manifestRoot, metadataURI);
    }

    function setManifestRoot(uint256 tokenId, bytes32 manifestRoot) external {
        address tokenOwner = ownerOf(tokenId);
        if (msg.sender != tokenOwner && msg.sender != owner()) {
            revert OwnableUnauthorizedAccount(msg.sender);
        }

        _manifestRoots[tokenId] = manifestRoot;
        emit ManifestRootUpdated(tokenId, manifestRoot);
    }

    function manifestRootOf(uint256 tokenId) external view returns (bytes32) {
        ownerOf(tokenId);
        return _manifestRoots[tokenId];
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        ownerOf(tokenId);
        return _tokenURIs[tokenId];
    }
}
