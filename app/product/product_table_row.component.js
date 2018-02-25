// component that renders a single product
window.ProductRow = React.createClass({
    render: function() {
        return (
            <tr>
            <td>{this.props.product.name}</td>
        <td>{this.props.product.estatus}</td>
        <td>{this.props.product.category_name}</td>
        <td>
        <a href='#'
        onClick={() => this.props.changeAppMode('readOne', this.props.product.id)}
        className='btn btn-info m-r-1em'> Ver Detalle
        </a>
        <a href='#'
        onClick={() => this.props.changeAppMode('update', this.props.product.id)}
        className='btn btn-primary m-r-1em'> Editar
            </a>
            <a
        onClick={() => this.props.changeAppMode('delete', this.props.product.id)}
        className='btn btn-danger'> Eliminar
            </a>
            </td>
            </tr>
        );
    }
});