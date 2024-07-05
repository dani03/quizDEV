import { Fragment, useEffect, useState } from "react"
import Link from "next/link"
import { Disclosure, Menu, Transition } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { Typography, Button } from "@material-tailwind/react"

const navigationUser = [
  { name: "Mode random", href: "/classic-mode", current: false },
]

const navigationCompany = [
  { name: "Quiz", href: "/create-quiz", current: false },
  { name: "Questions", href: "/create-question", current: false },
  { name: "Mode random", href: "/classic-mode", current: false },
]

const navigationAdmin = [
  { name: "Quiz", href: "/create-quiz", current: false },
  { name: "Questions", href: "/create-question", current: false },
  { name: "Levels", href: "/create-level", current: false },
  { name: "Themes", href: "/create-theme", current: false },
  { name: "Mode random", href: "/classic-mode", current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const NavBar = (props) => {
  const { jwt, logout, myProfile } = props
  const [navigation, setNavigation] = useState([])
  const [displayedRole, setDisplayedRole] = useState("")

  useEffect(() => {
    switch (myProfile?.role_id) {
      case 1:
        setNavigation(navigationAdmin)
        setDisplayedRole("ADMIN")
        break
      case 2:
        setNavigation(navigationCompany)
        setDisplayedRole("COMPANY")
        break
      case 3:
        setNavigation(navigationUser)
        setDisplayedRole("USER")
        break
      default:
        setNavigation(navigationUser)
        setDisplayedRole("USER")
    }
  }, [myProfile?.role_id])

  return (
    <Disclosure as="nav" className="bg-transparent">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-bluePrimary hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="max-lg:hidden flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/">
                    <Typography
                      className="text-3xl text-center font-bold hover:scale-110 font-passion mr-6"
                      color="white"
                    >
                      JOB'IN QUIZ
                    </Typography>
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-white text-xl font-montserrat hover:scale-110 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                {jwt ? (
                  <Menu as="div" className="relative ml-3">
                    <div className="flex items-center">
                      <Typography className="text-center text-white uppercase mx-2 font-bold">
                        {myProfile?.name}
                      </Typography>
                      <Typography className="italic text-white mx-2 text-sm">
                        ({displayedRole})
                      </Typography>
                      <Menu.Button className="relative flex rounded-full bg-bluePrimary text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-12 w-12 rounded-full border border-gray-900 border-2"
                          src="/profile.png"
                          alt=""
                        />
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
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/my-profile"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Typography
                              onClick={logout}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-red-500 font-bold"
                              )}
                            >
                              Sign out
                            </Typography>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <>
                    <Link href="/login">
                      <Button className="bg-transparent hover:scale-110">
                        Sign in
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button className="bg-transparent hover:scale-110">
                        Register
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden bg-bluePrimary">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <Disclosure.Button
                as="a"
                href="/"
                className="text-white block rounded-md px-3 py-2 text-base font-medium"
              >
                Home
              </Disclosure.Button>
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-bluePrimary hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
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
