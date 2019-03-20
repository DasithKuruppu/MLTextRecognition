import React, { Component, useCallback } from "react";
import "./App.css";
import { useDropzone } from "react-dropzone";

const MyDropzone = ({onImageReady, onImageAnalizeComplete, isAnalizing}) => {
  const onDrop = useCallback(acceptedFiles => {
    var file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = event => {
      onImageReady(event.target.result);
      isAnalizing(true);
      (async () => {
        try {
          let request = new Request('https://bhoqgstffl.execute-api.us-east-1.amazonaws.com/netlify/image/recognize',{
            method: "post",
            body: event.target.result.split(",")[1],
            mode:'cors',
            headers:{
              'Content-Type':'application/json',
            }
          });
          let response = await fetch(request);

          let jsonResponse = await response.json();
          onImageAnalizeComplete(jsonResponse.result);
          isAnalizing(false);
        } catch (err) {
          isAnalizing(false);

        }
      })();
    };
    reader.readAsDataURL(file);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="DropZWrapper">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the image here ...</p>
      ) : (
        <p>Drag and drop or select an image</p>
      )}
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { previewImage:null,imageAnalisis:null,isAnalizing:false};
  }

  onPreviewImageComplete = (image)=>{
    this.setState({...this.state,previewImage:image})
  }

  onImageAnalisisComplete =(analisis)=>{
    this.setState({...this.state,imageAnalisis:analisis})
  }

  isAnalizing =(state)=>{
    this.setState({...this.state,isAnalizing:state})
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <header className="App-header">
          
          {this.state.isAnalizing &&  <div>Analizing Image............</div>}
          {this.state.previewImage && <img src={this.state.previewImage} className="App-logo" alt="logo" />}

        
          <MyDropzone onImageReady={this.onPreviewImageComplete} onImageAnalizeComplete={this.onImageAnalisisComplete} isAnalizing={this.isAnalizing}/>
          <div>
            {this.state.imageAnalisis && this.state.imageAnalisis.TextDetections ? this.state.imageAnalisis.TextDetections.filter(detection => detection.Type==="LINE").map((filteredDetection)=>{
              return (
                <div> {`line ${filteredDetection.Id} - "${filteredDetection.DetectedText}"      Accuracy : ${Math.floor(filteredDetection.Confidence)}%`} </div>
              )
            }) : ''}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
