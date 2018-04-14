import React from "react";
import Dropzone from 'react-dropzone'
import dropimg from './resources/drop_image.png'
import './MyDropzone.css'

export class MyDropzone extends React.Component {

    render() {
        const onDrop = this.props.onDrop

        return (
            <Dropzone onDrop={onDrop} className={'dropzone-styling'}>
                <div className='dropzone--dropimg' borderStyle="none">
                    <img src={dropimg} height="50px"/>
                </div>
            </Dropzone>
        )
    }
}

