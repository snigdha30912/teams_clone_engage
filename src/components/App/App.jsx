//making imports
import { useEffect,useState } from 'react';
import { ChatProvider } from 'context';
import 'semantic-ui-css/semantic.min.css';
import { useAuth, useResolved } from 'hooks';
import { Login, Signup, ChatScreen, VideoChat} from 'components';
import { Switch, Route, useHistory } from 'react-router-dom';
import AttachFilePage from 'components/AttachFilePage/AttachFilePage';

//App component this is the root component.
export const App = () => {
  const history = useHistory();
  const { authUser } = useAuth();
  const authResolved = useResolved(authUser);

//if the user is signed in it will redirect the user to the chat page and wont show the login and sign up pages.

 
  const unique_id = window.location.pathname;
  console.log(window.location.pathname)
  //use effect component will render every time authResolved, authUser and history changes.
  useEffect(() => {
    if (authResolved) {
      if(authUser){
        if(unique_id=="/login") //if user is authenticated and pathname is login then redirect user to the chat page.
        {
          history.push(`/`);
        }
        else{
          history.push(`${unique_id}`); //else append the unique id.
        }
        
      }else{
        history.push('/login'); //if user is not authenticated redired him to the login page.
      }
    }
  }, [authResolved, authUser, history]);

  return authResolved ? (
    <ChatProvider authUser={authUser}>
      {/* Routing is done to switch between the pages. Whenever the pathname matches it directs to the specific component. */}
      <div className="app">
        <Switch>
          <Route path="/" exact component={ChatScreen} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/fileupload" component={AttachFilePage} />
          <Route path="/:id" component={VideoChat} />
        </Switch>
      </div>
    </ChatProvider>
  ) : (
    <>Loading...</>
  );
};