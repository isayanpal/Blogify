import React from "react";
import { Link } from "react-router-dom";
import "boxicons";

const Post = ({_id,title, summary,  imageUrl, author}) => {
  return (
    <div className="sm:w-[800px] p-2">
      <div className="post flex sm:flex-row flex-col items-center justify-around">
        <div className="img w-[300px]">
          <img src={'https://blogify-xy7n.onrender.com/'+ imageUrl} alt="" />
        </div>
        <div className="text">
          <h2 className="text-xl text-white">{title}</h2>
          <p className="text-gray-400">
            by: <span className="text-[var(--text)]">{author.username}</span>
          </p>
          <p className="summary truncate w-[250px] text-gray-400">
            {summary}
          </p>
          <Link to={`/post/${_id}`}>
            <button className="flex flex-row items-center">
              Read More{" "}
              <box-icon name="chevron-right" color="#ffffff"></box-icon>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Post;
