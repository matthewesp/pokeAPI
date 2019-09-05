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
            search: '',
            region: 'Kanto'
        }   
        this.filterPokemon = this.filterPokemon.bind(this);
        this.kanto = this.kanto.bind(this);
        this.johto = this.johto.bind(this);
        this.hoenn = this.hoenn.bind(this);
        this.sinnoh = this.sinnoh.bind(this);
    }

    async componentWillUpdate() {
        const res = await axios.get(this.state.url);
        this.setState({ 
            pokemon: res.data['results']
        });
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

    kanto() {
        this.setState({
            region: "Kanto",
            url: "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151",
        })
    }

    johto() {
        this.setState({
            region: "Johto",
            url: "https://pokeapi.co/api/v2/pokemon/?offset=151&limit=100",
        })
    }
    
    hoenn() {
        this.setState({
            region: "Hoenn",
            url: "https://pokeapi.co/api/v2/pokemon/?offset=251&limit=135",
        })
    }

    sinnoh() {
        this.setState({
            region: "Sinnoh",
            url: "https://pokeapi.co/api/v2/pokemon/?offset=386&limit=107",
        })
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
                <Navbar.Brand href="#home">{this.state.region} PokeAPI</Navbar.Brand>
                    <Form inline>
                    <FormControl type="text" placeholder="Search" value={this.state.search} onChange={this.filterPokemon} className="mr-sm-2" />
                    <Button className="rpad" varient="secondary" onClick={this.kanto}>Kanto</Button>
                    <Button className="rpad" varient="secondary" onClick={this.johto}>Johto</Button>
                    <Button className="rpad" varient="secondary" onClick={this.hoenn}>Hoenn</Button>
                    <Button className="rpad" varient="secondary" onClick={this.sinnoh}>Sinnoh</Button>
                    </Form>
                </Navbar>
            {loader}
            </div>
        );
    }
}

export default Pokemon;