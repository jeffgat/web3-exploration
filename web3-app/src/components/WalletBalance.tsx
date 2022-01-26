import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';
import React, { useState } from 'react';

declare const window: any;

type Props = {};

const WalletBalance = (props: Props) => {
  const [balance, setBalance] = useState('');
  const [balanceShowing, toggleBalanceShowing] = useState(false);

  const getBalance = async () => {
    const [account] = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(account);
    const temp = parseFloat(ethers.utils.formatEther(balance)).toFixed(3);
    setBalance(temp.toString());
    toggleBalanceShowing(true);
  };

  const clearBalance = () => {
    setBalance('');
    toggleBalanceShowing(false);
  };

  return (
    <Box>
      <Heading fontSize='20px' mb='4'>
        Your ETH Balance:{' '}
        <Text as='span' textDecoration='underline'>
          {balance}
        </Text>
      </Heading>
      {!balanceShowing ? (
        <Button
          colorScheme='blue'
          onClick={() => {
            getBalance();
          }}
          fontWeight='700'
          leftIcon={<ViewIcon />}
        >
          Show My Balance
        </Button>
      ) : (
        <Button
          colorScheme='blue'
          variant='outline'
          fontWeight='700'
          leftIcon={<ViewOffIcon />}
          onClick={clearBalance}
        >
          Hide My Balance
        </Button>
      )}
    </Box>
  );
};

export default WalletBalance;
