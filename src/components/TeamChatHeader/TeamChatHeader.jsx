//making imports
import { useState } from 'react';
import { useChat } from 'context';
import { joinUsernames } from 'helpers';
import { Icon } from 'semantic-ui-react';
import { SearchUsers } from 'components';
import {useHistory} from 'react-router-dom';
import shortid from 'shortid';
import {fb} from 'service';

//functional component for The header which appears on top of every chat.
export const TeamChatHeader = () => {
  const { chatConfig, 
    selectedChat,
    myChats,
    setMyChats,
    selectChatClick,
    setSelectedChat,
    myMessages,
    setMyMessages } = useChat();
  const [searching, setSearching] = useState(false);
  const history = useHistory();
  
  //on clicking on the video call button beginCall function is called
  const beginCall = () => {
    // generate unique id
    const uid = shortid.generate();
    
    history.push(`/${uid}`);
    //saves the selected chat object, chatConfig and myChats in firebase collection "videoRooms"
    fb.firestore.collection("videoRooms").doc(uid).collection("selectedChat").doc("1").set(selectedChat);
    fb.firestore.collection("videoRooms").doc(uid).collection("chatConfig").doc("1").set(chatConfig);
    fb.firestore.collection("videoRooms").doc(uid).collection("myChats").doc("1").set({
      myChats : myChats
    })
  }

 

  return (
    <>
      <div className="chat-toolbar">
        <div className="chat-header-text">
          {/* shows the names of the users in the team */}
          {joinUsernames(selectedChat.people, chatConfig.userName).slice(
            0,
            100,
          )}
        </div>
        {/* add user icon for adding more users */}
        <div className="add-user-icon">
          <Icon
            color="white"
            name="user plus"
            onClick={() => setSearching(true)}
          />
          <span>&nbsp;&nbsp;</span>
          {/* video call icon to start a video call in the team */}
          <Icon name="video" color="black" onClick={beginCall}/>
        </div>
      </div>

      <SearchUsers closeFn={() => setSearching(false)} visible={searching} />
    </>
  );
};