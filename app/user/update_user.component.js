// component that contains the logic to update a product
window.UpdateUserComponent = React.createClass({
    getInitialState: function() {
        // Get this product fields from the data attributes we set on the
        // #content div, using jQuery
        return {
            id: 0,
            cedula: '',
            nombre: '',
            apellido: '',
            telefono: '',
            email: '',
            fecha_nacimiento: '',
            rol: -1,
            fecha_nacimiento: '',
            successUpdate: null
        };
    },

// on mount, fetch all categories and one product data to stored them as this component's state
    componentDidMount: function(){

        // read one user data
        var userId = this.props.userId;
        this.serverRequestUsr = $.get("http://localhost/api-php/user/read_one.php?id=" + userId,
            function (user) {
                this.setState({id: user.id});
                this.setState({cedula: user.cedula});
                this.setState({nombre: user.nombre});
                this.setState({apellido: user.apellido});
                this.setState({telefono: user.telefono});
                this.setState({email: user.email});
                this.setState({fecha_nacimiento: user.fecha_nacimiento});
                this.setState({rol: user.rol});
                this.setState({fecha_ingreso: user.fecha_ingreso});
            }.bind(this));

        $('.page-header h1').text('Modificar Usuario');
    },

// on unmount, kill categories fetching in case the request is still pending
    componentWillUnmount: function() {
        this.serverRequestProd.abort();
    },

// handle cedula change
    onCedulaChange: function(e){
        this.setState({cedula: e.target.value});
    },

// handle nombre change
    onNombreChange: function(e){
        this.setState({nombre: e.target.value});
    },

// handle apellido change
    onApellidoChange: function(e){
        this.setState({apellido: e.target.value});
    },

    // handle telefono change
    onTelefonoChange: function(e){
        this.setState({telefono: e.target.value});
    },

    // handle email change
    onEmailChange: function(e){
        this.setState({email: e.target.value});
    },

    // handle fecha de nacimiento change
    onFechaNacimientoChange: function(e){
        this.setState({fecha_nacimiento: e.target.value});
    },

    // handle rol change
    onRolChange: function(e){
        this.setState({rol: e.target.value});
    },

    // handle fecha de ingreso change
    onFechaIngresoChange: function(e){
        this.setState({fecha_ingreso: e.target.value});
    },

// handle save changes button clicked
    onSave: function(e){

        // data in the form
        var form_data={
            id: this.state.id,
            cedula: this.state.cedula,
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            telefono: this.state.telefono,
            fecha_nacimiento: this.state.fecha_nacimiento,
            rol: this.state.rol,
            fecha_ingreso: this.state.fecha_ingreso,
        };

        // submit form data to api
        $.ajax({
            url: "http://localhost/api-php/user/update.php",
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

        return (
        <div>
        {
            this.state.successUpdate == "Product was updated." ?
        <div className='alert alert-success'>
            Usuario creado exitosamenete.
        </div>
        : null
    }

        {
            this.state.successUpdate == "Unable to update product." ?
        <div className='alert alert-danger'>
            No se pudo modificar el usuario. Por favor intente nuevamente.
        </div>
        : null
        }

        <a href='#'
        onClick={() => this.props.changeAppMode('readUser')}
        className='btn btn-primary margin-bottom-1em'>
            Ver Usuarios
        </a>

        <form onSubmit={this.onSave}>
        <table className='table table-bordered table-hover'>
            <tbody>
            <tr>
            <td>Nombre</td>
            <td>
            <input
        type='text'
        className='form-control'
        value={this.state.nombre}
        required
        onChange={this.onNombreChange} />
        </td>
        </tr>

        <tr>
        <td>Apellido</td>
        <td>
        <textarea
        type='text'
        className='form-control'
        required
        value={this.state.apellido}
        onChange={this.onApellidoChange}>
        </textarea>
        </td>
        </tr>

        <tr>
        <td>Teléfono</td>
        <td>
        <input
        type='text'
        className='form-control'
        value={this.state.telefono}
        required
        onChange={this.onTelefonoChange} />
        </td>
        </tr>

        <tr>
        <td>Email</td>
        <td>
        <input
        type='text'
        className='form-control'
        value={this.state.email}
        required
        onChange={this.onEmailChange} />
        </td>
        </tr>

        <tr>
        <td>Fecha de Nacimiento</td>
        <td>
        <input
        type='text'
        className='form-control'
        value={this.state.fecha_nacimiento}
        onChange={this.onFechaNacimientoChange} />
        </td>
        </tr>

        <tr>
        <td>Rol</td>
        <td>
        <select
        onChange={this.onRolChange}
        className='form-control'
        value={this.state.rol}>
            <option value="-1">Seleccione un Rol...</option>
            <option value="-1">Seleccione Rol...</option>
            <option value="0">Administrador</option>
            <option value="1">Redactor</option>
        </select>
        </td>
        </tr>

        <tr>
        <td>Fecha de Ingreso</td>
        <td>
        <input
        type='text'
        className='form-control'
        value={this.state.fecha_ingreso}
        required
        onChange={this.onFechaIngresoChange} />
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