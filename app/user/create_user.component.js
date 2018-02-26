// component that contains the logic to create a user
window.CreateUserComponent = React.createClass({
    // initialize values
    getInitialState: function() {
        return {
            categories: [],
            selectedCategoryId: -1,
            name: '',
            estatus: '',
            successCreate: null
        };
    },

// on mount, get all categories and store them in this component's state
    componentDidMount: function(){
        // read categories
        this.serverRequest = $.get("http://localhost/api-php/category/read.php",
            function (categories) {
                this.setState({
                    categories: categories.records
                });
            }.bind(this));

        $('.page-header h1').text('Create user');
    },

// on unmount, stop getting categories in case the request is still loading
    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

// handle category change
    onCategoryChange: function(e){
        this.setState({selectedCategoryId: e.target.value});
    },

// handle name change
    onNameChange: function(e){
        this.setState({name: e.target.value});
    },

// handle description change
    onDescriptionChange: function(e){
        this.setState({estatus: e.target.value});
    },

// handle save button clicked
    onSave: function(e){

        // data in the form
        var form_data={
            name: this.state.name,
            estatus: this.state.estatus,
            price: this.state.price,
            category_id: this.state.selectedCategoryId
        };

        // submit form data to api
        $.ajax({
            url: "http://localhost/api-php/product/create.php",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify(form_data),
            success : function(response) {
                // api message
                this.setState({successCreate: response['message']});
                //empty form
                this.setState({name: ""});
                this.setState({estatus: ""});
                this.setState({price: ""});
                this.setState({selectedCategoryId: -1});
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

        /*
         - tell the user if a product was created
         - tell the user if unable to create product
         - button to go back to products list
         - form to create a product
         */
        return (
        <div>
        {
            this.state.successCreate== "Product was created." ?
        <div className='alert alert-success'>
            Product was saved.
        </div>
        : null
    }

        {
            this.state.successCreate == "Unable to create product." ?
        <div className='alert alert-danger'>
            Unable to save product. Please try again.
        </div>
        : null
        }

        <a href='#'
        onClick={() => this.props.changeAppMode('read')}
        className='btn btn-primary margin-bottom-1em'>
            Ver Usuarios
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
        <select
        onChange={this.onCategoryChange}
        className='form-control'
        value={this.state.selectedCategoryId}>
        <option value="-1">Select estatus...</option>
        <option value="0">Sin Asignar</option>
        <option value="1">Borrador</option>
        <option value="2">Pdt Validar</option>
            <option value="3">Correcciones</option>
        </select>
        </td>
        </tr>

        <tr>
        <td>Price ($)</td>
        <td>
        <input
        type='number'
        step="0.01"
        className='form-control'
        value={this.state.price}
        required
        onChange={this.onPriceChange}/>
        </td>
        </tr>

        <tr>
        <td>Category</td>
        <td>
        <select
        onChange={this.onCategoryChange}
        className='form-control'
        value={this.state.selectedCategoryId}>
        <option value="-1">Select category...</option>
        {categoriesOptions}
        </select>
        </td>
        </tr>

        <tr>
        <td></td>
        <td>
        <button
        className='btn btn-primary'
        onClick={this.onSave}>Save</button>
        </td>
        </tr>
        </tbody>
        </table>
        </form>
        </div>
        );
    }
});