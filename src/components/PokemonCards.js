import React, { Component } from 'react';
import './pokecards.css';


class PokemonCards extends Component {
    constructor(props) {
        super(props);
        this.state ={
            imgUrl: "",
            name: "",
            pokemonIndex: ""
        }
    };
    
    componentDidMount() {
        const { name, url } = this.props;
    
        const pokemonIndex = url.split('/')[url.split('/').length - 2];
        const imgUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;
    
        this.setState({ name, imgUrl, pokemonIndex });
      }

    render() {
        let name = this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1);
        return (
            <div className="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 pokecard">
                        <h5>{this.state.pokemonIndex}</h5>
                        <img className="pokeimg" src={this.state.imgUrl} />
                        <p>{name}</p>
            </div> 
        );
    }
}

export default PokemonCards;