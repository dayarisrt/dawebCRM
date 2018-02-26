// component that contains the logic to create a user
window.CreateUserComponent = React.createClass({
    // initialize values
    getInitialState: function() {
        return {
            cedula: '',
            nombre: '',
            apellido: '',
            telefono: '',
            email: '',
            fecha_nacimiento: '',
            rol: '',
            fecha_ingreso: '',
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

        $('.page-header h1').text('Crear Usuario');
    },

// on unmount, stop getting categories in case the request is still loading
    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

// handle cedula
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

    // handle telefono
    onTelefonoChange: function(e){
        this.setState({telefono: e.target.value});
    },

    // handle email
    onEmailChange: function(e){
        this.setState({email: e.target.value});
    },

    // handle fecha de nacimiento
    onFechaNacimientoChange: function(e){
        this.setState({fecha_nacimiento: e.target.value});
    },

    // handle rol
    onRolChange: function(e){
        this.setState({rol: e.target.value});
    },

    // handle fecha de ingreso
    onFechaIngresoChange: function(e){
        this.setState({fecha_ingreso: e.target.value});
    },

// handle save button clicked
    onSave: function(e){

        // data in the form
        var form_data={
            cedula: this.state.cedula,
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            telefono: this.state.telefono,
            email: this.state.email,
            fecha_nacimiento: this.state.fecha_nacimiento,
            rol: this.state.rol,
            fecha_ingreso: this.state.fecha_ingreso,
        };

        // submit form data to api
        $.ajax({
            url: "http://localhost/api-php/user/create.php",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify(form_data),
            success : function(response) {
                // api message
                this.setState({successCreate: response['message']});
                //empty form
                this.setState({cedula: ""});
                this.setState({nombre: ""});
                this.setState({apellido: ""});
                this.setState({telefono: ""});
                this.setState({email: ""});
                this.setState({fecha_nacimiento: ""});
                this.setState({rol: -1});
                this.setState({fecha_ingreso: ""});
            }.bind(this),
            error: function(xhr, resp, text){
                // show error to console
                console.log(xhr, resp, text);
            }
        });

        e.preventDefault();
    },

    render: function() {

        /*
         - tell the user if a user was created
         - tell the user if unable to create user
         - button to go back to users list
         - form to create a user
         */
        return (
        <div>
        {
            this.state.successCreate== "Product was created." ?
        <div className='alert alert-success'>
            Usuario registrado exitosamente
        </div>
        : null
    }

        {
            this.state.successCreate == "Unable to create product." ?
        <div className='alert alert-danger'>
            Error al registrar usuario. Por favor intente nuevamente.
        </div>
        : null
        }

        <a href='#'
        onClick={() => this.props.changeAppMode('read')}
        className='btn btn-primary margin-bottom-1em'>
            Volver al listado
        </a>

        <form onSubmit={this.onSave}>
        <table className='table table-bordered table-hover'>
            <tbody>
            <tr>
            <td>Cédula</td>
            <td>
            <input
        type='text'
        className='form-control'
        value={this.state.cedula}
        required
        onChange={this.onCedulaChange} />
        </td>
        </tr>

            <tr>
            <td>Nombre</td>
            <td>
            <input
        type='text'
        className='form-control'
        value={this.state.combre}
        required
        onChange={this.onNombreChange} />
        </td>
        </tr>

        <tr>
        <td>Apellido</td>
        <td>
        <input
        type='text'
        className='form-control'
        value={this.state.apellido}
        required
        onChange={this.onApellidoChange} />
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
        onClick={this.onSave}>Registrar</button>
        </td>
        </tr>
        </tbody>
        </table>
        </form>
        </div>
        );
    }
});