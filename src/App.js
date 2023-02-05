import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      selectCollor: 'black',
      collorForSelect: [],
      collumns: 25,
      numberInput: '',
      err: '',
      tableWidth: '13.2'
    };
  }
  componentDidMount() {
    const collors = [];
    for (let i = 0; i < 4; i += 1) {
      collors.push(this.palletColorsRandond());
    }
    this.setState({ collorForSelect: collors })
  }

  palletColorsRandond = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  };

  handleInputNumber = ({ target }) => {
    this.setState({ numberInput: target.value });
  }

  handleSubmit = (event) => {
    const { numberInput } = this.state;
    const result = numberInput * numberInput;
    const tableWidth = Number(numberInput) * 2.64;
    if (numberInput > 15) {
      return this.setState(
        {
        err: 'Nosso limite de tamanho é de 25 por 25',
        collumns: 15 * 15,
        tableWidth: 15 * 2.64,
      })
    } if (numberInput < 5) {
      return this.setState(
        {
        err: 'Quantidade minima no tamanho da tabela é de 5 por 5',
        collumns: 5 * 5,
        tableWidth: 5 * 2.64,
      }
        )
    } else {
      return this.setState({collumns: result, tableWidth})}
    }

  handleCollorSelected = ({ target: { style: { backgroundColor } } }) => {
    this.setState({
      selectCollor: backgroundColor,
    });
  };

  handleColor = (event) => {
    const { selectCollor } = this.state;
    // event = selectCollor;
    console.log(event.target.style.backgroundColor = selectCollor);
  };

  createDivs = (numberOfDivs) => {
    let divs = [];
  
    for (let i = 0; i < numberOfDivs; i++) {
      divs.push(
        <div
          id={`div ${ i }`}
          key={i}
          onClick={ this.handleColor }
          style={
            {
            backgroundColor: 'white',
            border: '1px solid',
            width: '40px',
            height: '40px',
          }
          }
        >
          {''}
        </div>
        );
    }
  
    return divs;
  }

  render() {
    const { collorForSelect, collumns, numberInput, tableWidth } = this.state;
    return (
      <main className="fatherContainer">
        <h1 id="title">Paleta de Cores</h1>
        <input
          type="number"
          min="5"
          max="20"
          onChange={ this.handleInputNumber }
          value={ numberInput }
        />
        <button type="button" onClick={ () => this.handleSubmit() }>Enter</button>
        <div
          className="father"
        >
          {collorForSelect.map((collor, index) => (
            <>
              <div
                key={index} className="palletCollors"
                style={{ backgroundColor: collor }}
                onClick={this.handleCollorSelected}
              />
            </>
          ))}
        </div>
        <div
          id='palleta'
          style={
            {
              backgroundColor: 'black',
              width: `${tableWidth}em`,
              margin: '0px',
              display: 'flex',
              flexWrap: 'wrap'
            }
          }
        >
          {this.createDivs(collumns)}
        </div>
      </main>
    )
  }
}

export default App;
