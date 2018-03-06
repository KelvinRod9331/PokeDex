import p5 from "p5";
import "p5/lib/addons/p5.sound";
import "p5/lib/addons/p5.speech";
import React from "react";
import Buttons from "./Buttons";
import PokemonAPI from "./PokemonAPI";
import Loading from "./Loading";

class Pokemon extends React.Component {
  constructor() {
    super();
    this.btnNames = [
      "name",
      "type",
      "evolutions",
      "move",
      "habitat",
      "size",
      "speech",
      "capture",
      "inventory",
      "help"
    ];
    this.state = {
      name: [],
      pokemon: "",
      move: "",
      id: "",
      PokeChain: "",
      pokeFound: false,
      clicks: 1,
      pokeball: [],
      description: "",
      target: "",
      fetch: false,
      activateVoice: false,
      userSpeech: "",
      displayInfo: "",
      buttonClicked: false,
      displayHelp: "",
      display_Inventory: "",
      value: "",
      recorded: false
    };
  }

  getAllPokemon = () => {
    PokemonAPI.getAllPokemon().then(response => {
      let pokemonNames = response.data.results.map(pokemon => {
        return (
          <p>
            <button
              id="pokemon_btns"
              name={pokemon.name}
              onClick={e => {
                this.getPokemon(e.target.name);
              }}
            >
              {pokemon.name}
            </button>
          </p>
        );
      });

      this.setState({
        name: pokemonNames
      });
    });
  };

  getPokemon = name => {
    if (name) {
      PokemonAPI.getPokemonInfo(name.toLowerCase()).then(response => {
        let id = response.data.id;
        this.setState({
          id: id
        });
        let pic = response.data.sprites.front_default;
        let height = response.data.height;
        let weight = response.data.weight;
        let types = response.data.types.map(types => {
          return types.type.name.toUpperCase() + " ";
        });

        let moves = [];
        for (var x = 0; x < 4; x++) {
          let randMove = Math.floor(Math.random() * response.data.moves.length);
          moves.push(response.data.moves[randMove].move.name);
        }

        PokemonAPI.getPokemonSpecies(this.state.id).then(response => {
          let description;
          response.data.flavor_text_entries.forEach(el => {
            if (el.language.name === "en") {
              description = el.flavor_text;
            }
          });

          this.setState({
            pokemon: response.data.name.toUpperCase(),
            move: moves.join(", ").toUpperCase(),
            picture: pic,
            height: height,
            weight: weight,
            types: types,
            habitat: response.data.habitat
              ? response.data.habitat.name.toUpperCase()
              : "UNKNOWN",
            description: description,
            activateVoice: true
          });
        });

        PokemonAPI.getPokemonEvolution(this.state.id).then(response => {
          this.setState({
            PokeChain: response.data.chain.evolves_to[0]
              ? response.data.chain.evolves_to[0].species.name.toUpperCase()
              : "UNKNOWN"
          });
        });
      });
    }
    this.setState({
      pokeFound: true
    });
  };

  componentDidMount() {
    this.getAllPokemon();
  }

  handleSpeech = () => {
    var voice = new p5.Speech();
    voice.setPitch(1.4);
    voice.speak(this.state.pokemon.toLowerCase());
    voice.speak(this.state.description.toLowerCase());
    this.setState({
      activateVoice: false
    });
  };

  handleBackButton = () => {
    this.setState({
      pokeFound: false,
      pokemon: "",
      move: "",
      picture: "",
      height: "",
      weight: "",
      types: "",
      habitat: "",
      PokeChain: "",
      description: "",
      buttonClicked: false
    });
  };

  handleNextPrev = e => {
    const button = e.target.name;
    let { id } = this.state;
    if (button === "Next" && this.state.pokeFound) {
      this.setState({
        buttonClicked: false,
        id: id++,
        pokeFound: false,
        pokemon: "",
        move: "",
        picture: "",
        height: "",
        weight: "",
        types: "",
        habitat: "",
        PokeChain: "",
        description: ""
      });
      this.getPokemon(id);
    } else if (button === "Previous" && this.state.pokeFound) {
      this.setState({
        buttonClicked: false,
        id: id--,
        pokeFound: false,
        pokemon: "",
        move: "",
        picture: "",
        height: "",
        weight: "",
        types: "",
        habitat: "",
        PokeChain: "",
        description: ""
      });

      if (id > 0) {
        this.getPokemon(id);
      } else {
        this.setState({
          id: 1
        });
      }
    }
  };

