//making imports
import { fb } from 'service';
import { useChat } from 'context';
import { Image } from 'semantic-ui-react';
import { useEffect, useState } from 'react';

//functional component for setting up the team avatar

export const TeamAvatar = ({ chat, username, className }) => {
  const { chatConfig } = useChat();
  const [avatar, setAvatar] = useState('');

  //the use effect hook renders every time chat chatconfig and username changes and then sets the avatar to the required value
  useEffect(() => {
    fb.firestore 
      .collection('chatUsers')
      .where('userName', '==', username)
      .get()
      .then(snap => {
        const data = snap.docs[0]?.data();
        if (data?.avatar) {
          setAvatar(data.avatar);
        }
      });
  }, [chat, chatConfig, username]);

  // if avatar exists then set the avatar otherwise set the avatar as the first letter of the username.
  return avatar ? (
    <Image className={className || 'chat-list-avatar'} src={avatar} />
  ) : (
    <div className={className || 'empty-avatar'}>
      {chat.people
        .find(p => p.person.username !== chatConfig.userName)
        .person.username[0].toUpperCase()}
    </div>
  );
};