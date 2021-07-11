import firebase from 'firebase/app';
import { fb } from 'service';
import { createContext, useContext, useEffect, useState } from 'react';
import { newChat, leaveChat, deleteChat, getMessages } from 'react-chat-engine';

export const ChatContext = createContext();

export const ChatProvider = ({ children, authUser }) => {
  const [myChats, setMyChats] = useState();
  const [myMessages, setMyMessages] = useState();
  const [chatConfig, setChatConfig] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [isFileUpload, setIsFileUpload] = useState(false);
  const [isChatScreen, setIsChatScreen] = useState(false);

  const createChatClick = chat => {
     
    newChat(chatConfig, { title: '' });
  
    
    
  };
  const deleteChatClick = chat => {
    const isAdmin = chat.admin.username === chatConfig.userName;
    console.log("chat adminnnnnn " + chat.admin.username);
    console.log("chatconfiggg usernameeeeeeeee " + chatConfig.userName);
    if (
      isAdmin &&
      window.confirm('Are you sure you want to delete this chat?')
    ) {
      deleteChat(chatConfig, chat.id);
      fb.firestore.collection("chatRooms").doc(chat.id.toString()).delete();
      console.log("chatroom deleted");
    } else if (window.confirm('Are you sure you want to leave this chat?')) {
      leaveChat(chatConfig, chat.id, chatConfig.userName);
      fb.firestore.collection("chatRooms").doc(chat.id.toString()).update({
        members:firebase.firestore.FieldValue.arrayRemove(chatConfig.userName)
      })
    }
  };
  const selectChatClick = chat => {
    getMessages(chatConfig, chat.id, messages =>{
      setSelectedChat({
        ...chat,
        messages,
      });
      setMyMessages(messages);
      setIsFileUpload(false);
      setIsChatScreen(false);
    });
  };

  // Set the chat config once the
  // authUser has initialized.
  useEffect(() => {
    if (authUser) {
      // fb.firestore
      //   .collection('chatUsers')
      //   .doc(authUser.uid)
      //   .onSnapshot(snap => {
      //     setChatConfig({
      //       userSecret: authUser.uid,
      //       avatar: snap.data().avatar,
      //       userName: snap.data().userName,
      //       projectID: 'fd035b12-b645-437c-afe9-f204d6d8eda0',
      //     });
      //   });
      fb.firestore
        .collection('chatUsers')
        .doc(authUser.uid)
        .get()
        .then((doc)=>{
          if(doc.exists)
          setChatConfig({
            userSecret: authUser.uid,
            avatar: doc.data()["avatar"]!=""?doc.data()["avatar"]:null,
            userName: doc.data()["userName"],
            projectID: 'fd035b12-b645-437c-afe9-f204d6d8eda0',
          });
        })
      
    }
  }, [authUser, setChatConfig]);

  return (
    <ChatContext.Provider
      value={{
        myChats,
        setMyChats,
        myMessages,
        setMyMessages,
        chatConfig,
        selectedChat,
        setChatConfig,
        setSelectedChat,
        selectChatClick,
        deleteChatClick,
        createChatClick,
        isFileUpload,
        setIsFileUpload,
        setIsChatScreen,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const {
    myChats,
    setMyChats,
    myMessages,
    setMyMessages,
    chatConfig,
    selectedChat,
    setChatConfig,
    setSelectedChat,
    selectChatClick,
    deleteChatClick,
    createChatClick,
    isFileUpload,
    setIsFileUpload,
    setIsChatScreen,
  } = useContext(ChatContext);

  return {
    myChats,
    setMyChats,
    myMessages,
    setMyMessages,
    chatConfig,
    selectedChat,
    setChatConfig,
    setSelectedChat,
    selectChatClick,
    deleteChatClick,
    createChatClick,
    isFileUpload, 
    setIsFileUpload,
    setIsChatScreen,
  };
};