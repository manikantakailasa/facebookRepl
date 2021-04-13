import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

    const [fromData, setfromData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = fromData;

    const onChange = e => setfromData({ ...FormData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        console.log('sucess');
    }

    return (
        <Fragment>
            <section class="container">
                <h1 class="large text-primary">Sign input</h1>
                <p class="lead"><i class="fas fa-user"></i> Sign into Your Account</p>
                <form class="form" onSubmit={e => onSubmit(e)}>
                    <div class="form-group">
                        <input type="email" placeholder="Email Address" name="email"
                            value={email}
                            onChange={e => onChange(e)} required />
                    </div>
                    <div class="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={e => onChange(e)}
                            minLength="6"
                        />
                    </div>
                    <input type="submit" class="btn btn-primary" value="Login" />
                </form>
                <p class="my-1">
                    Dont have an account? <Link to="login.html">Sign In</Link>
                </p>
            </section>
        </Fragment>
    );
}

export default Login;