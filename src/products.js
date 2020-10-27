import React from 'react';

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
  }

  componentDidMount() {
    fetch("https://minutrade-react-test.glitch.me/")
      .then(res => res.json())
      .then(
        (result) => {
          result.forEach(product => {
            this.setState({
              products: [
                ...this.state.products,
                <li key={product.name} dangerouslySetInnerHTML={{
                  __html: `
                      <div style="width:260px; float: left"><img src="${product.imageUrl}"></div>
                      <div style="color:#FFFFFF; font-size: 25px; font-family:'Sans-serif';"><b>${product.name}</b></div>
                      <div style="text-decoration: none; color:#000000;font-size: 8px;clear:both "><i>${product.value}</i></div>`
                }} />
              ]
            });
          });
        },
        (error) => {
          console.log(error);
        }
      )
  }

  render() {
    var style = {
      width: '800px', border: '3px solid #00f9ff', 'background-color': 'fucsia'
    }
    return <div style={style}>
      <h1>Products</h1>
      <ul>{this.state.products}</ul>
      <a href="/">Add Product</a>
    </div>
  }
}

export default Products;