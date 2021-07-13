//making imports
import { useEffect, useState } from 'react';
import { useChat } from 'context';
import { ChatEngine } from 'react-chat-engine';
import {TeamChatInput, MessageList } from 'components';
import VideoCallPage from 'components/JitsiComponent/JitsiComponent';
import {fb} from 'service';

// functional component of the video call page
export const VideoChat = () => {
  const meetLink = `${window.location.origin}${window.location.pathname}`;
  const {
   setChatConfig,
    chatConfig,
    myChats,
    setMyChats,
    setSelectedChat,
    setMyMessages,
    selectedChat,
  } = useChat();
  const [linkCopied, setLinkCopied] = useState(false);
  
  //extracting the selected chat, myChats and chatConfig from firebase firestore
  useEffect(() => {
    fb.firestore.collection('videoRooms').doc(window.location.pathname).collection("selectedChat").doc("1").get().then((doc)=>{
setSelectedChat(doc.data());

  })
  fb.firestore.collection('videoRooms').doc(window.location.pathname).collection("myChats").doc("1").get().then((doc)=>{
setMyChats(doc.data()["myChats"]);
  })
  fb.firestore.collection('videoRooms').doc(window.location.pathname).collection("chatConfig").doc("1").get().then((doc)=>{
setChatConfig(doc.data());
  })
    console.log('Selected Chat: ', selectedChat);
  }, []);

  const copylink = () => {
    navigator.clipboard.writeText(meetLink);
    setLinkCopied(true);
  }

  return (
    <>
    
      {!!chatConfig && ( //using react chat engine
        <ChatEngine
          hideUI={true}
          userName={chatConfig.userName}
          projectID={chatConfig.projectID}
          userSecret={chatConfig.userSecret}
          onDeleteMessage ={(chatId, message) => { //deleting a message
            
            const filteredmessages = selectedChat.messages.filter(m=>m.id != message.id);
            // console.log(chatThatMessageBelongsTo,filteredmessages)
            if (selectedChat && chatId === selectedChat.id) {
              setSelectedChat({
                ...selectedChat,
                messages: filteredmessages,
              });
            }
            // const chatThatMessageBelongsTo = myChats.find(c => c.id === chatId);
            setMyMessages(filteredmessages);
            const chatThatMessageBelongsTo = myChats.find(c => c.id === chatId);
            const filteredChats = myChats.filter(c => c.id !== chatId);
            const updatedChat = {
              ...chatThatMessageBelongsTo,
              messages: filteredmessages,
            };
            setMyChats(
              [updatedChat, ...filteredChats].sort((a, b) => a.id - b.id),
            );
            
          }}
          
          onNewMessage={(chatId, message) => { // adding a new message
            if (selectedChat && chatId === selectedChat.id) {
              setSelectedChat({
                ...selectedChat,
                messages: [...selectedChat.messages, message],
              });
            }
            const chatThatMessageBelongsTo = myChats.find(c => c.id === chatId);
            const filteredChats = myChats.filter(c => c.id !== chatId);
            const updatedChat = {
              ...chatThatMessageBelongsTo,
              last_message: message,
            };
            setMyChats(
              [updatedChat, ...filteredChats].sort((a, b) => a.id - b.id),
            );
          }}
        />
      )}
      {/* Displaying the video call page and the chat message window */}
      <div className="video-call-contents">
        <div>
        <VideoCallPage/>
        </div>
        
        <div style={{'color' : 'rgb(204, 29, 67)', 'padding': '10px', 'display': 'inline-block'}}><b>Let others join the Team meeting!</b></div>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <div className="auth-link-container" style={{'display' : 'inline-block', 'color' : '#ffffff', 'backgroundColor' : '#aec6cf'}}>{meetLink}</div>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <button className="copy-url-button" style={{'background-color':'#dea5a4', 'color' : 'rgb(204, 29, 67)', 'padding': '5px', 'display': 'inline-block', 'cursor' : 'pointer', 'border': '1px solid red'}} onClick={copylink}>Copy</button>
        {linkCopied && <div style={{'color' : 'rgb(204, 29, 67)', 'padding': '10px', 'display': 'inline-block'}}><b>Link Copied!</b></div> }
        </div>
      <div className="chat-container">
      
        <div className="current-chat">
        
          {chatConfig && selectedChat ?( 
            <div className="chat">
              <MessageList/>
              <TeamChatInput/>
            </div>
          ):(<></>)}
          
        </div>
      </div>
    </>
  );
};