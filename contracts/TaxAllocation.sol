// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract TaxAllocation {
    struct Category {
        string name;
        uint256 allocated;
    }

    mapping(uint256 => Category) public categories;
    uint256 public categoryCount;

    constructor() {
        // Initialize with some categories
        categories[0] = Category("Healthcare", 0);
        categories[1] = Category("Education", 0);
        categoryCount = 2;
    }

    function allocateFunds(uint256 categoryId, uint256 amount) public {
        require(categoryId < categoryCount, "Invalid category");
        categories[categoryId].allocated += amount;
    }

    function getAllocation(uint256 categoryId) public view returns (uint256) {
        require(categoryId < categoryCount, "Invalid category");
        return categories[categoryId].allocated;
    }
}
