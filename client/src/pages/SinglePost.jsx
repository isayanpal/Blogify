import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {UserContext} from "../context/UserContext"

const SinglePost = () => {
  const [postInfo, setPostInfo] = useState(null);
  const {user} = useContext(UserContext)
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async ()=>{
      try {
        const res = await axios.get(`http://localhost:5000/api/post/${id}`);
        // console.log(res.data);
      setPostInfo(res.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    }
    fetchData();
  }, [id]);

  // delete function
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/post/${id}/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        navigate("/explore");
      } else {
        console.log("Failed to delete post:", await response.text());
      }
    } catch (error) {
      console.log("Failed to delete post", error);
    }
  };

  if (!postInfo) return "";

  const imageSrc = `http://localhost:5000/${postInfo.imageUrl}`;
  return (
    <div className="post-page">
      <div className="sm:w-auto p-2">
        <div className="post flex flex-col items-center justify-around">
          <div className="img sm:w-[500px] w-[300px]">
          <img src={imageSrc} alt="" />
          </div>
          {user && (
              user.id === postInfo.author._id && (
              <div className="flex flex-row gap-4 sm:my-3 my-2">
                <Link to={`/edit/${postInfo._id}`}>
                <button className="p-4 flex items-center justify-center w-32 h-10 rounded-xl bg-[var(--accent)]">Edit</button>
                </Link>
                <button className="p-4 flex items-center justify-center w-32 h-10 rounded-xl bg-red-500" onClick={handleDelete}>Delete</button>
              </div>
            )
          )}
          <div className="text sm:my-5 mt-5 px-3 flex flex-col items-center gap-3">
            <h2 className="text-xl">{postInfo.title}</h2>
            <p className="text-gray-400">
              by: <span className="text-[var(--text)]">{postInfo.author.username}</span>
            </p>

            <div
              className="content sm:w-[1000px] md:w-[600px]"
              dangerouslySetInnerHTML={{ __html: postInfo.content }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
