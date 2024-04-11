import React, { useState } from "react";
import Editor from "../Editor";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  // const [redirect, setRedirect] = useState(false);

  return (
    <div className="flex flex-col items-center gap-[100px]">
      <div>
        <h1 className="text-3xl font-semibold underline decoration-[var(--accent)]">
          Create Your Blog
        </h1>
      </div>

      {/* editor section */}
      <div>
        <form className="flex flex-col items-start gap-10">
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
          <input type="file" onChange={(e) => setFiles(e.target.files)} />
          <Editor onChange={setContent} value={content} />
          <button className="w-[160px] h-[60px] text-center bg-[var(--primary)] rounded-[20px]">
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
