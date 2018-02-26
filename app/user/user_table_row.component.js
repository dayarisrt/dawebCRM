// component that renders a single user
window.UserRow = React.createClass({
    render: function() {
        return (
            <tr>
            <td>{this.props.user.cedula}</td>
        <td>{this.props.user.nombre}</td>
        <td>{this.props.user.apellido}</td>
        <td>{this.props.user.telefono}</td>
        <td>{this.props.user.email}</td>
        <td>{this.props.user.fecha_nacimiento}</td>
        <td>{this.props.user.rol}</td>
        <td>{this.props.user.fecha_ingreso}</td>
        <td>
        <a href='#'
        onClick={() => this.props.changeAppMode('readOneUser', this.props.user.id)}
        className='btn btn-info m-r-1em'> Ver Detalle
        </a>
        <a href='#'
        onClick={() => this.props.changeAppMode('updateUser', this.props.user.id)}
        className='btn btn-primary m-r-1em'> Editar
            </a>
            <a
        onClick={() => this.props.changeAppMode('deleteUser', this.props.user.id)}
        className='btn btn-danger'> Eliminar
            </a>
            </td>
            </tr>
        );
    }
});