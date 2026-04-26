// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

interface IERC721Owner {
    function ownerOf(uint256 tokenId) external view returns (address);
}

contract ProofOfIntelligenceRegistry is Ownable {
    error NotAuthorized();
    error PassportNotFound(bytes32 passportId);
    error PassportAlreadyRegistered(bytes32 passportId);
    error InvalidInput();

    struct Passport {
        address inftContract;
        uint256 tokenId;
        uint256 chainId;
        address tokenOwner;
        bytes32 manifestRoot;
        bytes32 intelligenceBundleRoot;
        bytes32 memoryRoot;
        bytes32 latestRunRoot;
        string metadataURI;
        uint64 updatedAt;
        bool registered;
    }

    struct Certificate {
        uint256 certificateId;
        bytes32 passportId;
        address inftContract;
        uint256 tokenId;
        address issuedTo;
        address issuer;
        bytes32 proofRoot;
        string proofURI;
        uint64 issuedAt;
    }

    uint256 private _nextCertificateId = 1;

    mapping(bytes32 passportId => Passport passport) private _passports;
    mapping(uint256 certificateId => Certificate certificate) private _certificates;
    mapping(bytes32 passportId => uint256 certificateId) public latestCertificateIdOf;

    event PassportRegistered(
        bytes32 indexed passportId,
        address indexed inftContract,
        uint256 indexed tokenId,
        address tokenOwner,
        bytes32 manifestRoot
    );
    event RootsUpdated(
        bytes32 indexed passportId,
        bytes32 manifestRoot,
        bytes32 intelligenceBundleRoot,
        bytes32 memoryRoot,
        bytes32 latestRunRoot
    );
    event CertificateIssued(
        uint256 indexed certificateId,
        bytes32 indexed passportId,
        address indexed issuedTo,
        bytes32 proofRoot,
        string proofURI
    );

    constructor(address initialAdmin) Ownable(initialAdmin) {}

    function passportId(address inftContract, uint256 tokenId) public pure returns (bytes32) {
        return keccak256(abi.encode(inftContract, tokenId));
    }

    function registerPassport(
        address inftContract,
        uint256 tokenId,
        uint256 chainId,
        bytes32 manifestRoot,
        bytes32 intelligenceBundleRoot,
        bytes32 memoryRoot,
        bytes32 latestRunRoot,
        string calldata metadataURI
    ) external returns (bytes32 id) {
        if (inftContract == address(0) || chainId == 0) {
            revert InvalidInput();
        }

        id = passportId(inftContract, tokenId);
        if (_passports[id].registered) {
            revert PassportAlreadyRegistered(id);
        }

        address tokenOwner = IERC721Owner(inftContract).ownerOf(tokenId);
        _requireAdminOrTokenOwner(tokenOwner);

        _passports[id] = Passport({
            inftContract: inftContract,
            tokenId: tokenId,
            chainId: chainId,
            tokenOwner: tokenOwner,
            manifestRoot: manifestRoot,
            intelligenceBundleRoot: intelligenceBundleRoot,
            memoryRoot: memoryRoot,
            latestRunRoot: latestRunRoot,
            metadataURI: metadataURI,
            updatedAt: uint64(block.timestamp),
            registered: true
        });

        emit PassportRegistered(id, inftContract, tokenId, tokenOwner, manifestRoot);
    }

    function updateRoots(
        address inftContract,
        uint256 tokenId,
        bytes32 manifestRoot,
        bytes32 intelligenceBundleRoot,
        bytes32 memoryRoot,
        bytes32 latestRunRoot
    ) external {
        bytes32 id = passportId(inftContract, tokenId);
        Passport storage passport = _requirePassport(id);
        address tokenOwner = IERC721Owner(inftContract).ownerOf(tokenId);
        _requireAdminOrTokenOwner(tokenOwner);

        passport.tokenOwner = tokenOwner;
        passport.manifestRoot = manifestRoot;
        passport.intelligenceBundleRoot = intelligenceBundleRoot;
        passport.memoryRoot = memoryRoot;
        passport.latestRunRoot = latestRunRoot;
        passport.updatedAt = uint64(block.timestamp);

        emit RootsUpdated(id, manifestRoot, intelligenceBundleRoot, memoryRoot, latestRunRoot);
    }

    function issueCertificate(
        address inftContract,
        uint256 tokenId,
        bytes32 proofRoot,
        string calldata proofURI
    ) external returns (uint256 certificateId) {
        bytes32 id = passportId(inftContract, tokenId);
        _requirePassport(id);
        address tokenOwner = IERC721Owner(inftContract).ownerOf(tokenId);
        _requireAdminOrTokenOwner(tokenOwner);

        certificateId = _nextCertificateId++;
        _certificates[certificateId] = Certificate({
            certificateId: certificateId,
            passportId: id,
            inftContract: inftContract,
            tokenId: tokenId,
            issuedTo: tokenOwner,
            issuer: msg.sender,
            proofRoot: proofRoot,
            proofURI: proofURI,
            issuedAt: uint64(block.timestamp)
        });
        latestCertificateIdOf[id] = certificateId;

        emit CertificateIssued(certificateId, id, tokenOwner, proofRoot, proofURI);
    }

    function getPassport(address inftContract, uint256 tokenId) external view returns (Passport memory) {
        return _requirePassport(passportId(inftContract, tokenId));
    }

    function getCertificate(uint256 certificateId) external view returns (Certificate memory) {
        Certificate memory certificate = _certificates[certificateId];
        if (certificate.certificateId == 0) {
            revert InvalidInput();
        }
        return certificate;
    }

    function _requirePassport(bytes32 id) private view returns (Passport storage passport) {
        passport = _passports[id];
        if (!passport.registered) {
            revert PassportNotFound(id);
        }
    }

    function _requireAdminOrTokenOwner(address tokenOwner) private view {
        if (msg.sender != owner() && msg.sender != tokenOwner) {
            revert NotAuthorized();
        }
    }
}
