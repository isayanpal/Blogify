import React, { useEffect, useState } from "react";
import { useParams,Navigate } from "react-router-dom";
import Editor from "../Editor";

const Edit = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch('https://blogify-xy7n.onrender.com/api/post/'+id).then(response => {
        response.json().then(postInfo => {
            setTitle(postInfo.title);
            setContent(postInfo.content);
            setSummary(postInfo.summary);
        })
    })
}, [])

async function updatePost(e) {
  e.preventDefault();
  const data = new FormData();
  data.set('title',title);
  data.set('summary', summary);
  data.set('id', id);
  data.set('content', content);
  if(files?.[0]) {
      data.set('file', files?.[0]);
  }
  const response = await fetch(`https://blogify-xy7n.onrender.com/api/post/${id}`, {
      method: 'PUT',
      body:data,
      credentials: 'include'
  })
  if(response.ok) {
      setRedirect(true);
  }
}

if(redirect){
  return <Navigate to={'/post/'+id} />
}

  return (
    <div className="flex flex-col items-center gap-[100px]">
      <div>
        <h1 className="text-3xl font-semibold underline decoration-[var(--accent)]">
          Edit Your Blog
        </h1>
      </div>

      {/* editor section */}
      <div>
        <form className="flex flex-col items-start gap-10" onSubmit={updatePost}>
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
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
