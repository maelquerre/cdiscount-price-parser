import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sku: '',
      price: null,
      requests: [],
      errors: [],
      queue: {}
    }

    this.fetchProductPrice = this.fetchProductPrice.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  uniqueId() {
    return Math.random().toString(16).substr(2)
  }

  fetchProductPrice(event) {
    event.preventDefault()
    const endpoint = `/api/price.py?sku=${this.state.sku}`
    const requestId = this.uniqueId()

    this.setState({
      price: null,
      errors: [],
      queue: { ...this.state.queue, [requestId]: endpoint }
    })

    if (this.state.sku.length <= 0) {
      this.setState({ errors: ['Please provide a sku'] })
    } else {
      const request = { path: endpoint }

      fetch(endpoint)
        .then(response => {
          switch (response.status) {
            case 200:
              request.status = 'success'
              request.message = 'Success!'
              break
            case 404:
              request.status = 'error'
              request.message = 'This product could not be found.'
              break
            case 429:
              request.status = 'error'
              request.message = 'Too many requests, try again later.'
              break
            case 500:
            case 501:
            case 502:
            case 503:
            case 504:
              request.status = 'error'
              request.message = 'There was an error with the server.'
              break
          }

          const newQueue = { ...this.state.queue }
          delete newQueue[requestId]

          this.setState({
            queue: newQueue,
            requests: [...this.state.requests, request]
          })

          return response.json()
        })
        .then(data => {
          this.setState({ price: data })
        })
        .catch(console.log)
    }
  }

  handleInputChange(event) {
    this.setState({ sku: event.target.value })
  }

  render() {
    return (
      <div className="app">
        <h1>Cdiscount price parser</h1>

        <div className="form-wrapper">
          <form onSubmit={this.fetchProductPrice}>
            <label htmlFor="inputSku">
              Enter a product sku (ex: del5397184246030)
            </label>
            <input
              id="inputSku"
              autoFocus
              placeholder="sku"
              type="text"
              onChange={this.handleInputChange}
            />

            <button type="submit">Get price</button>

            {this.state.errors.length > 0 && this.state.errors.map((error, index) => {
              return (
                <p key={index}
                   className="error">{error}</p>
              )
            })}
          </form>

          {this.state.price && <div className="price">
            {this.state.price}&nbsp;€
          </div>}
        </div>


        {(this.state.requests.length > 0 || Object.values(this.state.queue).length > 0) &&
        <div className="logs">
          <div className="logs-heading">Request</div>
          <div className="logs-heading">Info</div>

          {this.state.requests.length > 0 && this.state.requests.map((request, index) => {
            return (
              <React.Fragment key={index}>
                <p className={request.status}>{request.path}</p>
                <p className={request.status}>{request.message}</p>
              </React.Fragment>
            )
          })}

          {Object.values(this.state.queue).length > 0 && Object.values(this.state.queue).map((requestEndpoint, index) => {
            return (
              <React.Fragment key={index}>
                <p>{requestEndpoint}</p>
                <p>Pending...</p>
              </React.Fragment>
            )
          })}
        </div>}
      </div>
    )
  }
}

export default App
