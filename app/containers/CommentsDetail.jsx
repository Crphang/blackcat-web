import React from 'react';

import CommentsTab from '../components/CommentsTab';
import Constants from '../Constants';

import { commentEvent } from '../api/EventApi';

class CommentsDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      replyTo: '',
      comment: '',
    };

    this.handleReplyTo = this.handleReplyTo.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleComment = this.handleComment.bind(this);
  }

  handleReplyTo(replyTo) {
    let oldComment = this.state.comment;
    if (oldComment === undefined) {
      oldComment = '';
    }
    if (oldComment.charAt(0) === '@') {
      oldComment = oldComment.split(' ').pop();
    }
    const newComment = '@'.concat(replyTo.name, ' ', oldComment);
    this.setState({
      replyTo: replyTo.name,
      comment: newComment,
    });
  }

  handleCommentChange(event) {
    event.preventDefault();
    let val = event.target.value;

    if (val === undefined) {
      val = '';
    }
    this.setState({
      comment: val,
    });
  }

  handleComment() {
    this.props.dispatch(commentEvent(this.props.event.id, this.state.comment));
  }

  render() {
    return (
      <div>
        <CommentsTab comments={this.props.event.comments} type="Action" action={(replyTo) => this.handleReplyTo(replyTo)} />
        <div className="actionbar">
          <div className="left">
            <input value={this.state.comment} placeholder="Leave your comment here" onChange={this.handleCommentChange} className="commentInput" />
          </div>
          <div className="right">
            <img onClick={() => this.handleComment()} className="send" src={Constants.STATIC + '/assets/send.svg'} />
          </div>
        </div>
      </div>
    );
  }
}


export default CommentsDetail;
