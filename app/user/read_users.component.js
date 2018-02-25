// component that contains all the logic and other smaller components
// that form the Read Users view
window.ReadUsersComponent = React.createClass({
    getInitialState: function() {
        return {
            users: []
        };
    },

    // on mount, fetch all users and stored them as this component's state
    componentDidMount: function() {

        this.serverRequest = $.get("http://localhost/api-php/user/read.php", function (users) {
            this.setState({
                users: users.records
            });
        }.bind(this));
    },

    // on unmount, kill user fetching in case the request is still pending
    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    // render component on the page
    render: function() {
        // list of users
        var filteredUsers = this.state.users;
        $('.page-header h1').text('Read Users');

        return (
            <div className='overflow-hidden'>
            <TopActionsComponent changeAppMode={this.props.changeAppMode} />

        <UsersTable
        users={filteredUsers}
        changeAppMode={this.props.changeAppMode} />
        </div>
        );
    }
});