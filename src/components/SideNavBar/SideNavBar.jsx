import { useChat } from 'context';
import { useResolved } from 'hooks';
import { TeamList } from 'components';
import { ProfilePage } from 'components';
import { Loader } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';

export const SideNavBar = () => {
  const { myChats, createChatClick } = useChat();
  const chatsResolved = useResolved(myChats);

  return (
    <div className="left-rail">
      <ProfilePage />
      {chatsResolved ? (
        <>
          {!!myChats.length ? (
            <div className="chat-list-container">
              <TeamList />
            </div>
          ) : (
            <div className="chat-list-container no-chats-yet">
              <h3>Form A Team</h3>
            </div>
          )}
          <button className="create-chat-button" onClick={createChatClick}>
          <Icon
            color="black"
            name="plus"
            size = "big"
          />
          </button>
        </>
      ) : (
        <div className="chats-loading">
          <Loader active size="huge" />
        </div>
      )}
    </div>
  );
};