// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./CompanyContract.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";

contract SCS is IERC1155Receiver {
    event CompanyCreated(address indexed from);

    struct Company {
        string name;
        address[] founders;
        uint256 num_shares;
        address contract_address;
    }

    address owner;
    Company[] companies;

    modifier onlyOwner() {
        require(msg.sender == owner);

        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addCompany(
        string memory company_name_,
        address[] memory founders_,
        uint256 num_shares_
    ) public {
        address company_contract_address = address(
            new CompanyContract(company_name_, founders_, num_shares_)
        );

        companies.push(
            Company({
                name: company_name_,
                founders: founders_,
                num_shares: num_shares_,
                contract_address: company_contract_address
            })
        );

        emit CompanyCreated(msg.sender);
    }

    function getCompanies() public view returns (Company[] memory) {
        return companies;
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

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override
        returns (bool)
    {
        return interfaceId == type(IERC165).interfaceId;
    }
}
