
AIM - The aim is to create a Microsoft teams clone. The mandatory functionality to be established is 1:1 video conversation between to different people.  After including the mandatory functionality other functionalities can be implemented.

APPROACH – 
-->The first task was to build the mandatory functionality i.e., 1:1 video interaction between two different people. Therefore, to build it I used JITSI sdk which is an open source sdk and tried to integrate it with React JS.

-->JITSI provides functionalities like group video chat between multiple users, screen sharing, muting, video recording, in meet messages etc. 

 ![image](https://user-images.githubusercontent.com/58564764/125339411-e4d4ef80-e36e-11eb-804b-e79113c19439.png)





-->The next task was to build a chat system like teams where users can join teams. This was done by using react-chat-engine a package in react for group chatting. By this method, users can form teams, and chat with one another, they can share images, send messages, delete messages, join teams, leave teams, set up their own avatars. The video call feature was integrated with the chat system.
 
![image](https://user-images.githubusercontent.com/58564764/125339635-1d74c900-e36f-11eb-8fbb-97dff97c04d3.png)

![image](https://user-images.githubusercontent.com/58564764/125339659-26659a80-e36f-11eb-8ad9-2d6c46912504.png)




--> The task was to set up authentication so that new users can sign up and existing users can log in to the website. This was also done in react using hooks and context api.

 ![image](https://user-images.githubusercontent.com/58564764/125339728-39786a80-e36f-11eb-812d-c5bf5c463404.png)

![image](https://user-images.githubusercontent.com/58564764/125339749-3e3d1e80-e36f-11eb-89d6-ac35d1e7a1e2.png)



 



--> After the authentication was done, it was necessary to integrate everything with the back end. I used firebase as my backend framework for saving the user information. I also saved the information of chatrooms created by creating the collection chatrooms and saving the members and other information in firebase firestore. The information of the chat messages was stored in chatengine.io.

--> I implemented the agile feature which was to build a chatting system so that users can interact before, during and after the videocall.

![image](https://user-images.githubusercontent.com/58564764/125339786-49904a00-e36f-11eb-8a67-b92fbd2e109b.png)





 

I made custom buttons to override the jitsi sdk functionalities in iframe by making the api calls.

--> Lastly, I also built the file upload system where users of a particular group can upload and download files and share among other users of the group. The data of all these files was stored in firebase storage. 

 ![image](https://user-images.githubusercontent.com/58564764/125339811-52811b80-e36f-11eb-98a2-f7265a3ba041.png)



--> All the frontend work was done simultaneously so that every feature got completed at both the front end and the backend level before moving on to the new feature.

CHALLENGES THAT I FACED – 
-->Implementing the video calling feature was the toughest task. I started by implementing from scratch, then came across multiple APIs and SDKs. I tried building it using WebRTC but the performance wasn’t good and the socket connection wasn’t stable. I implemented it finally using JITSI but overriding its features was a difficult task as well.

-->Implementing the chat system and integrating it with the backend was a tough task as well. There were numerous bugs that needed to be looked upon. Also, I used react-chat-engine’s API and overriding the features of the API was a challenge.

-->Implementing the file upload system was a challenge since integrating is firebase storage was a difficult task such that the uploaded files remain intact and saved and do not disappear when the page is reloaded.

-->Making the UI was a difficult task as the entire code should be fully integrated and functional and at the same time presentable.

-->Lastly, implementing the agile feature was a difficult task and quite challenging as the chats during the meet are not saved. So, saving the chats and displaying them after the meeting gets over was a tough task.

LEARNING – 
I learnt a lot from this project. I learnt about Agile and how to implement it. I learnt about how to plan everything and break it down in small sprints and work accordingly managing time. I learnt about how to divide work and give importance to both UI and backend. I learnt a lot about web-development. Starting from react, I came across multiple packages and libraries. I learnt about WebRTC and SDKs like JITSI meet. I integrated multiple APIs in my project and worked with overriding features and implementing functionalities. I learnt a lot about how react and firebase work together and how you can store large amount of data. I also learnt about CI-CD pipeline and how to continuously integrate your application and then deploy it. I also gained knowledge of how to integrate UI. Lastly, I explored a lot about MS teams and the wide variety of functionalities that it offers and the small minute details which previously I overlooked. I also learnt about how you cannot do anything alone and how you constantly need guidance from your friends and mentors and how even if it’s an individual project, still it requires the support and mentorship of an entire team which is the essence of Agile.

IMPLEMENTING AGILE – 
Agile software development refers to software development methodologies centered round the idea of iterative development, where requirements and solutions evolve through collaboration between self-organizing cross-functional teams.
I implemented Agile by following the steps in Agile methodology.

-->The first step is planning. I planned what do I have to make and how to start by building one feature and then adding more features to it. 

-->Every task that I planned was divided into small sprints of 1 week each. Instead of working on the whole implementation I divided the entire project into subtasks. The goal was to complete the entire backend and frontend implementation of the task within that sprint. 

-->After completion of every subtask, I used to deploy it and test it and tried to correct any bugs that came.

-->This iterative integration and construction approach was timely divided keeping in mind of the agile feature which would be the last sprint for the entire project. In this way I had sufficient time during the last week to work on the extra feature and also improving the performance of my code.





