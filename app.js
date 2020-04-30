'use strict';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      price: null
    };

    this.fetchProductPrice = this.fetchProductPrice.bind(this);
    this.input = React.createRef();
  }

  fetchProductPrice(event) {
    event.preventDefault();

    fetch(`/cdiscount/api/price.py?sku=${this.input.value}`).then(response => {
      console.log(response);
      this.setState({ price: 3 });
    });
  }

  render() {
    return (
      <div className="app">
        <h1>Cdiscount price parser</h1>

        <form onSubmit={this.fetchProductPrice}>

          <label htmlFor="inputSku">Enter a product sku (ex: del5397184246030)</label>
          <input
            id="inputSku"
            placeholder="sku"
            ref={this.input}
            type="text"
          />

          <button type="submit">Get price</button>
        </form>

        {this.state.price}
      </div>
    );
  }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(<App />, domContainer);
