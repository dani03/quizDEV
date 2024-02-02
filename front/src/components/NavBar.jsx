import { Disclosure } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { createElement, useEffect, useState } from "react"
import {
  Button,
  Typography,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react"
import {
  ChevronDownIcon,
  UserPlusIcon,
  PencilIcon,
  Square3Stack3DIcon,
  SquaresPlusIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Classic mode", href: "/classic-mode" },
]

const navListMenuItems = [
  {
    title: "Create questions",
    icon: PlusCircleIcon,
    url: "/create-question",
  },
  {
    title: "Create Levels",
    icon: Square3Stack3DIcon,
    url: "/create-level",
  },
  {
    title: "Create Theme",
    icon: SquaresPlusIcon,
    url: "/create-level",
  },
  {
    title: "Create Users",
    icon: UserPlusIcon,
    url: "/create-user",
  },
  {
    title: "Edit Users",
    icon: PencilIcon,
    url: "edit-user",
  },
]

const NavBar = (props) => {
  const { jwt, logout, pseudo } = props
  const [isLoggedIn, setIsLoggedIn] = useState(jwt)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const renderItems = navListMenuItems.map(({ icon, title, url }, key) => (
    <Link href={url} key={key}>
      <MenuItem className="flex items-center gap-3 rounded-lg p-1">
        <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
          {createElement(icon, {
            strokeWidth: 2,
            className: "h-6 text-gray-900 w-6",
          })}
        </div>
        <div>
          <Typography
            variant="h6"
            color="blue-gray"
            className="flex items-center text-sm font-bold p-2 rounded-lg hover:bg-gray-100"
          >
            {title}
          </Typography>
        </div>
      </MenuItem>
    </Link>
  ))
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
              <Menu
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 25 },
                }}
                open={isMenuOpen}
                handler={setIsMenuOpen}
                offset={{ mainAxis: 20 }}
                placement="bottom"
              >
                <MenuHandler>
                  <Typography as="div" variant="small" className="font-medium">
                    <ListItem
                      selected={isMenuOpen || isMobileMenuOpen}
                      onClick={() => setIsMobileMenuOpen((cur) => !cur)}
                    >
                      <Typography
                        variant="h1"
                        color="white"
                        className="px-4 py-4 rounded-xl hover:scale-110 uppercase"
                      >
                        ADMIN TOOLS
                      </Typography>
                      <ChevronDownIcon
                        color="white"
                        strokeWidth={2.5}
                        className={`hidden h-3 w-3 transition-transform lg:block ${
                          isMenuOpen ? "rotate-180" : ""
                        }`}
                      />
                      <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`block h-3 w-3 transition-transform lg:hidden ${
                          isMobileMenuOpen ? "rotate-180" : ""
                        }`}
                      />
                    </ListItem>
                  </Typography>
                </MenuHandler>
                <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
                  <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
                    {renderItems}
                  </ul>
                </MenuList>
              </Menu>
              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-5 ">
                {isLoggedIn ? (
                  <div className="flex items-center">
                    {pseudo !== "" && (
                      <>
                        <Link href="/account">
                          <Typography
                            variant="h1"
                            color="white"
                            className="px-4 py-4 rounded-xl hover:scale-110 uppercase"
                          >
                            {pseudo}
                          </Typography>
                        </Link>
                        <Button onClick={logout}>❌</Button>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="bg-zinc-100 rounded-xl bg-transparent">
                    <Link href="/login">
                      <Button>
                        <Typography>LOGIN</Typography>
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button>REGISTER</Button>
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
