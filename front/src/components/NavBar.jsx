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
    <>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-end">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
          </div>
          <div className="flex flex-1items-center justify-center sm:items-stretch sm:justify-end">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4 bg-zinc-100 px-10 py-2 rounded-xl">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-neutral-800 rounded-md px-3 py-2 text-lg font-bold hover:scale-110"
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
              <Typography
                as="div"
                variant="small"
                className="font-medium hidden sm:ml-6 sm:block"
              >
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
            <div className="rounded-xl bg-transparent mx-2">
              <Link href="/login">
                <Button className="hover:scale-105 mx-2">LOGIN</Button>
              </Link>
              <Link href="/register">
                <Button className="hover:scale-105 mx-2">REGISTER</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default NavBar
