//making imports
import { useChat } from 'context';
import { Icon } from 'semantic-ui-react';


//functional component SideBar
export const SwitchingRail = () => {
  const {setIsFileUpload,setIsChatScreen} = useChat();

  return (
    <div className="switch-rail">
            {/* on clicking on the chat icon  chat window opens */}
            <div onClick={() => {
            setIsChatScreen(true);
            setIsFileUpload(false);
          
            }} className="chat-screen-show">
            <Icon name="chat" color="black" size="big"/>
          </div>
        {/* on clicking on the folder icon the upload folder window opens. */}
          <div onClick={() => {
            setIsFileUpload(true);
            setIsChatScreen(false);

          }} className="chat-screen-show">
            <Icon name="folder open" color="black" size="big"/>
          </div>
    </div>
  );
};