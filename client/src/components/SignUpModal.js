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
import { signup } from '../redux/actions/userActions';
import { useHistory } from 'react-router-dom';

const SignUpModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const { loading, data } = useSelector((state) => state.user);

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  useEffect(() => {
    if (data?.data.user) {
      history.push('/chat');
    }
  }, [data]);

  const onSubmit = () => {
    dispatch(signup({ name, email, password, userId }));
  };
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Your Name"
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email Address"
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>UserId</FormLabel>
              <Input
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter User ID"
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
              loadingText="Submitting"
              onClick={onSubmit}
              colorScheme="blue"
              mr={3}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SignUpModal;

/* if (data?.status === 'Success') {
      toast({
        title: 'Signup Success.',
        description: 'You will be redirected to the main page',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }*/
