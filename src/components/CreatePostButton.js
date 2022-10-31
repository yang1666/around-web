import React, { Component, createRef } from "react";
import { Modal, Button, message } from "antd";
import axios from "axios";

import { BASE_URL, TOKEN_KEY } from "../constants";
import { PostForm } from "./PostForm";


class CreatePostButton extends Component { 
    state = {
        visible: false,
        confirmLoading: false
    };

    showModal = () => {
        this.setState({
        visible: true
        });
    };

    handleOk = () => {
        this.setState({
        confirmLoading: true
        });
    }
    handleCancel = () => {
        console.log("Clicked cancel button");
        this.setState({
            visible: false
        });
    };
    render(){
        const { visible, confirmLoading } = this.state;
        return (
        <div>
            <Button type="primary" onClick={this.showModal}>
            Create New Post
            </Button>
            <Modal 
                title="Create New Post"
                visible={visible}
                onOk={this.handleOk}
                okText="Create"
                confirmLoading={confirmLoading}
                onCancel={this.handleCancel}
            >
                <PostForm/>
            </Modal>
        </div>
        )
    }
}
export default CreatePostButton;
