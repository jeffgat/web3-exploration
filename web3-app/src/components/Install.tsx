import { Box, Heading, Link } from '@chakra-ui/react';
import React from 'react';

type Props = {};

const Install = (props: Props) => {
  return (
    <Box>
      <Heading>Follow the link to install Meta Mask</Heading>
      <Link href='https://metamask.io/download.html'>Meta Mask</Link>
    </Box>
  );
};

export default Install;
