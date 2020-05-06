import React, { useState, useEffect }  from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Header } from '../../components/Header';
import { ContentDisplay } from '../../components/ContentDisplay';
import { SideMenu } from '../../components/SideMenu';
import { VideoDetails } from '../../components/VideoDetails';
import { CommentItem } from '../../components/CommentItem'
import { createComment, getVideoComments, getVideoReactions, reactVideo } from '../../actions/video'
import { push } from "connected-react-router";
import { routes } from "../Router/index";
import * as moment from 'moment'; 
import 'moment/locale/pt-br';


export function VideoDetailsPage() {
  const initialState = {
    comment: ''
  }

  const dispatch = useDispatch();
  const visibleMenu = useSelector((state) => state.user.visibleMenu);
  const videoData = useSelector((state) => state.video.videoDetails);
  const reaction = useSelector((state) => state.video.videoReaction);
  const comments = useSelector((state) => state.video.videoComments);
  const [form, setForm] = useState(initialState)
  const videoId = videoData.id


  useEffect(() => {
    dispatch(getVideoComments(videoId))
  }, [dispatch, videoId]);

  useEffect(() => {
    dispatch(getVideoReactions(videoId))
  }, [dispatch, videoId, reaction]);

  const handleChange = (event) => {
    const auxForm = { ...form };
    auxForm[event.target.name] = event.target.value;
    setForm(auxForm);
  };

  const handleSubmitComment = (videoId) => {
    dispatch(createComment(videoId, form.comment))
    setForm(initialState)
  };

  const  handleReactVideo = (videoId, reaction) => {
    dispatch(reactVideo(videoId, reaction))
  };

  return(
    <>
      <Header menu/>
      <ContentDisplay>
        {visibleMenu ? <SideMenu/> : null}
        {videoData ?         
        <VideoDetails
          video={videoData.url}
          title={videoData.title}
          postDate={moment(videoData.creationTime).locale('pt-br').fromNow()}
          avatar={videoData.userPicture}
          author={videoData.userName}
          description={videoData.description}
          reaction={reaction}
          onChange={handleChange}
          comment={form.comment}
          onClickComment={() => handleSubmitComment(videoData.id)}
          onLike={() => handleReactVideo(videoData.id, 'like')}
          onDislike={() => handleReactVideo(videoData.id, 'dislike')}
        >
          {comments && comments.map(comment => (
            <CommentItem
              key={comment.id}
              avatar={comment.userPicture}
              author={comment.userName}
              time={moment(comment.time).locale('pt-br').fromNow()}
              comment={comment.message}
            />
          ))}
        </VideoDetails> :
        dispatch(push(routes.home))}
      </ContentDisplay>
    </>
  );
}