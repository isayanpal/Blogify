import React, { useState } from "react";
import { Navigate,useNavigate } from "react-router-dom";
import Editor from "../Editor";
import axios from "axios";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { storage } from "../firebase-config.js";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();


  const createNewPost = async(e) =>{
    const data = new FormData();
    data.set('title',title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
    // e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/post",
        data,
        {
          withCredentials: true,
        }
      );
      // console.log(response.data);
      if (response.ok) {
        setRedirect(true);
      }else {
        console.log("Failed to create post:", await response.text());
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }

  if (redirect) {
    navigate("/explore");
    alert("Post created");
  }

  return (
    <div className="flex flex-col items-center gap-[100px]">
      <div>
        <h1 className="text-3xl font-semibold underline decoration-[var(--accent)]">
          Create Your Blog
        </h1>
      </div>
      <div>
        <form
          className="flex flex-col items-start gap-10"
          onSubmit={createNewPost}
        >
          <input
            className="sm:w-[400px] w-[350px] p-[.5rem] rounded-xl text-black"
            type="title"
            placeholder={"Title"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="sm:w-[400px] w-[350px] p-[.5rem] rounded-xl text-black"
            type="summary"
            placeholder={"Summary"}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <input type="file" onChange={e =>setFiles(e.target.files)} />
          <Editor onChange={setContent} value={content} />
          <button
            className="w-[160px] h-[60px] text-center bg-[var(--primary)] rounded-[20px]"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
