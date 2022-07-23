import { Fragment, useState, useEffect } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react'
import { MenuIcon } from '@heroicons/react/solid'

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

const Dropdown = () => {
  const [ user, setUser ] = useState({})

  useEffect(() => {
    const payload = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }

    Axios.get('http://localhost:4000/api/users/me', payload).then((response) => {
      if(response.data.isAdmin === true) {
        setUser(response.data)
      }
    })    
  }, [setUser])

  const logoutUser = () => {
    localStorage.clear()
    window.location='/'
  }
  
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-slate-900 shadow-sm px-4 py-2 bg-slate-800 text-sm font-medium text-gray-700 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-zinc-900">
          
          <MenuIcon className="h-5 w-5" aria-hidden="true" color='#F3F4F6' />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to='/me'
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Account
                </Link>
              )}
            </Menu.Item>
            {user.isAdmin === true ?
            <Menu.Item>
                {({ active }) => (
                  <Link
                    to='/admin'
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Admin Dashboard
                  </Link>
                )}
            </Menu.Item>
            : <></>}
            {/* <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  License
                </a>
              )}
            </Menu.Item> */}
            <Menu.Item>
              {({ active }) => (
                <span className={classNames(
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'block px-4 py-2 text-sm'
                )} onClick={logoutUser}>Log Out</span>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Dropdown