import { useChat } from 'context';
import { useResolved } from 'hooks';
import { ChatList } from 'components';
import { RailHeader } from 'components';
import { Loader } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';
import shortid from 'shortid';

export const SwitchingRail = () => {
  const { myChats, createChatClick, isFileUpload,setIsFileUpload,setIsChatScreen, } = useChat();
  const chatsResolved = useResolved(myChats);

  const startCall = () => {
    // generate unique i
    const uid = shortid.generate();
    // redirect to the call page.
    // history.push(`/${uid}`);
    const win = window.open(`/${uid}`, "_blank");
    win.focus();
  }

  return (
    <div className="switch-rail">
            <div onClick={() => {
            setIsChatScreen(true);
            setIsFileUpload(false);
          
            }} className="chat-screen-show">
            <Icon name="chat" color="black" size="big"/>
          </div>

          <div onClick={() => {
            setIsFileUpload(true);
            setIsChatScreen(false);

          }} className="chat-screen-show">
            <Icon name="folder open" color="black" size="big"/>
          </div>
          <div onClick={startCall} className="chat-screen-show">
          <Icon name="video" color="black" size="big"/>
        </div>
    </div>
  );
};