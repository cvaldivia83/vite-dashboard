// import Logo from '../assets/logo.svg';
// import Action from '../assets/icon_action.svg';
// import Avatar from '../assets/avatar.svg';
import { ReactComponent as Logo } from '../assets/logo.svg';
import { ReactComponent as Action } from '../assets/icon_action.svg';
import { ReactComponent as Avatar } from '../assets/avatar.svg';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Logo className='navbar-logo' aria-hidden="true" />
      <div className="navbar-user">
        <Avatar className="navbar-item" />
        <small className="navbar-item">Antonio Oliveira</small>
        <Action className='navbar-item' aria-label="Login" />
      </div>
    </nav>
  )
}

export default Navbar;