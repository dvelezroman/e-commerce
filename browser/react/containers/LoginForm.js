import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {withRouter} from 'react-router'
import TextField from "@material-ui/core/TextField";
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import axios from 'axios'

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  },
  button: {
    backgroundColor: '#6eb4ea',
    color: 'white',
    '&:hover': {
      color: 'white'
    }
  },
  title:{
    textAlign: 'center',
    typography:{
      fontFamily: 'Roboto'
    }
  }
});

class TextFields extends React.Component {
  constructor(){
    super();
    this.state = {
      mail: '',
      password:'',
      emailCheck: true,
      gralCheck: false
    };
    this.handleSubmit = this.handleSubmit.bind(this) 
  }
  
  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  
  handleChange = name => event => {
    const aux = this.state
    aux[name] = event.target.value
    var echeck = aux.emailCheck
    if (name === 'mail') {
      echeck = this.validateEmail(event.target.value)
    }
    var check = (aux.mail.length && aux.password.length && echeck) ? true : false
    this.setState({
      [name]: event.target.value,
      gralCheck: check,
      emailCheck: echeck
    });
  };

  handleSubmit(evt){
    evt.preventDefault();
    const usuario = {
      username: this.state.mail.toLowerCase(),
      password: this.state.password
    }
    axios.post('/api/login',usuario)
    .then(res => res.data)
    // .then(login => {console.log(login);return login})
    .then(data => {
      if(data.success) this.props.history.push(`/accounts/user/${data.user.id}`)
      console.log(data)  
    })
    .catch(err => err)
  }

  render() {
    const { classes } = this.props;
    const {mail,password,emailCheck,gralCheck} = this.state

    return (
      <div> <h1 className={classes.title}>Login</h1>
        <form className={classes.container} autoComplete="off">
          <Grid container spacing={16}>
            <Grid item md={3} xs={1}>
            </Grid>
            <Grid item md={6} xs={10}>
              <TextField
                error={!emailCheck}
                required
                id="mail"
                label="E-Mail"
                className={classes.textField}
                value={mail}
                type="email"
                onChange={this.handleChange("mail")}
                margin="normal"
              />
              <TextField
                required
                id="password-input"
                label="Password"
                className={classes.textField}
                value={password}
                type="password"
                onChange={this.handleChange('password')}
                autoComplete="current-password"
                margin="normal"
              />
            <Button
              variant="contained"
              size="small"
              className={classes.button}
              onClick={this.handleSubmit}
              disabled={!gralCheck}>Iniciar Sesión</Button>
            </Grid>
            <Grid item md={3} xs={1}>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(TextFields));