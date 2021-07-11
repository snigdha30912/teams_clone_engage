//making imports
import { useEffect } from 'react';
import { useChat } from 'context';
import { getChats, ChatEngine } from 'react-chat-engine';
import { SideNavBar, TeamChatHeader, TeamChatInput, MessageList, SwitchingRail } from 'components';
import AttachFilePage from 'components/AttachFilePage/AttachFilePage';

//functional component for ChatScreen
export const ChatScreen = () => {
  const {
    myChats,
    setMyChats,
    chatConfig,
    selectedChat,
    selectChatClick,
    setSelectedChat,
    myMessages,
    setMyMessages,
    isFileUpload,
    setIsFileUpload,
    isChatScreen,
    setIsChatScreen,
  } = useChat();

  //use effect hook that renders everytime myChats changes
  useEffect(() => {
    console.log('My Chats: ', myChats);
  }, [myChats]);

  //use effect hook that renders everytime selected chat changes
  useEffect(() => {
    console.log('Selected Chat: ', selectedChat);
  }, [selectedChat]);

  return (
    <>
    {/* React chat engine is used for displaying chats */}
      {!!chatConfig && (
        <ChatEngine
          hideUI={true} //hiding UI and overriding features
          userName={chatConfig.userName}
          projectID={chatConfig.projectID}
          userSecret={chatConfig.userSecret}
          onConnect={() => {
            getChats(chatConfig, setMyChats); //gets the list of all teams
          }}
          onNewChat={chat => {
            if (chat.admin.username === chatConfig.userName) { //when a new team is created
              selectChatClick(chat);
            }
            setMyChats([...myChats, chat].sort((a, b) => a.id - b.id));
          }}
          onDeleteChat={chat => {
            if (selectedChat?.id === chat.id) { //deleting a team
              setSelectedChat(null);
            }
            setMyChats(
              myChats.filter(c => c.id !== chat.id).sort((a, b) => a.id - b.id),
            );
          }}

          onDeleteMessage ={(chatId, message) => { //deleting a message from the team
            
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
          
          onNewMessage={(chatId, message) => { //adding a new message to the message list
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

      <div className="chat-container">
        <SwitchingRail/>
        <SideNavBar />
        <div className="current-chat">
          {/* if selected chat is true and fileupload bool is true then show file upload page */}
          {selectedChat ? (
            isFileUpload?(
              <div className="chat">
                <TeamChatHeader/>
                <AttachFilePage/>
                
              </div>
            ):isChatScreen?( //if isChatScreen is true then show the message list
            <div className="chat">
              <TeamChatHeader />
              <MessageList />
              
              <TeamChatInput />
            </div>):( 
              <div className="chat">
                <TeamChatHeader />
              <MessageList />
              
              <TeamChatInput />
                </div>
            )
          ) : (
            //if no chat is selected then it shows a default image
            <div className="no-chat-selected">
              <img
                src="/img/chat3.webp"
                className="point-left"
                alt="point-left"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};