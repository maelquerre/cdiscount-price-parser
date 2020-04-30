'use strict';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sku: '',
      price: null,
      requests: []
    };

    this.fetchProductPrice = this.fetchProductPrice.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  fetchProductPrice(event) {
    event.preventDefault();

    this.state.sku && fetch(`/api/price.py?sku=${this.state.sku}`)
      .then(response => {
        switch (response.status) {
          case 200:
            this.setState({
              requests: [
                ...this.state.requests,
                {
                  path: `/api/price.py?sku=${this.state.sku}`,
                  status: 'success',
                  message: 'Success'
                }
              ]
            });
            break;
          case 404:
            this.setState({
              requests: [
                ...this.state.requests,
                {
                  path: `/api/price.py?sku=${this.state.sku}`,
                  status: 'error',
                  message: 'This product could not be found.'
                }
              ]
            });
            break;
          case 500:
          case 501:
          case 502:
          case 503:
          case 504:
            this.setState({
              requests: [
                ...this.state.requests,
                {
                  path: `/api/price.py?sku=${this.state.sku}`,
                  status: 'error',
                  message: 'There was an error with the server.'
                }
              ]
            });
            break;
        }

        return response.json();
      })
      .then(data => {
        this.setState({ price: data });
      })
      .catch(console.log);
  }

  handleInputChange(event) {
    this.setState({ sku: event.target.value });
  }

  render() {
    return (
      <div className="app">
        <h1>Cdiscount price parser</h1>

        <form onSubmit={this.fetchProductPrice}>

          <label htmlFor="inputSku">Enter a product sku (ex:
            del5397184246030)</label>
          <input
            id="inputSku"
            placeholder="sku"
            type="text"
            onChange={this.handleInputChange}
          />

          <button type="submit">Get price</button>
        </form>

        <div>{this.state.price}</div>

        {this.state.requests.length > 0 && <div className="logs">
          <div className="logs-heading">Request</div>
          <div className="logs-heading">Result</div>

          {this.state.requests.length > 0 && this.state.requests.map((request, index) => {
            return (
              <React.Fragment key={index}>
                <p className={request.status}>{request.path}</p>
                <p className={request.status}>{request.message}</p>
              </React.Fragment>
            );
          })}
        </div>}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
