//making imports
import React, { useEffect, useState, useRef } from 'react';
import {fb} from 'service';
import {useChat} from 'context';
import AutoLinkText from 'react-autolink-text2';
import { Icon } from 'semantic-ui-react';
import * as moment from 'moment'


//functional component for attaching and downloading files
const   AttachFilePage=()=> {
  const [fileUrl, setFileUrl] = useState(null);
  const [filename, setFilename] = useState("");
  const { selectedChat, chatConfig } = useChat();
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [date,setDate] = useState(null);
  
  
  // the function takes in the file and stores in firebase storage and gets the download url of the file.
  const onFileChange = async (e) => {
   
    setIsLoading(await true);
    console.log("fileeeeeeeeeeeeeeeeeeeeeeeeee  " + e.target.files[0].name);
    const file = e.target.files[0];
    console.log("whattttttttttttt  " + file.name);

    const storageRef = fb.storage.ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file)
       setFileUrl(await fileRef.getDownloadURL()) 
            //console.log("urlllllllllllllllll " + url);
            
             setFilename(await file.name);
            console.log("fileeeeeeeeeeeeeeeeee"+filename);
            console.log("fileurlllllllllllllll"+fileUrl);
            setIsLoading(false);
   
            fileRef.getMetadata()
  .then((metadata) => {
    // Metadata now contains the metadata for 'images/forest.jpg'
    setDate(metadata.timeCreated);

  })
  .catch((error) => {
  console.log( "Uh-oh, an error occurred!");
  });
    
   
   
  };
  console.log("selectedChat id "+selectedChat.id);

  //on clicking on the submit button the file download url gets saved in firebase firestore.
  const onSubmit = async (e) => {
    e.preventDefault();


    if (!fileUrl) {
        console.log("returned");
      return;
    }
    console.log(filename + " filename");
    console.log(fileUrl + " fileUrl");
    console.log("LOADINGGGG1 " + isLoading);
    
    if(filename!="")
    {
      fb.firestore.collection("chatRooms").doc(selectedChat.id.toString()).collection("files").doc(filename).set({
        fileUrl : fileUrl,
        filename : filename,
        date: date
        
      });
      setIsSubmit(!isSubmit);
    }
    
    
        
  }
  //the use effect hook fetches all the files from the firebase firestore that are to be displayed on the page
  useEffect(() => {
    
    const fetchFiles = async () => {
      const fileCollection = await fb.firestore.collection("chatRooms").doc(selectedChat.id.toString()).collection("files").get();
      setFiles(
        fileCollection.docs.map((doc) => {
          return doc.data();
        })
      );
    };
    fetchFiles();
  }, [isSubmit]);

  return (
    <>
        <div
          onClick={() => {
            const input = inputRef.current;
            if (input) {
              input.value = '';
              input.click();
            }
          }}
          className="file-attachment-icon"
        >
        <Icon name="attach" color="black" />
        <p className="file-attachment-text"><b> ATTACH A FILE TO UPLOAD</b></p>
        <input type="file" ref={inputRef} className="file-input" placeholder = "No file chosen" onChange={onFileChange} />
        </div>
       <div>
        {
    isLoading  ? (
      <div className="loading-text">Loading...</div>
     ):( <button className="file-upload-button" onClick={onSubmit}>Submit</button>)
  }
  </div>
      <div className="file-list">
        {files.map((file) => {
          return (
            <div key={file.fileUrl} className="file-item">
              <a href={file.fileUrl}>{file.filename}</a>
              <p className ="file-date">{file.date ?file.date.substr(0,10):file.date}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}


export default AttachFilePage;
