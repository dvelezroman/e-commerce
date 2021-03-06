import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {withRouter} from 'react-router'
import TextField from "@material-ui/core/TextField";
import { Button, InputAdornment, Input } from '@material-ui/core';
import axios from 'axios';
import validUrl from 'valid-url';
import CatCreateProduct from "./CatCreateProduct";



const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: 'column'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400
  },
  numInputPrecio: {
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 150
  },
  numInputDisp: {
    marginTop: 35,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 150
  },
  menu: {
    width: 200
  },
  button: {
    backgroundColor: '#6eb4ea',
    color: 'white',
    '&:hover': {
      color: 'white'
    },
    width: 100,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
  
});

class TextFields extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      nombre: '',
      descripcion: '',
      precio: 0,
      disponibilidad: 0,
      imagenes: [],
      categorias: '',
      urlCheck: true,
      gralCheck: false
    };
    this.handleSubmit = this.handleSubmit.bind(this) 
}

validateUrl(str) {
  if (validUrl.isUri(str)){
    return true
} else {
    return false
}
}

handleChange = name => event => {
    const aux = this.state
    aux[name] = [event] || event.target.value
    var ucheck = aux.urlCheck
    if(name === 'imagenes') {
      ucheck = this.validateUrl(event.target.value)
    }
    var check = (aux.nombre.length && aux.descripcion.length && aux.precio.length && aux.disponibilidad.length && aux.imagenes.length && ucheck && aux.categorias.length) ? true : false
    if(name === 'categorias') {
      return this.setState({
        categorias: event,
        gralCheck: check,
        urlCheck: ucheck 
      }
    )
    }
    this.setState({
        [name]: event.target.value,
        gralCheck: check,
        urlCheck: ucheck
      });
    };
    
    handleSubmit(evt){
      evt.preventDefault();
      const product = {
            nombre: this.state.nombre,
            descripcion: this.state.descripcion,
            precio: this.state.precio,
            disponibilidad: this.state.disponibilidad,
            imagens: [{ruta:this.state.imagenes}],
            categorias: this.state.categorias.split(',')
        }
      axios.post('/api/products/new', product)
      .then(product => {this.props.history.push(`/products/single/${product.data.id}`)})
    }
    
    
    render() {  
      const { classes, categList } = this.props;
      const { nombre, descripcion, precio, disponibilidad, imagenes, gralCheck, urlCheck } = this.state
      return (
        <div> <h1 className={classes.title}>Crear Producto</h1>
        <form className={classes.container} noValidate autoComplete="off">
              <TextField
                required
                id="nombre"
                label="Nombre"
                className={classes.textField}
                value={nombre}
                onChange={this.handleChange("nombre")}
                margin="normal"
                />
              <TextField
                required
                multiline
                rows='4'
                id="descripcion"
                label="Descripción"
                className={classes.textField}
                value={descripcion}
                onChange={this.handleChange("descripcion")}
                margin="normal"
              />
                <TextField
                  error={!urlCheck}
                  required
                  id="imagenes"
                  label="Imágenes"
                  className={classes.textField}
                  value={imagenes}
                  type="url"
                  onChange={this.handleChange('imagenes')}
                  margin="normal"
                />
                  <CatCreateProduct onCatChange={this.handleChange('categorias')} categs={categList} selectedCats={this.state.categorias}/>
                  <TextField
                    required
                    id="disponibilidad"
                    label="Disponibilidad"
                    className={classes.numInputDisp}
                    value={disponibilidad}
                    type="number"
                    onChange={this.handleChange("disponibilidad")}
                    margin="normal"
                  />
                  <Input
                    required
                    id="precio"
                    value={precio}
                    onChange={this.handleChange("precio")}
                    type="number"
                    className={classes.numInputPrecio}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                <br/>
                <br/>
              <Button 
                variant="contained" 
                size="small" 
                className={classes.button} 
                onClick={this.handleSubmit}
                disabled={!gralCheck}>Crear</Button>
        </form>
      </div>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(TextFields));