//making imports
import React, { Component,useEffect } from 'react'
import {withRouter} from 'react-router-dom';
import { getChats, ChatEngine } from 'react-chat-engine';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faVideo,faMicrophone,faPhone,faDesktop,faMicrophoneSlash, faVideoSlash,faCommentAlt,faThList,faCamera,faStopCircle} from '@fortawesome/free-solid-svg-icons';
import {MessageList,ChatInput} from 'components'

//Class Component for Video Conferencing feature implemented using Jitsi sdk
class JitsiComponent extends Component {
    domain = 'meet.jit.si';
    api = {};

    constructor(props) {
        super(props);
        this.state = {
            room: window.location.pathname,
            user: {
                name: 'Team Member'
            },
            isAudioMuted: false,
            isVideoMuted: false,
            
        }
    }
    
    startMeet = () => {
    
        const options = {
            roomName: this.state.room,
            width: '100%',
            height: 600,
            configOverwrite: { prejoinPageEnabled: false},
            interfaceConfigOverwrite: {
                // overwrite interface properties
            },
            parentNode: document.querySelector('#jitsi-iframe'),
            userInfo: {
                displayName: "Me"
            }
        }
        this.api = new window.JitsiMeetExternalAPI(this.domain, options);

        this.api.addEventListeners({
            readyToClose: this.handleClose,
            participantLeft: this.handleParticipantLeft,
            participantJoined: this.handleParticipantJoined,
            videoConferenceJoined: this.handleVideoConferenceJoined,
            videoConferenceLeft: this.handleVideoConferenceLeft,
            audioMuteStatusChanged: this.handleMuteStatus,
            videoMuteStatusChanged: this.handleVideoStatus
        });
    }

    handleClose = () => {
        console.log("handleClose");
        this.executeCommand('hangup');
    }

    handleParticipantLeft = async (participant) => {
        console.log("handleParticipantLeft", participant); // handle participants leaving
        const data = await this.getParticipants();
    }

    handleParticipantJoined = async (participant) => {
        console.log("handleParticipantJoined", participant); // handles the participants who joined the meet
        const data = await this.getParticipants();
    }

    handleVideoConferenceJoined = async (participant) => {
        console.log("handleVideoConferenceJoined", participant); // displays the room name and the participants joined
        const data = await this.getParticipants();
    }

    handleVideoConferenceLeft = () => { //function to handle call hangup
        console.log("handleVideoConferenceLeft");
        console.log(this.props);
        return this.props.history.push('/');
    }

    handleMuteStatus = (audio) => {
        console.log("handleMuteStatus", audio); // shows the mute status
    }

    handleVideoStatus = (video) => {
        console.log("handleVideoStatus", video); // shows the video status
    }

    getParticipants() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.api.getParticipantsInfo()); // get all participants
            }, 500)
        });
    }

    // function override
    executeCommand(command) {
        this.api.executeCommand(command);;
        if(command == 'hangup') { //on hanging up redirects to the chat screen
            return this.props.history.push('/');
        }
        

        if(command == 'toggleAudio') { // toggles the audio status mute!=mute
            this.setState({ isAudioMuted: !this.state.isAudioMuted });
        }

        if(command == 'toggleVideo') { //toggles the video status video!=video
            this.setState({ isVideoMuted: !this.state.isVideoMuted });
        }
    }
  
   

    componentDidMount() { //component mounting on initial render
        if (window.JitsiMeetExternalAPI) {
            this.startMeet();
        } else {
            alert('JitsiMeetExternalAPI not loaded');
        }
    }

    render() {
        const { isAudioMuted, isVideoMuted } = this.state;
        
        return (
            <>
            {/* Jitsi's I-Frame Window */}
            <div className="jitsi-components">
            <div id="jitsi-iframe" className="jitsi-frame"></div>
            <br />
            <br />

            {/* custom icons made to make api calls and override functionalities */}
            <div style={{"position":"relative"}}>
                <span className="jitsi-custom">&nbsp;&nbsp;</span>
                {/* Mute/Unmute icon */}
                <i className="custom-meet-icon"onClick={ () => this.executeCommand('toggleAudio') }   title="Mute / Unmute"> 
                    <FontAwesomeIcon className="icon" icon={isAudioMuted ?faMicrophoneSlash : faMicrophone}/>
                </i>
                {/* hangup icon */}
                <i className="custom-meet-icon" onClick={ () => this.executeCommand('hangup') }  title="Leave">
                    <FontAwesomeIcon className="icon red" icon={faPhone}/>
                </i>
                {/* toggle video icon */}
                <i className="custom-meet-icon" onClick={ () => this.executeCommand('toggleVideo') } title="Start / Stop camera">
                    <FontAwesomeIcon className="icon" icon={isVideoMuted ? faVideoSlash : faVideo}/>
                </i>
                {/* Share Screen Icon */}
                <i className="custom-meet-icon" onClick={ () => this.executeCommand('toggleShareScreen') }  title="Share your screen">
                    <FontAwesomeIcon className="icon red" icon={faDesktop}/>
                </i>
                {/* chat screen display icon */}
                <i className="custom-meet-icon" onClick={ () => this.executeCommand('toggleChat') }  title="Chat/Message">
                    <FontAwesomeIcon className="icon red" icon={faCommentAlt}/>
                </i>
                {/* toggle tile view icon */}
                 <i className="custom-meet-icon" onClick={ () => this.executeCommand('toggleTileView') }  title="Tile View">
                    <FontAwesomeIcon className="icon red" icon={faThList}/>
                </i> 
            </div>
            </div>

            </>
        );
    }
}

export default withRouter(JitsiComponent);