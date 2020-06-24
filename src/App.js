import React, {Component} from 'react';
import Clarifai from 'clarifai';
import './App.css';
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

const app = new Clarifai.App({
    apiKey: 'd4b0f5a38c5e4354bd0b15a843e35e24'
});

class App extends Component {
  constructor() {
      super();
      this.state = {
          input: '',
          imageUrl: '',
          box: {},
      }
  }

  calculateFaceLocation = (data) => {
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - (clarifaiFace.right_col * width),
          bottomRow: height - (clarifaiFace.bottom_row * height)
      }
  }

  displayFaceBox = (box) => {
      this.setState({box: box});
  }

  onInputChange = (event) => {
      this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
      this.setState({imageUrl: this.state.input});
      app.models
          .predict(
              'c0c0ac362b03416da06ab3fa36fb58e3',
              this.state.input)
          .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
          .catch(err => console.log(err));
  }


  render() {
    return (
        <div className="App">
          <Logo/>
          <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}/>
          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
        </div>
    );
  }
}

export default App;
