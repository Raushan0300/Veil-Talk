import { useEffect, useState } from "react";
import "./HomePage.css";
import boyIcon from "./Images/boy.png";
import girlIcon from "./Images/sister.png";
import sendIcon from "./Images/send.png";
import { getData, postData } from "../../Config/Config";

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

  useEffect(() => {
    const fetchConversations = async () => {
      const response = await getData(`conversation/${userDetail.id}`);
      if (response) {
        setConversations(response);
      }
    };
    fetchConversations();
  }, []);

  useEffect(()=>{
    const fetchAllUsers=async()=>{
      const response=await getData("users");
      if(response){
        setAllUsers(response);
      }
    };
    fetchAllUsers();
  },[])

  const handlePlusClick=()=>{
    setIsPlusClicked(!isPlusClicked);
  }

  const fetchMessages = async (conversationsId: any, user:any) => {
    setConversationSelected(true);
    const response = await getData(`message/${conversationsId}`);
    if (response) {
      setSelectedUser(user);
      setConversationId(conversationsId);
      setMessages(response);
    }
  };

  const handleSendMessage=async()=>{
    const response=await postData("message", {conversationId:conversationId, senderId:userDetail.id, message:messageText});
    if(response){
      setMessageText("");
    }
  };

  const handleNewConversation=async(userId:any)=>{
    if(conversations.some((conversation:any)=>conversation.user.id===userId)){
      console.log("Conversation already exists");
    } else{
      console.log("New Conversation");
    }
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
                  {user.gender === "Male" ? (
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
                  <div className="homeNameText">{user.name}</div>
                  <div className="homeDetailText">
                    {user.age} | {user.gender}
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
        <div className="homeNewChat" onClick={()=>{handlePlusClick()}}>{isPlusClicked?"-":"+"}</div>
      </div>
      {conversationSelected ? (
        <div className="homeChatConatainer">
          <div className="homeChatUser">
            <img
              src={boyIcon}
              alt="userIcon"
              width="75px"
            />
            <div>
              <div className="homeChatNameText">{selectedUser.name}</div>
              <div className="homeDetailText">{selectedUser.age} | {selectedUser.gender}</div>
            </div>
          </div>
          <div className="homeChatMessages">
            {messages?.map(({ message, user: { id } }: any) => {
              return (
                <div
                  className={id===userDetail.id ? "homeChatMessageRight" : "homeChatMessageLeft"}
                  key={message.messageId}
                >
                  {message.message}
                </div>
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
        <div className="conversationSelected">Select a Conversation</div>
      )}
    </div>
  );
};

export default HomePage;
