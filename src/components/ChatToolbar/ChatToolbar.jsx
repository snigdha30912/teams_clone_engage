import { useState } from 'react';
import { useChat } from 'context';
import { joinUsernames } from 'helpers';
import { Icon } from 'semantic-ui-react';
import { SearchUsers } from 'components';
import {useHistory} from 'react-router-dom';
import shortid from 'shortid';
import {fb} from 'service';


export const ChatToolbar = () => {
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

  const startCall = () => {
    // generate unique id
    const uid = shortid.generate();
    // redirect to the call page.
    // history.push(`/${uid}`);
    history.push(`/${uid}`);
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
          {joinUsernames(selectedChat.people, chatConfig.userName).slice(
            0,
            100,
          )}
        </div>

        <div className="add-user-icon">
          <Icon
            color="white"
            name="user plus"
            onClick={() => setSearching(true)}
          />
          <span>&nbsp;&nbsp;</span>
          <Icon name="video" color="black" onClick={startCall}/>
        </div>
      </div>

      <SearchUsers closeFn={() => setSearching(false)} visible={searching} />
    </>
  );
};