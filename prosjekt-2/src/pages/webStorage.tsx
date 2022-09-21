import React from "react";

class WebStorage extends React.Component{

    state ={
        user: '',
        rememberMe: false
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>): void =>{
        const input = event.target;
        const value = input.type === 'checkbox' ? input.checked : input.value;

        this.setState({[input.name]: value});
    };

    handleFormSubmit = () => {
        const {user, rememberMe} = this.state;
        localStorage.setItem('rememberMe', rememberMe.toString());
        localStorage.setItem('user', rememberMe ? user : '');
    };

    componentDidMount(){
        const rememberMe = localStorage.getItem('rememberMe') === 'true';
        const user = rememberMe ? localStorage.getItem('user') : '';
        this.setState({user, rememberMe});
    }
    

    render()  {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <label>
                    User: <input name = "user" value={this.state.user} onChange={this.handleChange}/>
                </label>
                <label>
                    <input name= "rememberMe" checked={this.state.rememberMe} onChange={this.handleChange} type="checkbox"/> Remember Me
                </label>
                <button type = "submit">Sign In</button>
            </form>
        );
        
    }
    
};

export default WebStorage; 