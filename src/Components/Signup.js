import React, { Component } from 'react'
import './CSS/login.css'
import client from '../api/client'
import Context from '../Context'
import { Link } from "react-router-dom";
export class Signup extends Component {
    state = {
        name:"",
        email:"",
        username:"",
        password:"",
        error:"",
        success:""
    }
    handleSubmit = (e)=>{
        e.preventDefault()

        const { name,email,password,username } = this.state
        client.post("/auth/signup",{
            name,
            email,
            password,
            username
        })
        .then(res=>{
            if(res.error){
                this.setState({error:res.error})
            }
            else{
                this.setState({success:res.message})

            }
        })
    }
    render() {
        return (
            <div className="login">
                <form onSubmit={this.handleSubmit}>
                    <h1>Signup</h1>
                    <p style={{ color: "red" }}>{this.state.error}</p>
                    <p style={{ color: "green" }}>{this.state.success}</p>
                    <input
                        onChange={(e) =>
                            this.setState({ name: e.target.value })
                        }
                        type="text"
                        name="name"
                        placeholder="name"
                    />
                    <input
                        onChange={(e) =>
                            this.setState({ username: e.target.value })
                        }
                        type="text"
                        name="username"
                        placeholder="username"
                    />
                    <input
                        onChange={(e) =>
                            this.setState({ email: e.target.value })
                        }
                        type="email"
                        name="email"
                        placeholder="email"
                    />
                    <input
                        onChange={(e) =>
                            this.setState({ password: e.target.value })
                        }
                        type="password"
                        name="pwd"
                        placeholder="password"
                    />
                    <input type="submit" value="signup" />
                    <p>
                            If already registered then <Link to="/login">Login</Link>
                        </p>
                </form>
            </div>
        );
    }
}

export default Signup