import React, {useEffect, useState} from 'react'

// Import React FilePond
import {FilePond, registerPlugin} from 'react-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

// Our app
export default function App({onChangeImages}) {

    const [files, setFiles] = useState([])

    return (
        <div className="App">
            <FilePond
                files={files}
                onprocessfiles={() => {
                    console.log("onprocessfile_s")
                    console.log(files)
                    // console.log(fileItems)
                    // console.log('try to fetch fileItems')
                    // fileItems.map(fi=>console.log(fi.serverId))
                    // files.map(file => console.log(file))
                    // onChangeImages(files.map(file => file.name))
                }}
                onupdatefiles={fs => {
                    console.log("onupdatefiles")
                    console.log(JSON.parse(JSON.stringify(fs[0])))
                    // setFiles(fs.map(fi => fi.file))
                }}
                allowMultiple={true}
                maxFiles={5}
                server={{
                    url: `http://localhost:3001/images/`,
                    process: '/',
                    revert: {
                        url: '/'
                    }
                }}
                acceptedFileTypes={['image/jpg', 'image/png']}
                name='petImage'
                labelIdle='click to browser or just drop files here'
            />
        </div>
    )
}