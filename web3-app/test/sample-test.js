const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('NFT', function () {
  it('Should mint and transfer an NFT to someone', async () => {
    const HiHannyas = await ethers.getContractFactory('HiHannyas');
    const hihannyas = await HiHannyas.deploy();
    await hihannyas.deployed();

    const recipient = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';
    const metadataURI = 'cid/test.png';

    let balance = await hihannyas.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newlyMintedToken = await hihannyas.payToMint(recipient, metadataURI, {
      value: ethers.utils.parseEther('0.05'),
    });

    await newlyMintedToken.wait();

    balance = await hihannyas.balanceOf(recipient);
    expect(balance).to.equal(1);

    expect(await hihannyas.isContentOwned(metadataURI)).to.equal(true);
  });
});
