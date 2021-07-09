import { useState } from 'react';
import { useChat } from 'context';
import { joinUsernames } from 'helpers';
import { Icon } from 'semantic-ui-react';
import { SearchUsers } from 'components';
import {useHistory} from 'react-router-dom';

export const ChatToolbar = () => {
  const { selectedChat, chatConfig } = useChat();
  const [searching, setSearching] = useState(false);
  const history = useHistory();

 

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
        </div>
       
      </div>

      <SearchUsers closeFn={() => setSearching(false)} visible={searching} />
    </>
  );
};