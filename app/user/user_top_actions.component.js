// component that contains the functionalities that appear on top of
// the users table: create user
window.UserTopActionsComponent = React.createClass({
    render: function(){
        return (
            <div>
            <a href='#'
        onClick={() => this.props.changeAppMode('createUser')}
        className='btn btn-primary margin-bottom-1em'> Crear Usuario
        </a>
        </div>
        );
    }
});