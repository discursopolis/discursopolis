const {Component, h} = require('preact');
//const render = require('preact-render-to-string');

const html = (content) => `<!doctype html>
                  <head>
                    <title>CtrlF</title>
                  </head>
                  <body>
                    ${content}
                  </body>
                </html>`;

const TabBar = (props) => h('div',null,'CtrlF');

class App extends Component {
  render(props) {
    return h('div',null,
          h(TabBar),
          h('div',null, props.children)
    );
  }
}

class MainList extends Component {
  render(props) {
    const els = [];
    return h(App,null,
      h('ul',null,
        props.els.map(el => h('li', null,
          h('a',{href:'/text/'+el.id},el.name))
        )
      )
    );
  }
}

class Text extends Component {
  render(props) {
    return h(App, null,
      h('div',null,props.text)
    );
  }
}

exports.MainList = MainList;
exports.Text = Text;
exports.html = html;
