'use strict';

import React from "react";
import {Button, ButtonToolbar, Col, Collapse, Label, Thumbnail, Glyphicon} from "react-bootstrap";
import client from "../client";
import PostModal from "./postModal.js";

class PostBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            post: props.post,
            modalOpened: false,
            fullText: false,
        };

        this.ignoreRecord = this.ignoreRecord.bind(this);
        this.handleModalPosted = this.handleModalPosted.bind(this);
    }

    ignoreRecord() {
        client({
            method: 'POST',
            path: '/posts/ignore',
            entity: this.state.post,
            headers: {
                'Content-Type': 'application/json'
            }
        }).done(response => {
            this.state.post.isIgnored = true;
            this.props.onIgnoredChange(this.state.post);
        });
    }

    handleModalPosted() {
        this.state.post.isPosted = true;
        this.props.onPostedRecord();
    }

    render() {
        return (
            <div>
                <Col xs={6} md={4}>
                    <Thumbnail className="postCard">
                        <ButtonToolbar>
                            <Button bsStyle="danger" bsSize="small" className="pull-right"
                                    onClick={this.ignoreRecord}><Glyphicon glyph="trash"/></Button>
                            <Button bsStyle="primary" bsSize="small" className="pull-right"
                                    onClick={() => this.refs.modal.open(this.state.post)}>Create
                                news post</Button>
                        </ButtonToolbar>
                        <div className="titleContainer">
                            <div className="ellipsis">
                                {this.state.post.title}
                            </div>
                        </div>
                        <p>
                            <Label bsStyle="info">{this.state.post.author}</Label>
                            &nbsp;&nbsp;&nbsp;
                            <Label style={{cursor: "pointer"}} onClick={
                                () => window.open(this.state.post.link, "_blank")
                            }>Open Original Post</Label>
                        </p>

                        <Button onClick={() => this.setState({fullText: !this.state.fullText}) }>
                            Toggle full text
                        </Button>
                        <Collapse in={this.state.fullText}>
                            <div dangerouslySetInnerHTML={{__html: this.state.post.text}}>
                            </div>
                        </Collapse>
                    </Thumbnail>
                </Col>
                <PostModal ref="modal"
                           onModalPosted = {this.handleModalPosted}/>
            </div>
        )
    }
}

export default PostBox;