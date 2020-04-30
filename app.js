'use strict';

const e = React.createElement;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: null
    };
  }

  fetchProductPrice(sku) {
    fetch(`/api/price.py?sku=${sku}`).then(response => {
      console.log(response);
      this.setState({ price: 3 });
    });
  }

  render() {
    return (
      <div>
        Retrieve
      </div>
    );
  }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(<App />, domContainer);
