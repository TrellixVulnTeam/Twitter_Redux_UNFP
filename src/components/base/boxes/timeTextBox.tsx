import React from 'react';
import styled from 'styled-components';

interface props {
  time: string;
}

export default ({time}:props) => {
  const setTime = (time: string) => {
    let now = new Date();
    let created = new Date(time);
    let result = (now.getTime() - created.getTime())/ (1000*60*60*24);
    
    result *= 24;
    if (result > 1) {
      return `${Math.floor(result)}hours`
    }

    result *= 60;
    if (result > 1) {
      return `${Math.floor(result)}minitess..`
    }

    result *= 60;
    return `${Math.floor(result)}seconds...`
  }
  
  return (
    <TextBox>{setTime(time)}</TextBox>
  )
}

const TextBox = styled.span`
  padding: 1px;
`;