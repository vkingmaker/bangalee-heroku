import React, { Fragment, Component } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import SelectedVideo from '../../components/SelectedVideo/SelectedVideo';
import VideoList from '../../components/VideoList/VideoList';
import {
  getVideo,
  likeVideo,
  deleteVideo,
  addComment,
  getComment
} from '../../lib/api';
import { IVideo, IFeedback } from '../../lib/interface/types';

interface IVideoState {
  videos: IVideo[];
  selectedVideo: IVideo;
  comments: IFeedback[];
  selectedComments: IFeedback[];
}
class Videos extends Component {
  state: IVideoState = {
    videos: [],
    selectedVideo: { id: '', title: '', thumb_nail: '', url: '' },
    comments: [
      {
        id: '',
        videoId: '',
        userId: '',
        likes: 0,
        mediaType: '',
        comment: ''
      }
    ],
    selectedComments: [
      {
        id: '',
        videoId: '',
        userId: '',
        likes: 0,
        mediaType: '',
        comment: ''
      }
    ]
  };

  componentDidMount() {
    getVideo()
      .then(res => {
        this.setState({
          videos: [...this.state.videos, ...res.data]
        });

        this.setState({
          selectedVideo: this.state.videos[0]
        });

        getComment('video').then(res => {
          this.setState({
            comments: res.data
          });
          if (this.state.selectedVideo) {
            const selectedVideoComment = this.state.comments.filter(
              (comment: IFeedback) => {
                return this.state.selectedVideo.id == comment.videoId;
              }
            );

            this.setState({
              selectedComments: [...selectedVideoComment]
            });
          }
        });
      })
      .catch(e => {
        console.log('ERROR', e);
      });
  }

  handleVideoSelected = (video: IVideo) => {
    const selectedVideoComment = this.state.comments.filter(
      (comment: IFeedback) => {
        return video.id == comment.videoId;
      }
    );

    console.log('RETURNED VIDEO COMMENT--------->', selectedVideoComment);

    this.setState({
      selectedVideo: video,
      selectedComments: [...selectedVideoComment]
    });
  };

  likedVideo = (videoId: string, videoTitle: string) => {
    likeVideo(videoId, videoTitle)
      .then(res => {
        let updateVideo: IVideo[] = [...this.state.videos];
        if (res.data.title !== '') {
          this.state.videos.find((video: IVideo, i: number) => {
            if (video.id === videoId) {
              updateVideo[i] = res.data;

              this.setState({
                videos: [...updateVideo],
                selectedVideo: res.data
              });
            }
          });
        }
      })
      .catch(e => {
        console.log('ERROR', e);
      });
  };

  deletedVideo = (videoId: string, videoTitle: string) => {
    deleteVideo(videoId, videoTitle)
      .then(res => {
        const updatedVideo = this.state.videos.filter((video: IVideo) => {
          return video.id !== videoId;
        });

        this.setState({
          videos: [...updatedVideo],
          selectedVideo: updatedVideo[0]
        });
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  postComment = (message: string) => {
    const videoId = this.state.selectedVideo.id;

    addComment(message, videoId, 'video')
      .then(res => {
        this.setState({
          comments: [...this.state.comments, res.data]
        });
        const selectedVideoComment = this.state.comments.filter(
          (comment: IFeedback) => {
            return this.state.selectedVideo.id == comment.videoId;
          }
        );

        this.setState({
          selectedComments: [...selectedVideoComment]
        });
      })
      .catch(err => {
        console.log('COMMENT ERROR', err);
      });
  };

  render() {
    return (
      <Fragment>
        <MDBContainer style={{ marginTop: 6 + 'rem' }} fluid>
          <MDBRow>
            <MDBCol sm='7' className='mx-auto mb-5'>
              {this.state.selectedVideo ? (
                <SelectedVideo
                  comments={this.state.selectedComments}
                  handleDelete={this.deletedVideo}
                  handleLike={this.likedVideo}
                  currentVideo={this.state.selectedVideo}
                  addComment={this.postComment}
                />
              ) : (
                <p>Whoops! there is nothing to play</p>
              )}
            </MDBCol>
            <VideoList
              videoList={this.state.videos}
              videoSelected={this.handleVideoSelected}
            />
          </MDBRow>
        </MDBContainer>
      </Fragment>
    );
  }
}

export default Videos;
