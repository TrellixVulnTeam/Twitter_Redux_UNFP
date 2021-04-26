import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Dispatch, compose } from 'redux';
import { connect } from 'react-redux';
import { State } from "../../store/reducers/index";
import { SelfData } from '../../store/reducers/user';
import { useChange, useClick, useSubmit } from '../../handler/index';
import { Tweet } from '../../components/index';

interface TweetContainerUseProps extends RouteComponentProps<any> {
  reply_id?: number;
  self: SelfData;
  res: any;
}

const initialState = {tweet_text: '', imageFile: {}, preview_image: ''};
const TweetContainer: React.FC<TweetContainerUseProps> = ({
  reply_id,
  self,
  res,
}) => {
  const [ state, onChangeHandler ] = useChange(initialState);
  const onSubmitHandler = useSubmit(state);
  const onClickHandler = useClick();

  return (
    <Tweet 
      onSubmit={onSubmitHandler}
      onClick={onClickHandler}
      onChange={onChangeHandler}
      self={self}
      state={state}
    />
  )
}

const mapStateToProps = (rootState: State) => ({
  self: rootState.userReducer.self,
  res: rootState.tweetReducer.res
})

export default withRouter(
  compose(connect(mapStateToProps))(TweetContainer)
);