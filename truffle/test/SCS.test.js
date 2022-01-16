// // test/Box.test.js
// // Load dependencies
// const { expect } = require('chai');

// // Load compiled artifacts
// const Box = artifacts.require('Box');

// // Start test block
// contract('SCS', function () {
//   beforeEach(async function () {
//     this.scs = await SCS.new();
//   });

//   // Test case
//   it('retrieve returns a value previously stored', async function () {
//     // Store a value
//     await this.box.store(42);

//     // Test if the returned value is the same one
//     // Note that we need to use strings to compare the 256 bit integers
//     expect((await this.box.retrieve()).toString()).to.equal('42');
//   });
// });
