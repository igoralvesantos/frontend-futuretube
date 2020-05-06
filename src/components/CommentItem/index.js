import React from 'react';
import styled from 'styled-components';

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: initial;
  justify-content: initial;
  margin: 5px 0;
`

const Avatar = styled.img`
  max-width: 50px;
  max-height: 50px;
  border-radius: 50px;
  margin-left: 7px;
  align-self: initial;
`

const CommentTime = styled.p`
  font-size: 13px;
  color: grey;
  margin: 6px 0 0 7px;
`

const Author = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin: 3px 0 0 14px;
`

const Comment = styled.p`
  font-size: 14px;
  margin-top: 10px;
  margin-left: 14px;
`

const CommentInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: initial;
  justify-content: initial;
`

const CommentHeader = styled.div`
  display: flex;
  align-self: initial;
  justify-self: initial;
`


export function CommentItem(props) {
  return(
    <ContentContainer>
      <div>
        <Avatar src={props.avatar}/>
      </div>
      <CommentInfo>
        <CommentHeader>
          <Author>{props.author}</Author>
          <CommentTime>{props.time}</CommentTime>
        </CommentHeader>
        <Comment>{props.comment}</Comment>
      </CommentInfo>
    </ContentContainer>
  );
}