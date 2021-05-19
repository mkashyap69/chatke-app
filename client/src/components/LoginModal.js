/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  InputGroup,
  InputRightElement,
  Input,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { Button } from '@chakra-ui/button';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../redux/actions/userActions';
import { useHistory } from 'react-router-dom';
import { useToast } from '@chakra-ui/toast';

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const toast = useToast();

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const { loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      if (error.indexOf('E11000') > -1) {
        toast({
          title: `This userId is already taken`,
          status: 'error',
          isClosable: true,
        });
      } else {
        toast({
          title: `${error}`,
          status: 'error',
          isClosable: true,
        });
      }
    }
  }, [error]);

  const onSubmit = () => {
    dispatch(login(email, password));
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Log In your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4} isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input
                placeholder="Enter Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? 'text' : 'password'}
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={loading}
              onClick={onSubmit}
              colorScheme="blue"
              mr={3}
            >
              Login
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default LoginModal;

/*if (data?.status === 'Success') {
      toast({
        title: 'Login Success.',
        description: 'You will be redirected to the main page',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
    
    
    const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };*/
