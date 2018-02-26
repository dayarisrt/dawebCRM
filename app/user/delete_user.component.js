// component that contains the logic to delete a user
window.DeleteUserComponent = React.createClass({
    // on mount, change header text
    componentDidMount: function(){
        $('.page-header h1').text('Eliminar Usuario');
    },

// handle single row deletion
    onDelete: function(e){

        // user to delete
        var userId = this.props.userId;

        // submit form data to api
        $.ajax({
            url: "http://localhost/api-php/user/delete.php",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify({'id' : userId}),
            success : function(response) {
                this.props.changeAppMode('read');
            }.bind(this),
            error: function(xhr, resp, text){
                // show error in console
                console.log(xhr, resp, text);
            }
        });
    },

    render: function(){

        return (
            <div className='row'>
            <div className='col-md-3'></div>
            <div className='col-md-6'>
            <div className='panel panel-default'>
            <div className='panel-body text-align-center'>Esta seguro de eliminar a este usuario?</div>
        <div className='panel-footer clearfix'>
            <div className='text-align-center'>
            <button onClick={this.onDelete}
        className='btn btn-danger m-r-1em'>Si</button>
            <button onClick={() => this.props.changeAppMode('readUser')}
        className='btn btn-primary'>No</button>
            </div>
            </div>
            </div>
            </div>
            <div className='col-md-3'></div>
            </div>
        );
    }

});