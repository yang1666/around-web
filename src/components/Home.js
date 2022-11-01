import React, { useState, useEffect } from "react";
import { Tabs, message, Row, Col, Button } from "antd";
import axios from "axios";

import SearchBar from "./SearchBar";
import PhotoGallery from "./PhotoGallery";
import { SEARCH_KEY, BASE_URL, TOKEN_KEY } from "../constants";
import CreatePostButton from "./CreatePostButton";

const { TabPane } = Tabs;

function Home(props) {
  const [posts, setPost] = useState([]);//默认为空，什么时候修改呢？在axios.then
  const [activeTab, setActiveTab] = useState("image");
  const [searchOption, setSearchOption] =useState({
    type: SEARCH_KEY.all,
    keyword: ""
  })

  const handleSearch = (option) => {
    const { type, keyword } = option;
    setSearchOption({ 
      type: type, 
      keyword: keyword 
    }); 
  };

  useEffect(()=>{
    //do search for the first time->didMount ->search :{type :all, value :""}
    //do search after the first time -> didUpdata ->search{type: keyword/user, value:val}
    const { type, keyword } = searchOption;
    fetchPost(searchOption);//Home 一上诉，就fetchpost
  }, [searchOption]);

  const fetchPost = (option) => {
   //step1:getsearchYpe and serchValue
   //step2:send search request to the server
   //step3:get response from the server
   //      case 1: succuss: pass the post to the gallary?
  //       case 2: fail: inform users
    const { type, keyword } = option;
    let url = ""; 
    if (type === SEARCH_KEY.all) {
      url = `${BASE_URL}/search`;
    }else if (type === SEARCH_KEY.user) {
      url = `${BASE_URL}/search?user=${keyword}`;
    }else {
      url = `${BASE_URL}/search?keywords=${keyword}`;
    }
    const opt ={
        method: "GET",
        url: url,
        headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`//from backend
      }
    }

    axios(opt)
      //问后端要数据，一旦要过来要给home下面的状态值，只需要set这个状态值，就能拿到最新的数据
      .then( res =>{
        if (res.status === 200) {
          setPost(res.data);
        }
      })
      .catch(err =>{
        message.error("Fetch posts failed!");
        console.log("fetch posts failed: ", err.message);
      })
  }
  const renderPosts = (type) => {
    console.log(posts)
    //case1. type === images => display <Gallary>
    //case2. type === videos =>display videos
    if (!posts || posts.length === 0) {
      return <div>No data!</div>;
    }
    if (type === "image") {
      //filter all images
        const imageArr = posts
        .filter((item) => item.type === "image")
        .map((image) => {
          return {
            postId: image.id,
            src: image.url,
            user: image.user,
            caption: image.message,
            thumbnail: image.url,
            thumbnailWidth: 300,
            thumbnailHeight: 200
          };
        });

    return <PhotoGallery images={imageArr} />;//props.image 传到photo gallary
    } else if (type === "video") {
      return (
        <Row gutter={32}>
          {posts
            .filter((post) => post.type === "video")
            .map((post) => (
              <Col span={8} key={post.url}>
                <video src={post.url} controls={true} className="video-block" />
                <p>
                  {post.user}: {post.message}
                </p>
              </Col>
            ))}
        </Row>
      );
    }
  };
  
  const showPost = (type) => {
    console.log("type -> ", type);
    setActiveTab(type);

    setTimeout(() => {
      setSearchOption({ type: SEARCH_KEY.all, keyword: "" });
    }, 3000);
  };

  // const operations = <CreatePostButton onShowPost={showPost} />;

  return (
    <div className="home">
      <SearchBar handleSearch={handleSearch} />
      <div className="display">
        <Tabs
          onChange={(key) => setActiveTab(key)}
          defaultActiveKey="image"
          activeKey={activeTab}
          tabBarExtraContent={<CreatePostButton onShowPost={showPost}/>}//inform: call back function

        >
          <TabPane tab="Images" key="image">
            {renderPosts("image")}
          </TabPane>
          <TabPane tab="Videos" key="video">
            {renderPosts("video")}
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
  }

export default Home;