// component for the whole products table
window.ProductsTable = React.createClass({
    render: function() {

        var rows = this.props.products
            .map(function(product, i) {
                return (
                    <ProductRow
                key={i}
                product={product}
                changeAppMode={this.props.changeAppMode} />
                );
            }.bind(this));

        return(
                !rows.length
                    ? <div className='alert alert-danger'>No hay productos registrados.</div>
        :
        <table className='table table-bordered table-hover'>
            <thead>
            <tr>
            <th>Articulo</th>
            <th>Estatus</th>
            <th>Categoría</th>
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