// component that contains the logic to read one user
window.ReadOneUserComponent = React.createClass({
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
            rol: '',
            fecha_ingreso: ''
        };
    },

// on mount, read user data and them as this component's state
    componentDidMount: function(){

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

        $('.page-header h1').text('Ver Usuario');
    },

// on unmount, kill categories fetching in case the request is still pending
    componentWillUnmount: function() {
        this.serverRequestUsr.abort();
    },

    render: function() {

        return (
            <div>
            <a href='#'
        onClick={() => this.props.changeAppMode('readUser')}
        className='btn btn-primary margin-bottom-1em'>
            Ver Usuarios
        </a>

        <form onSubmit={this.onSave}>
        <table className='table table-bordered table-hover'>
            <tbody>
            <tr>
            <td>Cedula</td>
            <td>{this.state.cedula}</td>
        </tr>

        <tr>
        <td>Nombre</td>
        <td>{this.state.nombre}</td>
        </tr>

        <tr>
        <td>Apellido</td>
        <td>{this.state.apellido}</td>
        </tr>

        <tr>
        <td>Telefono</td>
        <td>{this.state.telefono}</td>
        </tr>

        <tr>
        <td>Email</td>
        <td>{this.state.email}</td>
        </tr>

        <tr>
        <td>Fecha de Nacimiento</td>
        <td>{this.state.fecha_nacimiento}</td>
        </tr>

        <tr>
        <td>Rol</td>
        <td>{this.state.rol}</td>
        </tr>

        <tr>
        <td>Fecha de Ingreso</td>
        <td>{this.state.fecha_ingreso}</td>
        </tr>

        </tbody>
        </table>
        </form>
        </div>
        );
    }
});