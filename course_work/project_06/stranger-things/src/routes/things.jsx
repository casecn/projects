import { useState, useEffect } from "react";
import { retrieveAllPosts, loginEndpoint } from "../api";
import "../index.css";

const Things = () => {
    //const [loading, setLoading] = useState(true);
    const [posting, setPosting] = useState([]);
    let y = loginEndpoint();
    let x = `last Log: ${y}`
    console.log(x);
    useEffect(()=>{
        const posts = async () => {
        const allPosts = await retrieveAllPosts()
        return allPosts;
    }
    posts()
    .then((allPosts) => setPosting(allPosts))
    .catch(console.error)
    }, [])
    
    const timeHelper = (timeStamp) =>{
        let createdAt = timeStamp;
        let date = new Date(createdAt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
        let localTime = new Date(createdAt).toLocaleTimeString("en-US", {
            localeMatcher: "best fit",
            timeZoneName: "short"});
        timeStamp = date + ", " + localTime
        return timeStamp;
    }
    
  return (
    <>
      <div id="posts">
        {posting &&
          posting.map((post) => (
            <div key={post._id} className="post-thing">
              <h1>{post.title}</h1>
              <p>{post.author.username}</p>
              <div className="">{post.description}</div>
              <p>{post.price}</p>
              <p>{`Posted: ${timeHelper(post.createdAt)}`}</p>
            </div>
          ))}
        
      </div>
    </>
  );
};

export default Things;