  handleInfoBtns = e => {
    let value = e.target.name;
    this.setState({
      value: value
    });
    const { clicks } = this.state;
    this.setState({
      button: value
    });

    if (value === "move" && this.state.pokeFound) {
      this.setState({
        displayInfo: (
          <div id="move_container">
            <p className="pokeText">{this.state.move}</p>
          </div>
        ),
        buttonClicked: true
      });
    } else if (value === "size" && this.state.pokeFound) {
      this.setState({
        displayInfo: (
          <div>
            <p className="pokeText">
              Height: {this.state.height} <br />
              Weight: {this.state.weight}
            </p>
          </div>
        ),
        buttonClicked: true
      });
    } else if (value === "type" && this.state.pokeFound) {
      this.setState({
        displayInfo: (
          <div>
            {" "}
            <p className="pokeText">
              Types:<br />
              {this.state.types}
            </p>
          </div>
        ),
        buttonClicked: true
      });
    } else if (value === "habitat" && this.state.pokeFound) {
      this.setState({
        displayInfo: (
          <div id="habitat_container">
            <p className="pokeText">
              Habitat:<br />
              {this.state.habitat}
            </p>
          </div>
        ),
        buttonClicked: true
      });
    } else if (value === "evolutions" && this.state.pokeFound) {
      this.setState({
        displayInfo: (
          <div id="evolution_container">
            {" "}
            <p className="pokeText">
              Evolution: <br />
              {this.state.PokeChain}
            </p>{" "}
          </div>
        ),
        buttonClicked: true
      });
    } else if (value === "name" && this.state.pokeFound) {
      this.setState({
        displayInfo: (
          <div id="name">
            {" "}
            <p className="pokeText">{this.state.pokemon}</p>{" "}
          </div>
        ),
        buttonClicked: true
      });
    } else if (value === "habitat" && this.state.pokeFound) {
      this.setState({
        displayInfo: (
          <div id="habitat_container">
            <p className="pokeText">
              Habitat:<br />
              {this.state.habitat}
            </p>
          </div>
        ),
        buttonClicked: true
      });
    } else if (value === "speech" && this.state.pokeFound) {
      this.handleSpeech();
      this.setState({
        displayInfo: (
          <div id="speak">
            <p>{this.state.description}</p>
          </div>
        ),
        buttonClicked: true
      });
    } else if (value === "capture" && this.state.pokeFound) {
      const { pokemon, pokeball } = this.state;
      if (pokeball.includes(pokemon)) {
        this.setState({
          displayInfo: (
            <div id="pokeCaptured">
              <p>{pokemon} Has Been Captured Already!</p>
            </div>
          )
        });
      } else {
        this.setState({
          pokeball: [...pokeball, pokemon],
          displayInfo: (
            <div id="pokeCaptured">
              <p>{pokemon} Captured!</p>
            </div>
          ),
          buttonClicked: true
        });
      }
    } else if (value === "inventory") {
      const { pokeball } = this.state;

      if (pokeball.length === 0) {
        this.setState({
          display_Inventory: (
            <div id="Inventory">
              <p>Inventory Is Empty Try Capturing A Pokemon</p>
            </div>
          )
        });
      } else {
        this.setState({
          display_Inventory: (
            <div id="Inventory">
              {pokeball.map(ele => <p id="pokeCaptured">{ele}</p>)}
            </div>
          ),
          displayInfo: (
            <div id="Inventory">
              {pokeball.map(ele => <p id="pokeCaptured">{ele}</p>)}
            </div>
          ),
          buttonClicked: true
        });
      }
    } else if (value === "help") {
      if (clicks === 1) {
        this.setState({
          clicks: clicks + 1,
          displayHelp: (
            <div id="helpDisplay">
              <p>
                To Search for a Pokemon Click on the Search Button and Input or
                Say(Using Voice Recongnition) for The Pokemon You're Searching
                For
              </p>
              <p>
                To Look At All You're Captured Pokemon Click On The Inventory
                Button
              </p>
              <p>
                Click On The The Speech Button for Text-To-Voice or
                Voice-To-Text
              </p>
            </div>
          )
        });
      } else if (clicks > 1) {
        this.setState({
          clicks: 1,
          displayHelp: <div id="helpDisplay" />
        });
      }
    }

    console.log(e.target.name, this.state.pokeball);
  };

