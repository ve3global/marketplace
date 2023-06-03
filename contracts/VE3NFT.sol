// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "../node_modules/@openzeppelin/contracts/security/Pausable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "../node_modules/@openzeppelin/contracts/utils/Strings.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract VE3NFT is IERC1155, Pausable, ERC1155Supply {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    string baseURI =
        "https://ipfs.io/ipfs/QmcDRWwXCE1LjvdESNZsmc75syTJP2zA8WW9SHEaCwEmkc/";

    mapping(uint tokenId => address) public royalOwners;
    mapping(uint => uint) public totalTokens; // to keep this for marketplace contract
    mapping(uint => mapping(address => uint)) royalPrice;

    // address marketplace=0x3D3ffb789e238E0BD6d3d5039E39224F6b20Ca56;
    // address marketplace;
    constructor() ERC1155(baseURI) {}

    event minted(
        uint supply,
        uint royalPrice,
        address marketplace,
        address royalOwner,
        uint tokenId,
        string uri
    );

    function mintTokens(
        uint256 _supply,
        uint _royalPrice,
        address marketplace,
        string memory _uri
    ) public {
        _tokenIds.increment();
        uint256 newTokenId= _tokenIds.current();
        _mint(msg.sender, newTokenId, _supply, "");
        royalOwners[newTokenId] = msg.sender;
        totalTokens[newTokenId] = _supply;
        royalPrice[newTokenId][msg.sender] = _royalPrice;
        setApprovalForAll(marketplace, true);
        emit minted(
            _supply,
            _royalPrice,
            marketplace,
            msg.sender,
            newTokenId,
            _uri
        );
    }

    // upload-->img uri
    // name,img uri ,des,amount,royality --. json file --> pinata--> uri---->mintTokens(amount,royalprice,uri(json))
    function getRoyalOwner(uint tokenId) public view returns (address) {
        return royalOwners[tokenId];
    }

    function getTotalToken(uint tokenId) external view returns (uint) {
        return totalTokens[tokenId];
    }

    function getRoyalPrice(uint tokenId) external view returns (uint) {
        address _royalOwner = getRoyalOwner(tokenId);
        return royalPrice[tokenId][_royalOwner];
    }

    function uri(
        uint256 _id
    ) public view virtual override returns (string memory) {
        require(exists(_id), "URI: nonexistance token"); //exists  function comes from ERC1155Supply.sol i.e supply tracking
        return
            string(
                abi.encodePacked(super.uri(_id), Strings.toString(_id), ".json") //this would return .json url which would give the json object for that nft
                // in case of super.uri(_id) we can also use baseUri
            );
    }
}
