import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GrFormClose } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import SocialIcons from './SocialIcons';
import signOutUser from '../api/SignOut';
import { signOut } from '../redux/reducers/token';
import { AdminLinks, UserLinks, GuestLinks } from '../constants/Links';
import Role from '../constants/Role';

const SideNav = () => {
  const dispatch = useDispatch();
  const { isSignedIn, userData } = useSelector((state) => state.token);

  const user = useSelector((state) => state.token).userData || JSON.parse(localStorage.getItem('user'));

  let Links;
  if (isSignedIn && userData.role === Role.ADMIN) {
    Links = AdminLinks;
  } else if (isSignedIn && userData.role === Role.USER) {
    Links = UserLinks;
  } else {
    Links = GuestLinks;
  }
  const hideSideBar = () => {
    const nav = document.querySelector('.side-nav');
    nav.classList.remove('translate-x-0');
    nav.classList.add('translate-x-[-100%]');
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    dispatch(signOut());
    localStorage.removeItem('user');
    signOutUser(user);
  };

  return (
    <div className="side-nav flex flex-col justify-between w-4/5 md: w-2/5 lg:w-1/5 h-screen bg-white border border-r-gray p-4 fixed left-0 top-0 z-[1000] translate-x-[-100%] transform duration-500 delay-300 ease-in-out shadow-xl" onMouseLeave={hideSideBar}>
      <Link to="/" className="p-0 mt-4 -ml-5">
        <img
          src="https://cdn.buttercms.com/SKLnmhpShSsNxosJpRI2"
          alt="logo"
          className="transform scale-75]"
          style={{ margin: '20px' }}
        />
      </Link>
      <GrFormClose
        className="text-4xl cursor-pointer absolute top-2 right-2 hover:text-gray-dark"
        onClick={hideSideBar}
      />
      <nav>
        <div className="list-none flex flex-col gap-2 text-lg">
          {Links.map((link) => (
            <Link
              key={link.id}
              to={link.path}
              className="uppercase font-bold tracking-wider hover:bg-green focus:bg-green
              w-full px-2 py-3 transition duration-300 ease
              hover:text-white focus:text-white rounded "
              onClick={hideSideBar}
            >
              {link.src}
            </Link>

          ))}
        </div>
        {isSignedIn && (
          <button type="submit" className="btn-red text-white mt-5 bg-red py-1 px-5 rounded font-semibold my-auto text-center" onClick={handleSignOut}>
            Sign Out
          </button>
        )}

      </nav>
      <SocialIcons />
    </div>
  );
};
export default SideNav;
