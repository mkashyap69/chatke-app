import React from 'react';
import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import SignUpModal from './SignUpModal';

const SignUpButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Button onClick={onOpen}>Sign Up</Button>
      <SignUpModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default SignUpButton;
