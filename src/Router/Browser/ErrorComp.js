import RouteHistory from '../history';

class ErrorComp {
  constructor() {
    this.props = { params: RouteHistory.location.params };
    this.props.query = { params: RouteHistory.location.params };
    this.createElement = this.createElement.bind(this);
    this.createElement();
  }

  createElement() {
    this._element = document.createElement('h1');
    this._element.textContent = `error: ${JSON.stringify(this.props)}`;
    return this._element;
  }

  get element() {
    return this._element;
  }

  updateProps(props) {
    this.props = { ...this.props, ...props };
    return this.createElement();
  }
}

const errorComp = new ErrorComp();

export default errorComp;
