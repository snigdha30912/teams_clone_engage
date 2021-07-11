import React from 'react';
import { useChat } from 'context';
import { TeamAvatar } from 'components';
import { Icon } from 'semantic-ui-react';
import { joinUsernames, notMe } from 'helpers';

export const TeamList = () => {
  const {
    myChats,
    chatConfig,
    selectedChat,
    selectChatClick,
    deleteChatClick,
    isFileUpload,
    setIsFileUpload,
    setIsChatScreen,
  } = useChat();

  return (
    <div className="chat-list">
      {myChats.map((c, index) => (
        <div
          className={`chat-list-item ${
            selectedChat?.id === c.id ? 'selected-chat-item' : ''
          }`}
          key={index}
        >
          <div
            onClick={() => selectChatClick(c)}
            className="chat-list-item-content"
          >
            {c.people.length === 1 ? (
              <>
                <Icon circular inverted color="violet" name="user cancel" />
                <div className="chat-list-preview">
                  <div className="preview-username">No Users Added</div>
                </div>
              </>
            ) : c.people.length === 2 ? (
              <>
                <TeamAvatar username={notMe(chatConfig, c)} chat={c} /> 

                <div className="chat-list-preview">
                  <div className="preview-username">{notMe(chatConfig, c)}</div>
                  <div className="preview-message">
                    {c.last_message.attachments.length
                      ? `${c.last_message.sender.username} sent an attachment`
                      : c.last_message.text.slice(0, 15) + '...'}
                  </div>
                </div>
              </>
            ) : (
              <>
                <Icon circular inverted color="brown" name="users" />
                <div className="chat-list-preview">
                  <div className="preview-username">
                    {joinUsernames(c.people, chatConfig.userName).slice(0, 50)}
                    ...
                  </div>
                  <div className="preview-message">
                    {c.last_message.attachments.length
                      ? `${c.last_message.sender.username} sent an attachment`
                      : c.last_message.text.slice(0, 50) + '...'}
                  </div>
                </div>
              </>
            )}
          </div>
          {/* <div onClick={() => {
            setIsChatScreen(true);
            setIsFileUpload(false);
          
            }} className="chat-item-delete">
            <Icon name="chat" color="black"/>
          </div>

          <div onClick={() => {
            setIsFileUpload(true);
            setIsChatScreen(false);

          }} className="chat-item-delete">
            <Icon name="folder open" color="black"/>
          </div> */}

          <div onClick={() => deleteChatClick(c)} className="chat-item-delete">
            <Icon name="delete" />
          </div>
        </div>
      ))}
    </div>
  );
};