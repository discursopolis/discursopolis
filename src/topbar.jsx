import { Component, h } from 'preact';
import {Link} from 'preact-router';

const TopBar = () => {
  return (
    <div className="header">
        <div className="home-menu pure-menu pure-menu-horizontal pure-menu-fixed">
            <Link className="pure-menu-heading" href="/"><h3>{'CtrlF'}</h3></Link>
        </div>
    </div>
  )
}

export default TopBar
