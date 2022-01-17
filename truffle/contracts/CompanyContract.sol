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

    mapping(address => bool) mint_votes;
    mapping(address => bool) burn_votes;
    mapping(address => bool) reissue_votes;

    uint256 public constant CONTRACT = 1;

    event MintSuccess(address indexed from);
    event BurnSuccess(address indexed from);
    event ReissueSuccess(address indexed from);

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
        mint_votes[msg.sender] = true;
        // mint_transactions.push(
        //     Transaction({
        //         initiator: msg.sender,
        //         value: amt,
        //         executed: false,
        //         num_confirmations: 0
        //     })
        // );

        for (uint256 i = 0; i < founders.length; i++) {
            if (!mint_votes[founders[i]]) {
                return;
            }
        }

        _mint(address(this), CONTRACT, amt, "");

        num_shares += amt;
        emit MintSuccess(address(this));
    }

    // function confirmMintShare(uint256 tx_idx)
    //     public
    //     onlyFounders
    //     mintTxExists(tx_idx)
    //     mintNotExecuted(tx_idx)
    //     mintNotConfirmed(tx_idx)
    // {
    //     Transaction storage transaction = mint_transactions[tx_idx];
    //     transaction.num_confirmations += 1;
    //     mint_confirmations[tx_idx][msg.sender] = true;
    // }

    // function executeMintShare(uint256 tx_idx)
    //     public
    //     onlyFounders
    //     mintTxExists(tx_idx)
    //     mintNotExecuted(tx_idx)
    // {
    //     Transaction storage transaction = mint_transactions[tx_idx];

    //     require(
    //         transaction.num_confirmations == founders.length,
    //         "Not enough confirmations"
    //     );

    //     transaction.executed = true;

    //     _mint(address(this), CONTRACT, transaction.value, "");

    //     num_shares += 1;
    // }

    function burnShares(uint256 amt) public onlyFounders {
        // safeTransferFrom(address(this), burn_address, CONTRACT, amt, "");
        burn_votes[msg.sender] = true;

        for (uint256 i = 0; i < founders.length; i++) {
            if (!burn_votes[founders[i]]) {
                return;
            }
        }
        _burn(address(this), CONTRACT, amt);

        num_shares -= amt;
        emit BurnSuccess(address(this));
    }

    function reissueShares(uint256 newAmount) public onlyFounders {
        burnShares(num_shares);
        mintShares(newAmount);

        emit ReissueSuccess(address(this));
    }

    function transferShares(address to, uint256 amount) public onlyFounders {
        require(amount <= num_shares, "Not enough shares");

        _safeTransferFrom(address(this), to, CONTRACT, amount, "");

        num_shares -= amount;
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
