import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, message, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import Gallery from "react-grid-gallery";
import { BASE_URL, TOKEN_KEY } from "../constants";

    const captionStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    maxHeight: "240px",
    overflow: "hidden",
    position: "absolute",
    bottom: "0",
    width: "100%",
    color: "white",
    padding: "2px",
    fontSize: "90%"
};

const wrapperStyle = {
    display: "block",
    minHeight: "1px",
    width: "100%",
    border: "1px solid #ddd",
    overflow: "auto"
};

function PhotoGallery(props) {
    const [images, setImages] = useState(props.images);
    const [curImgIdx, setCurImgIdx] = useState(0);//默认值为0

    const imagaArr = images.map( image => {
        return {
            ...image,
            customOverlay: (
                <div style={captionStyle}>
                <div>{`${image.user}: ${image.caption}`}</div>
            </div>
            )
        }
    });
    
    //告诉photogallary，当我的props.image发生变化，必须set一下image，拿到新的props去更新一下状态值
    //要看，props变化和state相关联，因为这里image状态值和props相关联，所以要让useeffect更新
    useEffect(() => {
        setImages(props.images)
    }, [props.images]) 

    const onDeleteImage = () => {
        //step1. confirm to delete
        //step2. get the images to be deleted
        //step3.send the request to the server
        //step4. get reposne
        //    case1. succuss delete, update current array
        //    case2. fail, inform user
        if (window.confirm(`Are you sure you want to delete this image?`)){
            //step2.
            const curImg = images[curImgIdx];
            //删 filter 访 map  加 ... 
            const newImageArr = images
                .filter((img, index) => index !== curImgIdx)

            const opt ={
                method: "DELETE",
                url: `${BASE_URL}/post/${curImg.postId}`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
                }
            }
            axios(opt)
                .then( res => {
                    console.log('delete result -> ', res);
                    // case1: success
                    if(res.status === 200) {
                        // step1: set state
                        setImages(newImageArr);
                    }
                })
                .catch( err => {
                    // case2: fail
                    message.error('Fetch posts failed!');
                    console.log('fetch posts failed: ', err.message);
                })
        }
    }

    const onCurrentImageChange = index => {
        console.log('curIdx ', index);
        setCurImgIdx(index)//更新currentindex，点击image的状态
    }

    return (
        <div style={wrapperStyle}>
            <Gallery
                images={imagaArr}
                enableImageSelection={false}
                backdropClosesModal={true}
                currentImageWillChange={onCurrentImageChange}//当前点击的是谁
                customControls={[
                    //delete button
                    <button style={{marginTop: "10px", marginLeft: "5px"}}
                            key="deleteImage"
                            type="primary"
                            icon={<DeleteOutlined />}
                            size="small"
                            onClick={onDeleteImage}
                    >Delete Image</button>
                ]}
            />
        </div>

    );
}

PhotoGallery.propTypes = {
    images: PropTypes.arrayOf(//arrayof 校验对象
        PropTypes.shape({
            postId: PropTypes.number.isRequired,
            user: PropTypes.string.isRequired,
            caption: PropTypes.string.isRequired,
            src: PropTypes.string.isRequired,
            thumbnail: PropTypes.string.isRequired,
            thumbnailWidth: PropTypes.number.isRequired,
            thumbnailHeight: PropTypes.number.isRequired,
        })
    ).isRequired
};

export default PhotoGallery;