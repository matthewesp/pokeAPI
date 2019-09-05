import React, { Component } from 'react';
import axios from 'axios';
import PokemonCards from './PokemonCards.js';
import {Navbar, Nav, Form, FormControl, Button} from "react-bootstrap";
import './pokemon.css';

class Pokemon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151",
            pokemon: '',
            loading: false,
            search: ''
        }   
        this.filterPokemon = this.filterPokemon.bind(this);
    }

    componentWillUpdate() {
        console.log(this.state.search);
    }
    async componentDidMount() {
        const res = await axios.get(this.state.url);
        this.setState({ 
            pokemon: res.data['results']
        });
        
      }
    
    filterPokemon(event) {
        this.setState({
            search: event.target.value,
        });
    }


    render() {
        const searching = this.state.search;
        const monsters = !searching ? this.state.pokemon : (this.state.pokemon.filter(X => X.name.indexOf(searching.toLowerCase()) != -1 ));
        const loader = this.state.pokemon ? (
        <div className="row mfix">
        {monsters.map(Pokemon => 
            (<PokemonCards 
            name={Pokemon.name} 
            key={Pokemon.name}
            url={Pokemon.url}
            />))} 
        </div>)
        : (
        <p>Loading</p>
        );
        return (
            <div>

                <Navbar className="widthfix" sticky="top" bg="danger" variant="dark">
                <Navbar.Brand href="#home">Kanto PokeAPI</Navbar.Brand>
                    <Form inline>
                    <FormControl type="text" placeholder="Search" value={this.state.search} onChange={this.filterPokemon} className="mr-sm-2" />
                    <h3>{searching}</h3>
                    </Form>
                </Navbar>
            {loader}
            </div>
        );
    }
}

export default Pokemon;