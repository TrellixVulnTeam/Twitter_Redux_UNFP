import * as React from 'react';
import { useState } from 'react';
import { withRouter } from 'react-router-dom'; //왜리액트라우터 에서 담겻는지 모르겠음
import { Dispatch, compose } from 'redux';
import { connect } from 'react-redux';
import {
  postCreateAccountApi,
  postLoginAccountApi
} from '../store/actions/user';
import { CreateAccountUseData, LoginUserUseData } from '../api/user';
import { Auth } from '../pages/index';

interface AuthContainerProps {
  postCreateAccountApi: ({ email, name, password, profile }: CreateAccountUseData) => object;
  postLoginAccountApi: ({ email, password }: LoginUserUseData) => object;
}

const AuthContainer: React.FC<AuthContainerProps> = ({
  postCreateAccountApi,
  postLoginAccountApi
}) => {
  const [ userEmail, setUserEmail ] = useState('');
  const [ userName, setUserName ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ profile, setProfile ] = useState('');
  const [ checkPassword, setCheckPassword ] = useState('');
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ isModal, setIsModal ] = useState(false);
  
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'userEmail': setUserEmail(value) 
        break;
      case 'userName': setUserName(value) 
        break;
      case 'password': setPassword(value) 
        break;
      case 'checkPassword': setCheckPassword(value) 
        break;
      case 'profile': setProfile(value) 
        break;
    }
  }

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name } = event.currentTarget;

    switch (name) {
      case 'loginAccount':
        if(userEmail === '') {
          setErrorMessage('Please enter your email')
          break;
        }
        if(password === '') {
          setErrorMessage('Please enter your password')
          break;
        }
        postLoginAccountApi({
          email: userEmail,
          password: password
        })
        break;

      case 'createAccount':
        if(userEmail === '') {
          setErrorMessage('Please enter your email')
          break;
        }
        if(userName === '') {
          setErrorMessage('Please enter your name')
          break;
        }
        if(password === '') {
          setErrorMessage('Please enter your password')
          break;
        }
        if(checkPassword === '') {
          setErrorMessage('Please enter your password checked')
          break;
        }
        if(checkPassword !== password) {
          setErrorMessage('password is different from password checked')
          break;
        }
        postCreateAccountApi({
          email: userEmail,
          name: userName,
          password: password,
          profile: profile
        })
        break;
    }
  }

  const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.currentTarget;

    switch (name) {
      case 'modal': setIsModal(prev => !prev);
        break;
    }
  }

  return (
    <Auth
      onChange={onChangeHandler}
      onSubmit={onSubmitHandler}
      onClick={onClickHandler}
      userEmail={userEmail}
      userName={userName}
      profile={profile}
      password={password}
      checkPassword={checkPassword}
      errorMessage={errorMessage}
      isModal={isModal}
    />
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  postCreateAccountApi: ({ email, name, password, profile}: CreateAccountUseData) => {
    return dispatch(postCreateAccountApi.request({email, name, password, profile}));
  },
  postLoginAccountApi: ({email, password}: LoginUserUseData) => {
    return dispatch(postLoginAccountApi.request({email, password}));
  }
});

export default withRouter(
  compose(connect(null, mapDispatchToProps))(AuthContainer)
);
