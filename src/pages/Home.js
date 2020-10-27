import React, { Component } from 'react';
import ListView from '../components/ListView';
import { Grid, Row, Col } from 'react-flexbox-grid';
import InputForm from '../components/InputForm';
import { getProducts } from '../services/HttpServices';
import Loader from '../components/Loader';

class Home extends Component { 

    constructor(props) {
        super(props);
    
        this.state = {
            products: null,
            dataList: [],
            qtd: 100,
            inputValue: '',
            loading: false,
            inputProduct: false,
            resetForm: false,
        };
    }


    componentDidMount() {
        this.getData();
    }


    getData = async () => {

        this.setState({
            loading: true,
        });

        await getProducts().then((resp) => {

            if ( resp.data.length > 0 ) {
                this.setState({
                    dataList: resp.data,
                    products: true,
                    loading: false,
                });
            } else {
                this.setState({
                    productsError: true,
                    loading: false,
                });
            }
        })
        .catch((erro) => {
            this.setState({
                productsError: true,
                loading: false,
            });
        })
    };


    includeProduct = (reLoadList) => {
        this.setState({
            inputProduct: !this.state.inputProduct,
        })

        if(reLoadList){
            this.getData();
        }
    }

    loadMore = () => {
        let more = this.state.qtd + 10 ;
        this.setState({
            qtd: more,
        })
    };


    render() {

        if ( this.state.loading )  {
            return (
                <Grid className="app-container loading">
                    <div className="loader-container">
                        <Loader loading={true} className="loader" />
                    </div>
                </Grid>
            );
        }

        if ( this.state.productsError )  {
            return (
                <Grid className="app-container loading">
                    <Row>
                        <Col xs={12}>
                            <h3>Sorry, </h3>
                            <h3>Something went wrong ...</h3>
                            <p></p>
                            <button className="btn-cs" onClick={e => {this.getData()}}>Try again...</button>
                        </Col>
                    </Row>
                </Grid>
            );
        }

        if (this.state.inputProduct) {
            return (
                <>
                    <div className="home">
                        <Grid fluid>
                            <Row>
                                <Col xs={12}>
                                    <h2>Product Include</h2>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <InputForm cancel={this.includeProduct} onSubmit={this.postData} resetForm={this.state.resetForm} />
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                </>
            )
        }

        return (
            <>
                <div className="home">
                    <Grid fluid>
                        {this.state.products && (
                            <div className="list-products">
                                <Row>
                                    <Col xs={12} className="list-products-topo">
                                        <h2>Products List</h2>
                                        <button className="btn-cs" onClick={e => {this.includeProduct(false)}}> + New</button>
                                    </Col>
                                </Row>
                                
                                <div className="list-products-container">
                                    <ListView data={this.state.dataList} more={this.state.qtd} />
                                </div>
                                { (this.state.dataList.length > this.state.qtd) && ( <button className="btn-cs" onClick={e => {this.loadMore()}}>Load +</button>)}
                            </div>
                        )}
                    </Grid>
                </div>
            </>

        );
    }

}
export default Home