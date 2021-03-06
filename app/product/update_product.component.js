// component that contains the logic to update a product
window.UpdateProductComponent = React.createClass({
    getInitialState: function() {
        // Get this product fields from the data attributes we set on the
        // #content div, using jQuery
        return {
            categories: [],
            selectedCategoryId: 0,
            id: 0,
            name: '',
            estatus: '',
            successUpdate: null
        };
    },

// on mount, fetch all categories and one product data to stored them as this component's state
    componentDidMount: function(){
        // read categories
        this.serverRequestCat = $.get("http://localhost/api-php/category/read.php",
            function (categories) {
                this.setState({
                    categories: categories.records
                });
            }.bind(this));

        // read one product data
        var productId = this.props.productId;
        this.serverRequestProd = $.get("http://localhost/api-php/product/read_one.php?id=" + productId,
            function (product) {
                this.setState({selectedCategoryId: product.category_id});
                this.setState({id: product.id});
                this.setState({name: product.name});
                this.setState({estatus: product.estatus});
            }.bind(this));

        $('.page-header h1').text('Modificar Artículo');
    },

// on unmount, kill categories fetching in case the request is still pending
    componentWillUnmount: function() {
        this.serverRequestCat.abort();
        this.serverRequestProd.abort();
    },

// handle category change
    onCategoryChange: function(e){
        this.setState({selectedCategoryId: e.target.value});
    },

// handle name change
    onNameChange: function(e){
        this.setState({name: e.target.value});
    },

// handle estatus change
    onEstatusChange: function(e){
        this.setState({estatus: e.target.value});
    },

// handle save changes button clicked
    onSave: function(e){

        // data in the form
        var form_data={
            id: this.state.id,
            name: this.state.name,
            estatus: this.state.estatus,
            category_id: this.state.selectedCategoryId
        };

        // submit form data to api
        $.ajax({
            url: "http://localhost/api-php/product/update.php",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify(form_data),
            success : function(response) {
                // api message
                this.setState({successUpdate: response['message']});
            }.bind(this),
            error: function(xhr, resp, text){
                // show error to console
                console.log(xhr, resp, text);
            }
        });

        e.preventDefault();
    },

    render: function() {
        // make categories as option for the select tag.
        var categoriesOptions = this.state.categories.map(function(category){
            return (
                <option key={category.id} value={category.id}>{category.name}</option>
            );
        });

        return (
        <div>
        {
            this.state.successUpdate == "Producto creado." ?
        <div className='alert alert-success'>
            Artículo actualizado exitosamente.
        </div>
        : null
    }

        {
            this.state.successUpdate == "Unable to update product." ?
        <div className='alert alert-danger'>
            Error al registrar el artículo. Por favor intente nuevamente.
        </div>
        : null
        }

        <a href='#'
        onClick={() => this.props.changeAppMode('read')}
        className='btn btn-primary margin-bottom-1em'>
            Ver Artículos
        </a>

        <form onSubmit={this.onSave}>
        <table className='table table-bordered table-hover'>
            <tbody>
            <tr>
            <td>Name</td>
            <td>
            <input
        type='text'
        className='form-control'
        value={this.state.name}
        required
        onChange={this.onNameChange} />
        </td>
        </tr>

        <tr>
        <td>Estatus</td>
        <td>
        <textarea
        type='text'
        className='form-control'
        required
        value={this.state.estatus}
        onChange={this.onEstatusChange}>
        </textarea>
        </td>
        </tr>

        <tr>
        <td>Categoría</td>
        <td>
        <select
        onChange={this.onCategoryChange}
        className='form-control'
        value={this.state.selectedCategoryId}>
        <option value="-1">Seleccione Categoria...</option>
        {categoriesOptions}
        </select>
        </td>
        </tr>

        <tr>
        <td></td>
        <td>
        <button
        className='btn btn-primary'
        onClick={this.onSave}>Guardar Cambios</button>
        </td>
        </tr>
        </tbody>
        </table>
        </form>
        </div>
        );
    }
});