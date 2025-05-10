import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import "./HomePage.css";
import {
  BsEmojiSmile,
  BsFilter,
  BsMicFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { TbCircleDashed } from "react-icons/tb";
import ChatCard from "./ChatCard/ChatCard";
import MessageCard from "./MessageCard/MessageCard";
import { ImAttachment } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile/Profile";
import { Menu, MenuItem } from "@mui/material";
import CreateGroup from "./Group/CreateGroup";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, logoutAction, searchUsers } from "../Redux/Auth/Action";
import { createChat, getUsersChat } from "../Redux/Chat/Action";
import { createMessage, getAllMessage } from "../Redux/Message/Action";

import SockJS from "sockjs-client/dist/sockjs";
import { over } from "stompjs";

const HomePage = () => {
  const [querys, setQuerys] = useState("");
  const [currentChat, setCurrentChat] = useState("");
  const [content, setContent] = useState("");
  const [isProfile, setIsProfile] = useState(false);
  const navigate = useNavigate();
  const [isGroup, setIsGroup] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const chat = useSelector((store) => store.chat);
  const message = useSelector((store) => store.message);
  const token = localStorage.getItem("token");
  const defaultProfilePic =
    "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png";
  const defaultGroupPic =
    "https://cdn.pixabay.com/photo/2016/11/14/17/39/group-1824145_1280.png";
  const [profileName, setProfileName] = useState(auth.reqUser?.fullname);
  const [profilePic, setProfilePic] = useState(auth.reqUser?.profilePicture);

  // websocket start

  const [stompClient, setStompClient] = useState("");
  const [isConnect, setIsConnect] = useState(false);
  const [messages, setMessages] = useState([]);

  const connect = () => {
    const sock = new SockJS("http://localhost:8080/ws", null, {
      withCredentials: true,
    });
    const temp = over(sock);
    setStompClient(temp);

    const headers = {
      Authorization: `Bearer ${token}`,
      "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
    };

    temp.connect(headers, onConnect, onError);
  };

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    console.log("value in getCookie: ", value);
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
  }

  const onError = (error) => {
    console.log("ws error: ", error);
  };

  const onConnect = () => {
    setIsConnect(true);
  };

  useEffect(() => {
    if (message.newMessage && stompClient) {
      setMessages([...messages, message.newMessage]);
      stompClient?.send("/app/message", {}, JSON.stringify(message.newMessage));
    }
  }, [message.newMessage]);

  const onMessageReciever = (payload) => {
    console.log("payload recieved: ", JSON.parse(payload));
    const recievedMessage = JSON.parse(payload);
    setMessages([...messages, recievedMessage]);
  };

  useEffect(() => {
    if (isConnect && stompClient && auth.reqUser && currentChat) {
      const subscription = stompClient.subscribe(
        "/group/" + currentChat.id.toString(),
        onMessageReciever
      );
      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  useEffect(() => {
    setMessages(message.messages);
  }, [message.messages]);

  useEffect(() => {
    connect();
  }, []);

  // websocket end

  const handleSearch = (keyword) => {
    dispatch(searchUsers({ keyword, token }));
  };

  const handleProfile = () => {
    setIsProfile(true);
    handleClose();
  };

  // chat start
  const handleClickOnChatCard = (userId) => {
    // setCurrentChat(true);
    dispatch(createChat({ data: userId, token: token }));
    setQuerys("");
  };

  // message creation
  const handleCreateNewMessage = () => {
    dispatch(
      createMessage({
        token: token,
        data: {
          chatId: currentChat.id,
          content: content,
        },
      })
    );
  };
  // temp

  useEffect(() => {
    if (currentChat?.id) {
      dispatch(getAllMessage({ token: token, chatId: currentChat.id }));
    }
  }, [currentChat, message.newMessage]);

  useEffect(() => {
    dispatch(getUsersChat(token));
  }, [chat.createdChat, chat.createdGroup]);

  const handleCurrentChat = (item) => {
    setCurrentChat(item);
    console.log("handleCurrentChat", item);
  };

  // chat end

  const handleNavigate = () => {
    // navigate("/profile")
    setIsProfile(true);
  };
  const handleCloseOpenProfile = () => {
    setIsProfile(false);
  };

  // menu item start
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // menu item end

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/signup");
  };

  useEffect(() => {
    if (!auth.reqUser) {
      navigate("/signup");
    }
  }, [auth.reqUser]);

  useEffect(() => {
    if (token) {
      dispatch(currentUser(token));
    }
  }, [token]);

  const handleCreateGroup = () => {
    setIsGroup(true);
    handleClose();
  };

  return (
    <div className="relative">
      <div className="py-14 bg-[#00a884] w-full"></div>
      {/* main chat page */}
      <div className="flex left-[2vw] bg-[#f0f2f5] h-[90vh] absolute top-6 w-[96vw]">
        {/* left page for contacts */}
        <div className="left w-[30%] h-full bg-[#e8e9ec]">
          {/* profile and search and fuck  */}
          {isProfile && (
            <div>
              <Profile
                setProfileName={setProfileName}
                handleCloseOpenProfile={handleCloseOpenProfile}
                setProfilePic={setProfilePic}
              />
            </div>
          )}

          {!isProfile && !isGroup && (
            <div className="w-full">
              {/* profile pic and icons */}
              <div className="flex justify-between items-center p-3">
                {/* pic */}
                <div
                  onClick={handleNavigate}
                  className="flex items-center space-x-3"
                >
                  <img
                    className="rounded-full w-10 h-10 cursor-pointer"
                    src={
                      profilePic ||
                      auth.reqUser?.profilePicture ||
                      defaultProfilePic
                    }
                    alt=""
                  />
                  <p>{profileName || auth.reqUser?.fullname || "Person"}</p>
                </div>
                {/* icons */}
                <div className="space-x-2 text-2xl flex">
                  <TbCircleDashed
                    className="cursor-pointer"
                    onClick={() => navigate("/status")}
                  />
                  <BiCommentDetail />
                  <div>
                    <BsThreeDotsVertical
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                      className="cursor-pointer"
                    />
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={handleProfile}>Profile</MenuItem>
                      <MenuItem onClick={handleCreateGroup}>
                        Create Group
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </div>
                </div>
              </div>
              {/* input and search field */}
              <div className="relative flex justify-center items-center bg-white py-4 px-3">
                <input
                  className="border-none outline-none bg-slate-200  rounded-md w-[93%] pl-9 py-2"
                  type="text"
                  placeholder="Start a chat"
                  onChange={(e) => {
                    setQuerys(e.target.value);
                    handleSearch(e.target.value);
                  }}
                  value={querys}
                />
                <AiOutlineSearch className="left-6 top-7 absolute" />
                <div>
                  <BsFilter className="ml-4 text-3xl" />
                </div>
              </div>
              {/* users to chat with (all users)  */}
              <div className="bg-white overflow-y-scroll px-3 h-[492px] xl:h-[497px]">
                {querys &&
                  auth.searchUser?.map((item) => {
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleClickOnChatCard(item.id)}
                      >
                        <ChatCard item={item} />
                      </div>
                    );
                  })}
                {chat.chats?.length > 0 &&
                  !querys &&
                  chat.chats?.map((item) => {
                    let data;
                    if (item.chatName) {
                      data = {
                        fullname: item.chatName,
                        profilePicture: item.chatImage || defaultGroupPic,
                      };
                    } else if (item.isGroup) {
                      data = {
                        fullname: item.chatName || "New Group",
                        profilePicture: item.chatImage || defaultGroupPic,
                      };
                    } else {
                      item.users.map((user) => {
                        if (user.id !== auth.reqUser.id) {
                          data = {
                            fullname: user.fullname,
                            profilePicture:
                              user.profilePicture || defaultProfilePic,
                          };
                        }
                      });
                    }
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleCurrentChat(item)}
                      >
                        <ChatCard item={data} />
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {isGroup && <CreateGroup setIsGroup={setIsGroup} />}
        </div>

        {/* ------- right page for chat area -------- */}
        {/* default whatsapp page */}
        {!currentChat && (
          <div className="w-[70%] flex flex-col items-center justify-center p-10">
            <div className="w-full text-center">
              <img
                src="https://res.cloudinary.com/zarmariya/image/upload/v1662264838/whatsapp_multi_device_support_update_image_1636207150180-removebg-preview_jgyy3t.png"
                alt=""
                className="mx-auto"
              />
              <h1 className="text-4xl text-gray-600">Whatsapp Web</h1>
              <p className="my-9">
                Send and recieve message without keeping your phone online. Use
                Whatsapp on up to 4 linked devices and 1 phone at the same time
              </p>
            </div>
          </div>
        )}

        {/* message part of the selected chart */}
        {currentChat && (
          <div className="w-[70%] relative">
            <div className="header px-3 top-0 w-full absolute bg-[#f0f2f5]">
              <div className="flex justify-between items-center">
                <div className="py-3 space-x-4 flex items-center px3">
                  <img
                    src={
                      currentChat?.isGroup
                        ? currentChat.chatImage || defaultGroupPic
                        : auth.reqUser?.id === currentChat.users[0].id
                        ? currentChat.users[1].profilePicture ||
                          defaultProfilePic
                        : currentChat.users[0].profilePicture ||
                          defaultProfilePic
                    }
                    className="w-10 h-10 rounded-full"
                  />
                  <p>
                    {currentChat && currentChat.chatName
                      ? currentChat.chatName
                      : auth.reqUser?.id === currentChat?.users[0].id
                      ? currentChat.users[1].fullname
                      : currentChat.users[0].fullname}
                  </p>
                </div>
                <div className="py-3 flex space-x-4 items-center">
                  <AiOutlineSearch />
                  <BsThreeDotsVertical />
                </div>
              </div>
            </div>

            {/* message section for chat */}
            <div className="px-10 h-[72vh] mt-16 overflow-y-scroll bg-blue-200">
              <div className="space-y-1 flex flex-col justify-center py-2">
                {messages?.length > 0 &&
                  messages?.map((item, index) => {
                    return (
                      <MessageCard
                        key={index}
                        content={item.content}
                        isReqUserMessage={item.user.id === auth.reqUser?.id}
                      />
                    );
                  })}
              </div>
            </div>

            {/* footer part */}
            <div className="footer absolute bottom-0 w-full py-3 bg-[#f0f2f5] flex text-2xl justify-between items-center h-[9vh]">
              <div className="flex justify-between items-center space-x-5 px-4 relative">
                <BsEmojiSmile className="cursor-pointer" />
                <ImAttachment className="cursor-pointer" />
              </div>
              <input
                type="text"
                onChange={(e) => setContent(e.target.value)}
                className="py-1 outline-none border-none bg-white pl-4 rounded-md w-full text-lg"
                placeholder="Type message"
                value={content}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleCreateNewMessage();
                    setContent("");
                  }
                }}
              />
              <BsMicFill className="mx-4 text-3xl" />
            </div>

            {/* end */}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
