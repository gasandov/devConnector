import React, { Component } from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { registeruser } from '../../actions/authActions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
 
  componentWillReceiveProps(nextProps) { // Check if reducer has any errors
    if (nextProps.errors) { // If it does assign reducer errors into state errors
      this.setState({ errors: nextProps.errors })
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };

    this.props.registeruser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state; // equal to const errors = this.state.errors;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input 
                    type="text" 
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.name
                    })} 
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange} 
                    />
                    {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                </div>
                <div className="form-group">
                  <input 
                    type="email" 
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.email
                    })} 
                    placeholder="Email Address"
                    name="email" 
                    value={this.state.email}
                    onChange={this.onChange}  
                    />
                  <small className="form-text text-muted">This site uses Gravatar so if you want a
                  profile image, use Gravatar email</small>
                </div>
                <div className="form-group">
                  <input 
                    type="password" 
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.password
                    })} 
                    placeholder="Password"
                    name="password" 
                    value={this.state.password}
                    onChange={this.onChange} 
                    />
                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  registeruser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registeruser })(withRouter(Register));