// component that contains the logic to read one product
window.ReadOneProductComponent = React.createClass({
    getInitialState: function() {
        // Get this product fields from the data attributes we set on the
        // #content div, using jQuery
        return {
            id: 0,
            name: '',
            estatus: '',
            category_name: ''
        };
    },

// on mount, read product data and them as this component's state
    componentDidMount: function(){

        var productId = this.props.productId;

        this.serverRequestProd = $.get("http://localhost/api-php/product/read_one.php?id=" + productId,
            function (product) {
                this.setState({category_name: product.category_name});
                this.setState({id: product.id});
                this.setState({name: product.name});
                if(product.estatus==0) {
                    this.setState({estatus: 'Sin Asignar'});
                    this.setState({style_estatus: {color: '#ddd'}});
                }
                else if (product.estatus==1) {
                    this.setState({estatus: 'Borrador'});
                    this.setState({style_estatus: {color: '#337ab7'}});
                }
                else if (product.estatus==2) {
                    this.setState({estatus: 'Pdt Validar'});
                    this.setState({style_estatus: {color: '#52bb56'}});
                }
                else if (product.estatus==3) {
                    this.setState({estatus: 'Correcciones'});
                    this.setState({style_estatus: {color: '#ef5350'}});
                }
            }.bind(this));

        $('.page-header h1').text('Ver Artículo');
    },

// on unmount, kill categories fetching in case the request is still pending
    componentWillUnmount: function() {
        this.serverRequestProd.abort();
    },

    render: function() {

        return (
            <div>
            <a href='#'
        onClick={() => this.props.changeAppMode('read')}
        className='btn btn-primary margin-bottom-1em'>
            Ver Artículos
        </a>

        <form onSubmit={this.onSave}>
        <table className='table table-bordered table-hover'>
            <tbody>
            <tr>
            <td>Nombre</td>
            <td>{this.state.name}</td>
        </tr>

        <tr>
        <td>Estatus</td>
        <td><span style={this.state.style_estatus}>{this.state.estatus}</span></td>
        </tr>

        <tr>
        <td>Categoría</td>
        <td>{this.state.category_name}</td>
        </tr>

        </tbody>
        </table>
        </form>
        </div>
        );
    }
});