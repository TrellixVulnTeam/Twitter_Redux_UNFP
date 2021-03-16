import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import { useParams, withRouter, RouteComponentProps } from 'react-router-dom';
import { Dispatch, compose } from 'redux';
import { connect } from 'react-redux';
import { State } from "../store/reducers/index";
import { getTweetDetailApi } from '../store/actions/tweetDetail';
import { GetTweetDetailUseData } from '../api/tweetDetail';
import { Main, Tweet } from '../pages/index';
import { TweetCardUseData } from '../components/base/tweet/tweetCard';

interface TweetDetailProps extends RouteComponentProps<any> {
  getTweetDetailApi: ({ tweetNumber }: GetTweetDetailUseData) => object;
  mainTweet: TweetCardUseData;
  replyList: Array<TweetCardUseData>;
}
interface ParamsTypes {
  tweetNumber: string; // 동적라우팅에서 받아온 숫자값이여서 수가 아닌 스트링형태이다... 좀더 간결하게 변환하는법을 잘 생각해보자
}

const TweetContainer: React.FC<TweetDetailProps> = ({
  getTweetDetailApi,
  mainTweet,
  replyList,
}) => {
  const { tweetNumber } = useParams<ParamsTypes>();
  useEffect(()=>{
    getTweetDetailApi({ tweetNumber: Number( tweetNumber )})
  }, [])
  
  const onClickHandler = () => {

  }
  console.log(mainTweet, replyList)
  return (
    <>
      <Main components={<Tweet
        onClick={ onClickHandler } 
        mainTweet={ mainTweet }
        replyList={ replyList }
      />}/>
    </>
  )
}

const mapStateToProps = (rootState: State) => ({
  mainTweet: rootState.tweetDetailReducer.main,
  replyList: rootState.tweetDetailReducer.replyList
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getTweetDetailApi: ({ tweetNumber }: GetTweetDetailUseData) => {
    return dispatch(getTweetDetailApi.request({ tweetNumber }));
  }
});

export default withRouter(
  compose(connect(mapStateToProps, mapDispatchToProps))(TweetContainer)
);