import { Disclosure, Menu } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import Button from "./Button"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Typography } from "@material-tailwind/react"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Classic mode", href: "/classic-mode" },
]

const NavBar = (props) => {
  const { jwt, logout, pseudo } = props
  const [isLoggedIn, setIsLoggedIn] = useState(jwt)
  useEffect(() => {
    setIsLoggedIn(jwt)
  }, [jwt])

  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-20 items-center justify-end">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-zinc-100 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1items-center justify-center sm:items-stretch sm:justify-end">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4 bg-zinc-100 px-10 py-2 rounded-xl">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="text-neutral-800  rounded-md px-3 py-2 text-lg font-bold hover:scale-110"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-5 ">
                {isLoggedIn ? (
                  <div>
                    {pseudo && (
                      <Link
                        className=" text-lg md:text-2xl text-zinc-100 md:text-neutral-800 px-4 py-4 rounded-xl hover:scale-110"
                        href="/account"
                      >
                        {pseudo}
                      </Link>
                    )}
                    <Button variant="secondary" size="lg" onClick={logout}>
                      ❌
                    </Button>
                  </div>
                ) : (
                  <div className="bg-zinc-100 rounded-xl">
                    <Link href="/login">
                      <Button variant="navBar" size="lg">
                        <Typography>LOGIN</Typography>
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button variant="navBar" size="lg">
                        REGISTER
                      </Button>
                    </Link>
                  </div>
                )}
              </Menu>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3 bg-yellow-400 rounded-b-lg">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  className="text-neutral-800  hover:bg-zinc-100 block rounded-md px-3 py-2 font-bold"
                >
                  <Link href={item.href}>{item.name}</Link>
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default NavBar
