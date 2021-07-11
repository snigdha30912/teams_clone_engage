//making imports

import { useChat } from 'context';
import { useState, useRef } from 'react';
import { Icon } from 'semantic-ui-react';
import { ImageUpload } from 'components';
import { sendMessage } from 'react-chat-engine';
import { useHistory } from 'react-router-dom';

//functional component for creatinginput box for chatting
export const TeamChatInput = () => {
  const { chatConfig, selectedChat } = useChat();
  const [chatInputText, setChatInputText] = useState('');
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const inputRef = useRef(null);
  const [image, setImage] = useState();

  //funcion which sends the chat message typed in input box when clicked on the button or pressed enter
  const sendChatMessage = () => {
    if (selectedChat && chatInputText) {
      setChatInputText('');
      sendMessage(chatConfig, selectedChat.id, {
        text: chatInputText,
        files: [],
      });
    }
  };
  const sendURL = ()=>{
    if(selectedChat && chatInputText) {
      setChatInputText('');
    }
  };

  

  const handleChange = (e) => {
    setChatInputText(e.target.value);
    // isTyping(chatConfig, selectedChat.id);

  }

  const onFileAttach = file => {
    setImage(file);
    setImageModalOpen(true);
  };

  return (
    <>
      <div className="chat-controls">
        
        <div
          onClick={() => {
            const input = inputRef.current;
            if (input) {
              input.value = '';
              input.click();
            }
          }}
          className="attachment-icon"
        >
          <Icon name="attach" color="black"/>
        </div>
        <input
          value={chatInputText}
          className="chat-input"
          placeholder="Send a message"
          onKeyPress={e => {
            if (e.key === 'Enter') {
              sendChatMessage();
            }
          }}
          onChange={handleChange}
        />
        <div onClick={sendChatMessage} className="send-message-icon">
          <Icon name="send" color="black" />
        </div>
      </div>
        {/* file attach button for attaching images and displaying them in the message list */}
      <input
        type="file"
        ref={inputRef}
        className="file-input"
        accept="image/jpeg,image/png"
        onChange={e => {
          const file = e.target?.files?.[0];
          if (file) {
            onFileAttach(file);
          }
        }}
      />

      {imageModalOpen && !!image && (
        <ImageUpload
          file={image}
          mode="message"
          onSubmit={() => {
            sendMessage(
              chatConfig,
              selectedChat.id,
              {
                text: chatInputText,
                files: [image],
              },
              () => {
                setImage(null);
                setChatInputText('');
              },
            );
          }}
          close={() => setImageModalOpen(false)}
        />
      )}
    </>
  );
};