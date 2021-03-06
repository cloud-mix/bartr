import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const VideoChat = props => {

  return(
    <div className="static-modal">
      <Modal.Dialog className="videoChatModal">
        <Modal.Header>
          <Modal.Title>Video Chat</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <video id="remoteVideo" autoPlay ></video>
          <video id="localVideo" autoPlay muted ></video>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => props.closeVideo()}>Close</Button>
        </Modal.Footer>

      </Modal.Dialog>
    </div>
  );
}

export default VideoChat;