  handleSpeechRec = () => {
    const speechRec = new p5.SpeechRec("en-US");

    speechRec.start();

    const gotSpeech = () => {
      this.setState({
        userSpeech: speechRec.resultString,
        recorded: true
      });
    };

    speechRec.onResult = gotSpeech;
  };

  handleCommands = () => {
    var voice = new p5.Speech();
    const {
      userSpeech,
      recorded,
      pokeFound,
      pokeball
    } = this.state;
    voice.setPitch(1.4);

    const searchObj = userSpeech
      .split(" ")
      .slice(-1)
      .join("");
    const command = userSpeech
      .split(" ")
      .slice(0, -1)
      .join(" ");

      console.log(command)

    if (recorded && command === "Pokedex search for") {
      voice.speak(`Searching for ${searchObj}`);
      this.getPokemon(searchObj);
      this.setState({
        recorded: false
      });
      console.log("Pokemon Found", pokeFound)
    } else if (command === "Pokedex capture") {
      if (pokeball.includes(searchObj.toUpperCase())) {
        voice.speak(`${searchObj} is already captured check inventory`);
        this.setState({
          recorded: false
        });
      } else {
        this.setState({
          pokeball: [...pokeball, searchObj.toUpperCase()],
          recorded: false
        });
        voice.speak(`${searchObj} has been captured`);
      }
    }else{
      voice.setRate(0.9,1)
      voice.speak("i'm sorry that wasn't a valid command,  try a command like pokedex search for,  to search for a pokemon or,  pokedex capture to capture a pokemon");
      this.setState({
        recorded: false
      });
    }
    
  };

  render() {
    const {
      userSpeech,
      displayInfo,
      buttonClicked,
      displayHelp,
      display_Inventory,
      value,
      recorded,
      activateVoice,
      name
    } = this.state;

    const displayPokemon = this.state.pokeFound ? (
      <div id="pokemon_container">
        <div id="pic_container">
          {this.state.picture && name.length ? (
            <img id="pokePic" src={this.state.picture} width={"200px"} alt="" />
          ) : (
            Loading()
          )}
        </div>
      </div>
    ) : (
      <div>{this.state.name}</div>
    );

    if (recorded) {
      this.handleCommands();
    }

    console.log("Speech:", userSpeech);
    return (
      <div id="body">
        <img
          id="image"
          src="https://cdn-images-1.medium.com/max/1600/1*HmJQ3auSA_TivUEALJNq1Q.png"
          width="900px"
          alt=""
        />
        <div id="container">{displayPokemon}</div>
        {activateVoice ? this.handleSpeech() : ""}
        <div>
          <div className="info">
            {buttonClicked && this.state.pokeFound ? (
              displayInfo
            ) : this.state.pokeFound ? (
              <p className="pokeText">{this.state.pokemon}</p>
            ) : value === "help" ? (
              displayHelp
            ) : value === "inventory" && buttonClicked ? (
              display_Inventory
            ) : value === "speechRec" && buttonClicked ? (
              displayInfo
            ) : (
              ""
            )}
          </div>
          <Buttons
            buttonArr={this.btnNames}
            handleInfo={this.handleInfoBtns}
            handleNextPrev={this.handleNextPrev}
          />
        </div>
        <div className="backBtn">
          <button id="backBtn" onClick={this.handleBackButton}>
            Back
          </button>
        </div>
        <div className="recContainer">
          <button id="record" name="speechRec" onClick={this.handleSpeechRec} />
        </div>
      </div>
    );
  }
}

export default Pokemon;
