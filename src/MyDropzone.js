import React from "react";
import Dropzone from 'react-dropzone'
import dropimg from './resources/drop_image.png'
import './MyDropzone.css'

export class MyDropzone extends React.Component {

    render() {
        const onDrop = this.props.onDrop;
        const frameStyle = this.props.frameStyle;
        const isLoaded = this.props.isLoading;
     
        return (
            <Dropzone onDrop={onDrop} className={'dropzone-styling'}>
                <div className='dropzone--dropimg'>
                    { !isLoaded ? <img src={dropimg} height="50px"/> : null }
                </div>
            </Dropzone>
        )
    }
}

