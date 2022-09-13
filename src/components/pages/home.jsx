import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import ReactDOM from 'react-dom';
import { capitalizeFirstLetter } from '../helpers/custom';

const SHAPES = {
    all: true,
    oval: {
        danger: 'shape-oval bg-danger',
        primary: 'shape-oval bg-primary',
        success: 'shape-oval bg-success',
        warning: 'shape-oval bg-warning',
        info: 'shape-oval bg-info',
        secondary: 'shape-oval bg-secondary'
    },
    circle: {
        danger: 'shape-circle bg-danger',
        primary: 'shape-circle bg-primary',
        success: 'shape-circle bg-success',
        warning: 'shape-circle bg-warning',
        info: 'shape-circle bg-info',
        secondary: 'shape-circle bg-secondary'
    },
    triangle: {
        danger: 'shape-triangle-danger',
        primary: 'shape-triangle-primary',
        success: 'shape-triangle-success',
        warning: 'shape-triangle-warning',
        info: 'shape-triangle-info',
        secondary: 'shape-triangle-secondary'
    },
    square: {
        danger: 'shape-square bg-danger',
        primary: 'shape-square bg-primary',
        success: 'shape-square bg-success',
        warning: 'shape-square bg-warning',
        info: 'shape-square bg-info',
        secondary: 'shape-square bg-secondary'
    },
    rectangle: {
        danger: 'shape-rectangle bg-danger',
        primary: 'shape-rectangle bg-primary',
        success: 'shape-rectangle bg-success',
        warning: 'shape-rectangle bg-warning',
        info: 'shape-rectangle bg-info',
        secondary: 'shape-rectangle bg-secondary'
    },
    parallelogram: {
        danger: 'shape-parallelogram bg-danger',
        primary: 'shape-parallelogram bg-primary',
        success: 'shape-parallelogram bg-success',
        warning: 'shape-parallelogram bg-warning',
        info: 'shape-parallelogram bg-info',
        secondary: 'shape-parallelogram bg-secondary'
    }
};

const COLORS = {
    all: 'text-dark',
    danger: 'text-danger',
    primary: 'text-primary',
    success: 'text-success',
    warning: 'text-warning',
    info: 'text-info',
    secondary: 'text-secondary'
};

class Home extends Component {
  constructor() {
    super();

    this.state = {
      shape: 'all',
      color: 'danger'
    }
  }

  componentDidMount() {
    this.buttonsForshapes();
    this.buttonsForColors();
    this.filterCards();
  }

  componentWillUnmount() {
  }

  buttonsForshapes() {
    const shapesFilter = document.getElementById('shapes-filter');
    let shapesFilterHTML = [];

    for(let shape in SHAPES) {
        shapesFilterHTML.push(
          <div className="p-2 me-1" key={shape + '-shape'}>
            <button
              type="button"
              data-id={shape + "-shape"}
              className={shape === this.state.shape ?
                'shape-btn btn btn-outline-secondary rounded-pill bg-active' :
                'shape-btn btn btn-outline-secondary rounded-pill'}
              onClick={this.shapeOnClick}
            >
              {capitalizeFirstLetter(shape)}
            </button>
          </div>);
    }

    ReactDOM.render(
        shapesFilterHTML,
        shapesFilter,
    )
  }

  buttonsForColors() {
    let colorFilter = document.getElementById('colors-filter');
    let colorFilterHTML = [];

    for(let color in COLORS) {
        colorFilterHTML.push(
            <div className="p-2 me-1" key={color + '-color'}>
                <button
                  data-id={color + "-color"}
                  className={color === this.state.color ?
                    COLORS[color] + ' color-btn btn btn-link bg-active' :
                    COLORS[color] + ' color-btn btn btn-link'}
                  onClick={this.colorOnClick}
                >
                  {capitalizeFirstLetter(color)}
                </button>
            </div>);
    }

    ReactDOM.render(
      colorFilterHTML,
      colorFilter,
    )
  }

  cardHTML(value) {
      return (<div className="col-md-4 col-sm-12" key={value}>
              <div className="card border-white p-3 mb-3">
                  <div className="card-body mx-auto">
                      <span className={value}></span>
                  </div>
              </div>
          </div>);
  }

  filterCards () {
    let cardFilter = document.getElementById('cards-filter');
    let cardFilterHTML = [];

    if (this.state.color === 'all' && this.state.shape === 'all') {
        for(let shape in SHAPES) {
            if(shape === 'all') {
                continue;
            }

            let COLORS = SHAPES[shape];
            for (let color in COLORS) {
                cardFilterHTML.push(this.cardHTML(COLORS[color]));
            }
        }
    } else if (this.state.color === 'all') {
        let COLORS = SHAPES[this.state.shape];
        for (let color in COLORS) {
            cardFilterHTML.push(this.cardHTML(COLORS[color]));
        }
    } else if (this.state.shape === 'all') {
        for(let shape in SHAPES) {
            if(shape === 'all') {
                continue;
            }

            cardFilterHTML.push(this.cardHTML(SHAPES[shape][this.state.color]));
        }
    } else {
        cardFilterHTML.push(this.cardHTML(SHAPES[this.state.shape][this.state.color]));
    }

    ReactDOM.render(
      cardFilterHTML,
      cardFilter,
    )
  }

  shapeOnClick = (e) => {
      let currentShape = this.state.shape;

      document.querySelector(`button[data-id='${currentShape}-shape']`)
      .classList.remove('bg-active');
      e.target.classList.add('bg-active');

      currentShape = e.target.getAttribute('data-id').split('-');
      this.setState({shape: currentShape[0]}, () => {
        this.filterCards();

        ReactDOM.render(
          capitalizeFirstLetter(currentShape[0]),
          document.getElementById('shape-name'),
        );
      });
  }

  colorOnClick = (e) => {
      let currentColor = this.state.color;
      document.querySelector(`button[data-id='${currentColor}-color']`)
      .classList.remove('bg-active');
      e.target.classList.add('bg-active');

      currentColor = e.target.getAttribute('data-id').split('-');
      this.setState({color: currentColor[0]}, () => this.filterCards());
  }

  render() {
    return (
      <Fragment>
        <section>
          <h2 className="mb-5">Filters</h2>
          <div className="row">
            <div className="col-12">
              <h5 className="text-primary">Shapes</h5>
            </div>
            <div className="col-12 mb-3">
              <div id="shapes-filter" className="d-flex flex-row mb-3">
              </div>
            </div>
            <div className="col-12">
              <h5 className="text-primary">Colors</h5>
            </div>
            <div className="col-12 mb-3">
              <div id="colors-filter" className="d-flex flex-row mb-3">
              </div>
            </div>
          </div>
        </section>
        <section>
          <h5 className="mb-2"><span id="shape-name">All</span> Item(s):</h5>
          <div id="cards-filter" className="row">
          </div>
        </section>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  base_url: state.globals.base_url,
  api_url: state.globals.api_url,
});

export default connect(mapStateToProps)(Home);