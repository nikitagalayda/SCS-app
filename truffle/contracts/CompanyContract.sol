// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";

contract CompanyContract is ERC1155, IERC1155Receiver {
    string company_name;
    uint256 founding_date;
    uint256 public num_shares;
    address[] public founders;
    mapping(address => bool) is_founder;
    address public contract_address;
    address constant burn_address = 0x000000000000000000000000000000000000dEaD;
    uint256 test_variable = 0;

    uint256 public constant CONTRACT = 1;

    modifier onlyFounders() {
        require(
            is_founder[msg.sender] == true || msg.sender == address(this),
            "function only available to founders"
        );

        _;
    }

    constructor(
        string memory company_name_,
        address[] memory founders_,
        uint256 num_shares_
    )
        public
        ERC1155(
            "https://ipfs.io/ipfs/QmYZqkyDrqLK4owVyQGGs3pG1qhQXjNV7Qr9jVn39owMme?filename=certificate.json"
        )
    {
        require(founders_.length > 0, "Number of owners must be non-zero");

        contract_address = address(this);
        company_name = company_name_;
        founding_date = block.timestamp;
        num_shares = num_shares_;

        for (uint256 i = 0; i < founders_.length; i++) {
            address founder = founders_[i];

            require(!is_founder[founder], "Not unique founder");

            is_founder[founder] = true;
            founders.push(founder);
        }

        _mint(address(this), CONTRACT, num_shares_, "");
    }

    function mintShares(uint256 amt) public onlyFounders {
        _mint(address(this), CONTRACT, amt, "");

        num_shares += amt;
    }

    function burnShares(uint256 amt) public onlyFounders {
        // safeTransferFrom(address(this), burn_address, CONTRACT, amt, "");
        _burn(address(this), CONTRACT, amt);

        num_shares -= amt;
    }

    function reissueShares(uint256 newAmount) public onlyFounders {
        burnShares(num_shares);
        mintShares(newAmount);
    }

    function getNumShares() public view returns (uint256) {
        return num_shares;
    }

    function incrementTestVariable() public onlyFounders {
        test_variable += 1;
    }

    function readTestVariable() public view returns (uint256) {
        return test_variable;
    }

    function onERC1155Received(
        address operator,
        address from,
        uint256 id,
        uint256 value,
        bytes calldata data
    ) public virtual override returns (bytes4) {
        return
            bytes4(
                keccak256(
                    "onERC1155Received(address,address,uint256,uint256,bytes)"
                )
            );
    }

    function onERC1155BatchReceived(
        address operator,
        address from,
        uint256[] calldata ids,
        uint256[] calldata values,
        bytes calldata data
    ) public virtual override returns (bytes4) {
        return
            bytes4(
                keccak256(
                    "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"
                )
            );
    }
}
