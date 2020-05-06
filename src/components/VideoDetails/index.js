import React from 'react';
import styled from 'styled-components';
import LikeWhite from '../../resources/likeWhite.png';
import LikeBlack from '../../resources/likeBlack.png';
import DislikeWhite from '../../resources/dislikeWhite.svg';
import DislikeBlack from '../../resources/dislikeBlack.svg';

const ContentContainer = styled.div`
  height: 90vh;
  width: 100%;
  margin: 0.5em;
  padding: 0px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: initial;
  justify-content: initial;
  overflow: auto;
`

const VideoPlayer = styled.video`
  width: 100%;
  min-height: 75vh;
  margin: 0 auto;
  background: #000000;
`

const VideoInfo = styled.div`
  width: 65vw;
  margin: 1em auto;
  display: flex;
  flex-direction: column;
  align-items: initial;
  justify-content: initial;
  border-bottom: 2px solid #ebebeb;
`

const Title = styled.h3`
  margin: 0.5em 0;
`

const Author = styled.p`
  font-size: 16px;
  margin-left: 15px;
  margin-bottom: 5px;
  font-weight: bold;
`

const PostDate = styled.p`
  font-size: 13px;
  color: grey;
  margin-top: 0;
`

const Description = styled.p`
  font-size: 14px;
  margin: 1em 0 2em 75px;
`

const Avatar = styled.img`
  max-width: 50px;
  max-height: 50px;
  border-radius: 50px;
  margin-left: 0.5em;
  margin-top: 1em;
`

const UserInfo = styled.div`
  display: flex;
  align-items: initial;
  justify-content: initial;
`

const CommentArea = styled.div`
  width: 65vw;
  margin: 1em auto;
  display: flex;
  flex-direction: column;
  align-items: initial;
  justify-content: initial;
`

const CommentFild = styled.textarea`
  width: 100%;
  height: 5em;
  margin: 5px auto;
  border: none;
  box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.5);
`

const CommentButton = styled.button`
  width: fit-content;
  height: 3em;
  border-radius: 4px;
  border: 1px solid rgba(230,230,230, 1);
  background-color: #f02700;
  color: #000000;
  outline: none;
  align-self: flex-end;
  padding: 0 15px;
`

const LikeIcon = styled.img`
  width: 20px;
  height: 20px;
  align-self: flex-end;
  justify-self: flex-end;
  margin-left: 30px;
  margin-bottom: 10px;
`

const VideoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #ebebeb;
`

const ReactionContainer = styled.div`
  display: flex;
  justify-content: initial;
  align-items: initial;
`

export function VideoDetails(props) {
  return(
    <ContentContainer>
      <VideoPlayer controls>
        <source src={props.video}/>
      </VideoPlayer>
      <VideoInfo>
        <VideoHeader>
          <div>
            <Title>{props.title}</Title>
            <PostDate>{props.postDate}</PostDate>
          </div>
          <ReactionContainer>
            <LikeIcon onClick={props.onLike} src={props.reaction === 'like' ? LikeBlack : LikeWhite} alt='Like icon'/>
            <LikeIcon onClick={props.onDislike} src={props.reaction === 'dislike' ? DislikeBlack : DislikeWhite} alt='Dislike icon'/>
          </ReactionContainer>
        </VideoHeader>
        <UserInfo>
          <Avatar src={props.avatar}/>
          <Author>{props.author}</Author>
        </UserInfo>
        <div>
          <Description>{props.description}</Description>
        </div>
      </VideoInfo>
      <CommentArea>
        <CommentFild name='comment' value={props.comment} onChange={props.onChange}/>
        <CommentButton onClick={props.onClickComment}>Comentar</CommentButton>
        {props.children}
      </CommentArea>
    </ContentContainer>
  );
}