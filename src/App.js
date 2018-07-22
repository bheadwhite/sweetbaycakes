import React, { Component } from "react";
import "./App.css";
import axios from 'axios'

class App extends Component {
  constructor() {
    super();
    this.state = {
      bigImage: false,
      cstName: "",
      cstNumber: "",
      cstServSize: 0,
      cstCakeSize: "",
      cstOrientation: "",
      cstStyle: "",
      cstFlavor: "",
      cstCream: "",
      cstFillings: "",
      cstMessage: "",
      cstInstructions: "",
      cstPic: ""
    };
  }
  getHappy(){
    axios.get('/api/get').then(res => {
      console.log(res)
    })
  }
  sendEmail(){
    axios.post("/api/submitForm", this.state)
  }
  render() {
    let ques = "?";
    let bigImage = this.state.bigImage ? "bigImage" : "hidden";
    console.log(this.state);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to SweetBay Cakes</h1>
        </header>
        <section>
          <p>
            <span>Hello! </span> Thank you for your interest in Sweet Bay Cakes!
          </p>
        </section>
        <div className="wrapper">
          <form>
            <p>Please select...</p>
            <p>
              Cake size:
              <select
                id="cakeSize"
                onChange={e => this.setState({ cstCakeSize: e.target.value })}
              >
                <option>Choose...</option>
                <option value="4">4 inches</option>
                <option value="6">6 inches</option>
                <option value="8">8 inches</option>
                <option value="10">10 inches</option>
                <option value="12">12 inches</option>
                <option value="14">14 inches</option>
              </select>
            </p>
            <p>
              Style:
              <select
                id="cakeStyle"
                onChange={e => this.setState({ cstStyle: e.target.value })}
              >
                <option>Party or Event?</option>
                <option value="Party">Party</option>
                <option value="Event">Event</option>
              </select>
            </p>
            <p>
              Orientation:
              <select
                id="cakeOrienetation"
                onChange={e =>
                  this.setState({ cstOrientation: e.target.value })
                }
              >
                <option>Round or Square?</option>
                <option value="Round">Round</option>
                <option value="Square">Square </option>
              </select>
            </p>
            <p>
              Flavor of Cake:
              <select
                id="cakeFlavor"
                onChange={e => this.setState({ cstFlavor: e.target.value })}
              >
                <option>Choose...</option>
                <option value="Chocolate">Chocolate</option>
                <option value="White">White</option>
                <option value="Strawberry">Strawberry</option>
                <option value="Yellow">Yellow</option>
                <option value="Funfetti">Funfetti</option>
                <option value="Red Velvet">Red Velvet</option>
                <option value="Almond">Almond</option>
                <option value="Lemon">Lemon</option>
                <option value="Cherry">Cherry</option>
              </select>
            </p>
            <p>
              Cream Flavor:
              <select
                id="creamFlavor"
                onChange={e => this.setState({ cstCream: e.target.value })}
              >
                <option>Choose...</option>
                <option value="Chocolate">Chocolate</option>
                <option value="Vanilla">Vanilla</option>
                <option value="Almond">Almond</option>
                <option value="Lemon">Lemon</option>
                <option value="Cream Cheese">Cream Cheese</option>
                <option value="Caramel">Caramel</option>
                <option value="Strawberry">Strawberry</option>
                <option value="Cookies &amp; Cream">Cookies &amp; Cream</option>
              </select>
            </p>
            <p>
              Extra Fillings{ques}:
              <select
                id="cakeFillings"
                onChange={e => this.setState({ cstFillings: e.target.value })}
              >
                <option>Choose...</option>
                <option value="Ganache">Ganache</option>
                <option value="Jelly">Jelly</option>
                <option value="Bavarian Cream">Bavarian Cream</option>
              </select>
            </p>
            <div className="specialInstructions">
              <label htmlFor="specialMessage"> Special Message: </label>
              <textarea
                id="specialMessage"
                rows="3"
                cols="40"
                onChange={e => this.setState({ cstMessage: e.target.value })}
              />
              <label htmlFor="specialInstructions">Special Instructions:</label>
              <textarea
                id="specialInstructions"
                rows="6"
                cols="40"
                onChange={e =>
                  this.setState({ cstInstructions: e.target.value })
                }
              />
              <label className="upload" htmlFor="cakeIdea">
                Upload your cake idea:
              </label>
              <input
                type="file"
                accept="image/png, image/jpeg"
                multiple
                onChange={e => this.setState({ cstPic: e.target.value })}
              />
            </div>
            <div className="customerInfo" />
          </form>
          {/**************************************** sidebar *************************************/}
          <div className="reference">
            <h3>Reference</h3>
            <div className="form-cakeSize-image">
              <p>Use picture for sizing guide.</p>
              <img
                onClick={() => this.setState({ bigImage: true })}
                src="./img/cakeSize.png"
                alt="cake Sizes"
              />
            </div>
            <h5>Cake Flavor:</h5>
            <p>This is the flavor of the cake mix.</p>
            <h5>Cream:</h5>
            <p>This is the spread that goes on the cake.</p>
            <h5>Extra Fillings:</h5>
            <p>This is optional extra cream that goes inside. Mmmm!</p>
          </div>
        </div>
        {/**************************************** big Cake Pic *************************************/}
        <div
          className={`bigCakeSize-image ${bigImage}`}
          onClick={() => this.setState({ bigImage: false })}
        >
          <img className="bigOne" src="./img/cakeSize.png" alt="cake Sizes" />
          <img
            className={`close ${bigImage}`}
            src="./img/close.png"
            alt="close button"
          />
        </div>
        <div className="customerForm">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            required
            onChange={e => this.setState({ cstName: e.target.value })}
          />
          <label>Phone Number:</label>
          <input
            type="tel"
            placeholder="(xxx)-xxx-xxxx"
            required
            onChange={e => this.setState({ cstNumber: e.target.value })}
          />
          <button onClick={()=>this.sendEmail()}>Submit Order</button>
        </div>
      </div>
    );
  }
}

export default App;
