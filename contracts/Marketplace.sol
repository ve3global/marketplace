// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "../node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "./VE3NFT.sol";

contract Marketplace is ERC1155Holder {
    using Counters for Counters.Counter;
    Counters.Counter private itemCount;
    uint256 highestBid;
    address payable highestBidder;
    uint256 public startingAt;
    uint256 public endingAt;
    uint256 public discountRate;
    uint256 public startingPrice;
    struct Item {
        uint256 itemId;
        IERC1155 nft;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        address payable royalOwner;
        uint256 price;
        bool onSale;
    }
    address nftContract;
    mapping(uint256 => mapping(uint256 => Item)) public idItem;
    VE3NFT a;

    constructor(address _nftContract) {
        a = VE3NFT(_nftContract);
        nftContract = _nftContract;
    }

    event tokenOnSale(
        uint256 indexed itemId,
        uint256 indexed tokenId,
        address nftContract,
        address owner,
        address seller,
        address royalOwner,
        uint256 price,
        uint256 amount
    );
    event tokenBought(
        uint256 indexed itemId,
        uint256 indexed tokenId,
        address owner,
        address royalOwner,
        uint256 amount
    );

    function putTokenOnSale(
        uint256 _tokenId,
        uint256 _amount,
        uint256 price
    ) external {
        require(price > 0, "PRice must be greater than 0");
        itemCount.increment();
        uint256 itemId = itemCount.current();
        require(
            msg.sender == a.getRoyalOwner(_tokenId) ||
                msg.sender == idItem[_tokenId][itemId - 1].owner,
            "You must be the owner of token"
        );
        idItem[_tokenId][itemId] = Item(
            itemId,
            IERC1155(a),
            _tokenId,
            payable(msg.sender),
            payable(address(0)),
            payable(a.getRoyalOwner(_tokenId)),
            price,
            true
        );
        IERC1155(a).safeTransferFrom(
            msg.sender,
            address(this),
            _tokenId,
            _amount,
            ""
        );
        emit tokenOnSale(
            itemId,
            _tokenId,
            nftContract,
            address(0),
            msg.sender,
            a.getRoyalOwner(_tokenId),
            price,
            _amount
        );
    }

    function buyToken(
        uint256 _itemId,
        uint256 _amount,
        uint256 _tokenId
    ) external payable {
        Item memory item = idItem[_tokenId][_itemId];
        require(item.itemId > 0, "Item not listed");
        require(msg.value == item.price * _amount, "Not enough money to buy");
        require(
            _amount <= a.balanceOf(address(this), _itemId),
            "Not enough balance in marketplace contract" // insuffiecient quantity of NFT
        );
        require(
            msg.sender != a.getRoyalOwner(_tokenId) ||
                msg.sender != idItem[_tokenId][_itemId - 1].owner,
            "You are the owner of token"
        );
        uint256 royalPrice = a.getRoyalPrice(_tokenId); // getting the royal Price
        uint256 amountToTransfer = (item.price * royalPrice * _amount) / 100;
        item.royalOwner.transfer(amountToTransfer);
        item.seller.transfer(item.price - amountToTransfer);
        item.nft.safeTransferFrom(
            address(this),
            msg.sender,
            item.tokenId,
            _amount,
            ""
        );
        idItem[_tokenId][_itemId].owner = payable(msg.sender);
        idItem[_tokenId][_itemId].seller = payable(address(0));
        emit tokenBought(
            _itemId,
            _tokenId,
            msg.sender,
            a.getRoyalOwner(_tokenId),
            _amount
        );
    }
}

