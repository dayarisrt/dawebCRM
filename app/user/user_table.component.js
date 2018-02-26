// component for the whole users table
window.UsersTable = React.createClass({
    render: function() {

        var rows = this.props.users
            .map(function(user, i) {
                return (
                    <UserRow
                key={i}
                user={user}
                changeAppMode={this.props.changeAppMode} />
                );
            }.bind(this));

        return(
                !rows.length
                    ? <div className='alert alert-danger'>No users found.</div>
        :
        <table className='table table-bordered table-hover'>
            <thead>
            <tr>
            <th>Cedula</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Telefono</th>
            <th>Email</th>
            <th>Fecha de Nacimiento</th>
            <th>Tipo de Usuario</th>
            <th>Fecha de Ingreso</th>
            <th>Acción</th>
            </tr>
            </thead>
            <tbody>
            {rows}
            </tbody>
            </table>
        );
    }
});