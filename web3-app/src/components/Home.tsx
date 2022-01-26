import { QuestionIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  Image,
  SimpleGrid,
  Text
} from '@chakra-ui/react';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import HiHannyas from '../artifacts/contracts/NFT.sol/HiHannyas.json';
import WalletBalance from './WalletBalance';

type Props = {};

declare const window: any;

const contractAddress = '0x5077cAa147c89f3C8103e36f083a55016867da7B';

const provider = new ethers.providers.Web3Provider(window.ethereum);

// end user
const signer = provider.getSigner();

const contract = new ethers.Contract(contractAddress, HiHannyas.abi, signer);

const NFTImage = ({ tokenId, getCount }: any) => {
  // from pinata
  const contentId = 'QmQU98M4ExPLisDdMZb7qbtQRR7gThWtMeWHXdLNGBzBfG';
  const metadataURI = `${contentId}/${tokenId}.json`;
  console.log('metadataURI', metadataURI);
  const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId}.webp`;
  // const imageURI = `img/${tokenId.png} // to host locally

  const [isMinted, setIsMinted] = useState(false);

  useEffect(() => {
    getMintedStatus();
  }, []);

  const getMintedStatus = async () => {
    const result = await contract.isContentOwned(metadataURI);
    console.log(result);
    setIsMinted(result);
  };

  const mintToken = async () => {
    const connection = contract.connect(signer);
    const addy = connection.address;
    const res = await contract.payToMint(addy, metadataURI, {
      value: ethers.utils.parseEther('0.05'),
    });

    await res.wait();
    getMintedStatus();
    getCount();
  };

  async function getURI() {
    const uri = await contract.tokenURI(tokenId);
    alert(uri);
  }

  return (
    <Box
      border='solid 1px'
      borderColor='gray.200'
      p='4'
      rounded='md'
      textAlign='center'
    >
      {isMinted ? (
        <Image src={imageURI} />
      ) : (
        <QuestionIcon fontSize='60px' m='4' color='gray.300' />
      )}
      <Text fontSize='20px' fontWeight='700' textTransform='uppercase' mb='4'>
        ID # {tokenId}
      </Text>
      {!isMinted ? (
        <Button onClick={mintToken} colorScheme='teal'>
          Mint New Hannya
        </Button>
      ) : (
        <Button onClick={getURI} colorScheme='red'>
          Taken! Show URI
        </Button>
      )}
    </Box>
  );
};

const Home = (props: Props) => {
  const [totalMinted, setTotalMinted] = useState(0);
  console.log('totalMinted', totalMinted);

  useEffect(() => {
    getCount();
  }, []);

  const getCount = async () => {
    const count = await contract.count();
    setTotalMinted(parseInt(count));
  };

  return (
    <Box mt='4'>
      <Container maxW='120ch'>
        <WalletBalance />
        <Divider my='8' />
        <Box my='4'>
          <Heading mb='4'>Hi-Hannya NFT Collection</Heading>
          <SimpleGrid columns={3} spacing='4'>
            {Array(totalMinted + 1)
              .fill(0)
              .map((_, i) => (
                <Box key={i}>
                  <NFTImage tokenId={i} getCount={getCount} />
                </Box>
              ))}
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
