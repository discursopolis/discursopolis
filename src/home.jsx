import { Component, h } from 'preact';
import { Link } from 'preact-router';
import HomeStore from './stores/home-store';

class Home extends Component {
  constructor(props) {
    super(props);

    this.bindedOnChange = this.onChange.bind(this);
    this.state = {texts: []};
  }

  componentWillMount(props, state) {
    HomeStore.addChangeListener(this.bindedOnChange);
    HomeStore.loadData();
  }

  componentWillUnmount(props, state) {
    HomeStore.removeChangeListener(this.bindedOnChange);
  }

  onChange() {
    this.setState(HomeStore.getState())
  }

  render(props, state) {
    return (
      <div>
        <span className="pure-menu-heading"> Discursos </span>
        <ul className="pure-menu-list">
          { state.texts.map(el => <li className="pure-menu-item"><Link className="pure-menu-link" href={'/text/' + el.id}> {el.name} </Link></li>) }
        </ul>
        <Link href='/text/new'><button className="pure-button add-text">Add text</button></Link>
      </div>
    );
  }
}

export default Home
