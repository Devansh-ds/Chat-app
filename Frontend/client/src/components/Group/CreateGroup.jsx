import React, { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import SelectedMember from "./SelectedMember";
import ChatCard from "../ChatCard/ChatCard";
import { Navigate, useNavigate } from "react-router-dom";
import NewGroup from "./NewGroup";
import { useDispatch, useSelector } from "react-redux";
import { searchUsers } from "../../Redux/Auth/Action";
import "./CreateGroup.css";

const CreateGroup = ({ setIsGroup }) => {
  const [newGroup, setNewGroup] = useState(false);
  const [groupMember, setGroupMember] = useState(new Set());
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const auth = useSelector((store) => store.auth);

  const handleRemoveMember = (item) => {
    const newSet = new Set(groupMember);
    newSet.delete(item);
    setGroupMember(newSet);
  };

  const handleSearch = (keyword) => {
    dispatch(searchUsers({ keyword, token }));
  };

  return (
    <div className="w-full h-full">
      {!newGroup && (
        <div>
          {/* header */}
          <div className="flex items-center space-x-10 bg-[#008069] text-white p-8">
            <BsArrowLeft
              className="cursor-pointer text-4xl font-bold"
              onClick={() => {
                setIsGroup(false);
              }}
            />
            <p className="text-xl font-semibold">Add Group Participants</p>
          </div>

          {/* search members and select them */}
          <div className="relative bg-white py-4 px-3 h-[10vh]">
            {/* selected members */}
            <div className="flex max-w-fit space-x-2 pl-2 overflow-x-scroll">
              {groupMember.size > 0 &&
                Array.from(groupMember).map((item, index) => (
                  <SelectedMember
                    handleRemoveMember={() => handleRemoveMember(item)}
                    member={item}
                    key={index}
                  />
                ))}
            </div>

            {/* search member */}
            <input
              type="text"
              onChange={(e) => {
                setQuery(e.target.value);
                handleSearch(e.target.value);
              }}
              className="outline-none z-30 bg-white border-b border-[#888888] p-2 w-[100%]"
              placeholder="Search user"
              value={query}
            />
          </div>

          <div className="bg-white pt-[30px] h-[50.2vh] overflow-y-scroll">
            {query &&
              auth.searchUser?.map((item, index) => {
                return (
                  <div
                    className="px-3"
                    onClick={() => {
                      groupMember.add(item);
                      setGroupMember(groupMember);
                      setQuery("");
                    }}
                    key={index}
                  >
                    <ChatCard item={item} />
                  </div>
                );
              })}
          </div>

          {/* create button (arrow) */}
          <div className=" bg-slate-200 flex h-[100%] items-center justify-center py-4 xl:py-7">
            <div
              onClick={() => {
                setNewGroup(true);
              }}
            >
              <BsArrowRight className="text-white font-bold text-3xl bg-green-500 rounded-full w-[50px] h-[50px] p-3" />
            </div>
          </div>
        </div>
      )}
      {newGroup && (
        <NewGroup
          setIsGroup={setIsGroup}
          groupMember={groupMember}
          setNewGroup={setNewGroup}
        />
      )}
    </div>
  );
};

export default CreateGroup;
