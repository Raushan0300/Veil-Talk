import { useEffect, useRef, useState } from "react";
import "./HomePage.css";
import boyIcon from "./Images/boy.png";
import girlIcon from "./Images/sister.png";
import sendIcon from "./Images/send.png";
import { getData, postData } from "../../Config/Config";
import { io } from "socket.io-client";
import { Dialog } from "@mui/material";
import IsLoading from "../IsLoading/IsLoading";
import backIcon from "./Images/arrow.png";

const HomePage = () => {
  const userDetail = JSON.parse(localStorage.getItem("user") || "{}");
  const [conversations, setConversations] = useState<any>([]);
  const [messages, setMessages] = useState<any>([]);
  const [allUsers, setAllUsers] = useState<any>([]);

  const [conversationSelected, setConversationSelected] =useState<boolean>(false);

  const [messageText, setMessageText] = useState<string>("");

  const [selectedUser, setSelectedUser] = useState<any>({});

  const [conversationId, setConversationId] = useState<any>("");

  const [isPlusClicked, setIsPlusClicked] = useState<boolean>(false);

  const [socket, setSocket] = useState<any>(null);

  const [openDialog, setOpenDialog] = useState(false);

  const [compval, setCompval] = useState<boolean>(false);

  const messageRef=useRef<any>(null);

  useEffect(()=>{
    if (window.innerWidth > 486) {
      setCompval(true);
    }

  })

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // console.log("messages=>",messages);

  useEffect(()=>{
    setSocket(io("https://veiltalk-api.up.railway.app/"));
  },[]);

  //http://localhost:8080;
  //https://veiltalk-api.vercel.app
  // https://veil-talk-backend.onrender.com/

  useEffect(()=>{
    socket?.emit("addUser", userDetail?.id);
    socket?.on("getUsers", (users: any[]) => {
      console.log("active users=>",users);
    })
    socket?.on("getMessage", (data: any) => {
      console.log("data=>",data);
      setMessages((prevMessages: any[]) => [...prevMessages, { user: data.user, message: {message:data.message} }]);
    })
  }, [socket])

  useEffect(() => {
    const fetchConversations = async () => {
      setOpenDialog(true);
      const response = await getData(`conversation/${userDetail.id}`);
      if (response) {
        setConversations(response);
      }
      setOpenDialog(false);
    };
    fetchConversations();
  }, []);

  useEffect(()=>{
    const fetchAllUsers=async()=>{
      setOpenDialog(true);
      const response=await getData("users");
      if(response){
        setAllUsers(response);
      }
      setOpenDialog(false);
    };
    fetchAllUsers();
  },[])

  const handlePlusClick=()=>{
    setIsPlusClicked(!isPlusClicked);
  }

  const fetchMessages = async (conversationsId: any, user:any) => {
    setOpenDialog(true);
    setConversationSelected(true);
    const response = await getData(`message/${conversationsId}`);
    if (response) {
      setSelectedUser(user);
      setConversationId(conversationsId);
      setMessages(response);
    }
    setOpenDialog(false);
  };

  const handleSendMessage=async()=>{
    socket.emit("sendMessage", {senderId:userDetail.id, receiverId:selectedUser.id, message:messageText, conversationId:conversationId})
    const response=await postData("message", {conversationId:conversationId, senderId:userDetail.id, message:messageText});
    if(response){
      setMessageText("");
    }
  };

  const handleNewConversation = async (userId: any) => {
    setOpenDialog(true);
    if (conversations.some((conversation: any) => conversation.user.id === userId)) {
      const conversation = conversations.find((conversation: any) => conversation.user.id === userId);
      console.log(conversation);
      await fetchMessages(conversation?.conversationId, conversation?.user);
      setIsPlusClicked(false);
    } else {
      const response = await postData("conversation", { senderId: userDetail.id, receiverId: userId });
      if (response) {
        const updatedConversations = [...conversations, response];
        setConversations(updatedConversations);
        // console.log("updated conversation=>",updatedConversations);
        // console.log("conversation=>",conversations);
        const newConversation = updatedConversations.find((conversation: any) => conversation.user.id === userId);
        // console.log(newConversation);
        await fetchMessages(newConversation?.conversationId, newConversation?.user);
        setIsPlusClicked(false);
      }
    }
    setOpenDialog(false);
  }

  return (
    <div className="homePageContainer">
      <div className="homePageCoversationDiv">
        <div className="homePageNameDiv">
          {userDetail.gender === "Male" ? (
            <img
              src={boyIcon}
              alt="userIcon"
              width="75px"
              className="imageHome"
            />
          ) : (
            <img
              src={girlIcon}
              alt="userIcon"
              width="75px"
              className="imageHome"
            />
          )}
          <div>
            <div className="homeNameText">{userDetail.name}</div>
            <div className="homeDetailText">
              {userDetail.age} | {userDetail.gender}
            </div>
          </div>
        </div>
        <div className="border"></div>
        <div className="homeConversationDiv">
          <div className="homeConversationMsgText">{isPlusClicked?"All Users":"Messages"}</div>
          <div className="homeConversationList">
            {!isPlusClicked ? (
              conversations?.map(({ conversationId, user }: any) => {
              return (
                <>
                <div
                  className="homeConversationItem"
                  key={conversationId}
                  onClick={() => {
                  fetchMessages(conversationId, user);
                  }}
                >
                  {user?.gender === "Male" ? (
                  <img
                    src={boyIcon}
                    alt="userIcon"
                    width="50px"
                    className="imageHome"
                  />
                  ) : (
                  <img
                    src={girlIcon}
                    alt="userIcon"
                    width="50px"
                    className="imageHome"
                  />
                  )}
                  <div>
                  <div className="homeNameText">{user?.name}</div>
                  <div className="homeDetailText">
                    {user?.age} | {user?.gender}
                  </div>
                  </div>
                </div>
                <div className="border"></div>
                </>
              );
              })
            ) : (
              allUsers?.map((user: any) => {
              return (
                <>
                <div
                  className="homeConversationItem"
                  key={user.userId}
                  onClick={() => {
                  handleNewConversation(user.userId);
                  }}
                >
                  {user.users.gender === "Male" ? (
                  <img
                    src={boyIcon}
                    alt="userIcon"
                    width="50px"
                    className="imageHome"
                  />
                  ) : (
                  <img
                    src={girlIcon}
                    alt="userIcon"
                    width="50px"
                    className="imageHome"
                  />
                  )}
                  <div>
                  <div className="homeNameText">{user.users.name}</div>
                  <div className="homeDetailText">
                    {user.users.age} | {user.users.gender}
                  </div>
                  </div>
                </div>
                <div className="border"></div>
                </>
              );
              })
            )}
          </div>
        </div>
        {!conversationSelected&&!compval?<div className="homeNewChat" onClick={()=>{handlePlusClick()}}>{isPlusClicked?"-":"+"}</div>:compval&&<div className="homeNewChat" onClick={()=>{handlePlusClick()}}>{isPlusClicked?"-":"+"}</div>}
      </div>
      {conversationSelected ? (
        <div className="homeChatConatainer">
          <div className="homeChatUser">
            {!compval&&<img src={backIcon} alt="back" width="32px" style={{marginLeft:"10px"}} onClick={()=>{setConversationSelected(false)}} />}
            <img
              src={boyIcon}
              alt="userIcon"
              width="75px"
            />
            <div>
              <div className="homeChatNameText">{selectedUser?.name}</div>
              <div className="homeDetailText">{selectedUser?.age} | {selectedUser?.gender}</div>
            </div>
          </div>
          <div className="homeChatMessages">
            {messages?.map(({ message, user: { id } }: any) => {
              return (
                <>
                <div
                  className={id===userDetail.id ? "homeChatMessageRight" : "homeChatMessageLeft"}
                  key={message.messageId}
                >
                  {message.message}
                </div>
                <div ref={messageRef}></div>
                </>
              );
            })}
          </div>
          <div className="homeChatInput">
            <input
              type="text"
              className="homeChatInputText"
              placeholder="Type a message"
              value={messageText}
              onChange={(e)=>{setMessageText(e.target.value)}}
            />
            <button className="homeChatSendBtn" onClick={()=>{handleSendMessage()}}><img src={sendIcon} alt="send" width="30px" /></button>
            </div>
        </div>
      ) : (
        <>
        {compval&&<div className="conversationSelected">Select a Conversation</div>}
        </>
      )}

<Dialog
          sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                padding: "16px",
                width: "10%",
                maxWidth: window.innerWidth / 2,
              },
            },
          }}
          open={openDialog}>
          <IsLoading />
        </Dialog>
    </div>
  );
};

export default HomePage;
