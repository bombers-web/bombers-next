import {
  Box,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem as ChakraMenuItem,
} from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import { ChevronDownIcon } from '@chakra-ui/icons'
import styled from '@emotion/styled'
import { useState } from 'react'
import NavLogo from '../../../common/NavLogo'
import useNav from '../../../hooks/useNav'
import Socials from '../../../common/Socials'

type MenuItemProps = {
  theme: any
  outlined?: boolean
  current_slug?: boolean
}

type DesktopNavProps = {
  homePage: boolean
}

const MenuItem = styled(Box)`
  ${(props: MenuItemProps) => ({
    padding: props.outlined ? '4px' : '0px',
    border: props.outlined ? '3px solid white' : 'none',
    alignContent: 'center',
    ...props.theme?.fonts?.menuItem,
    color: props.current_slug
      ? 'var(--chakra-colors-brand-highlight)'
      : props.theme.fonts.menuItem.color,
  })}
  opacity: 0.75;
  :hover {
    opacity: 1;
    color: var(--chakra-colors-brand-highlight);
  }
`

const DesktopNav = ({ homePage }: DesktopNavProps) => {
  const { navs } = useNav()
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({})

  const handleMouseEnter = (navSlug: string) => {
    setOpenMenus((prev) => ({ ...prev, [navSlug]: true }))
  }

  const handleMouseLeave = (navSlug: string) => {
    setOpenMenus((prev) => ({ ...prev, [navSlug]: false }))
  }

  return (
    <Flex
      id="desktop-nav-container"
      bg={homePage ? 'linear-gradient(#2d2d2dc1, transparent);' : 'brand.dark'}
      minH="100px"
      minW="100vw"
      display={['none', 'none', 'flex', 'flex']}
      justifyContent="center"
      alignItems="center"
      px="16px"
      pb="8px"
      position={homePage ? 'fixed' : 'inherit'}
    >
      <Flex justifyContent="center" maxW="1180px" w="100%" alignItems="center">
        <Box flex="1">
          <NavLogo color="brand.light" size="md" logoOnly />
        </Box>
        <Flex
          grow="1"
          flex="2"
          flexDir="row"
          width="100%"
          height="100%"
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {navs.map((nav) => {
            // If nav has subMenus, render as dropdown
            if (nav.subMenus && nav.subMenus.length > 0) {
              return (
                <Menu key={nav.slug} isOpen={openMenus[nav.slug] || false}>
                  <MenuButton
                    as={Box}
                    cursor="pointer"
                    display="flex"
                    alignItems="center"
                    gap={1}
                    _focus={{ outline: 'none', caretColor: 'transparent' }}
                    onMouseEnter={() => handleMouseEnter(nav.slug)}
                    onMouseLeave={() => handleMouseLeave(nav.slug)}
                  >
                    <MenuItem
                      className="desktop-menu-item"
                      current_slug={
                        pathname.startsWith(nav.slug) ? 'true' : undefined
                      }
                      display="flex"
                      alignItems="center"
                      gap={2}
                    >
                      {nav.name}
                      <ChevronDownIcon />
                    </MenuItem>
                  </MenuButton>
                  <MenuList
                    bg="brand.dark"
                    border="none"
                    onMouseEnter={() => handleMouseEnter(nav.slug)}
                    onMouseLeave={() => handleMouseLeave(nav.slug)}
                  >
                    {nav.subMenus.map((subMenu) => (
                      <ChakraMenuItem
                        key={subMenu.slug}
                        as={Link}
                        href={`/${subMenu.slug}`}
                        bg="brand.dark"
                        color="brand.light"
                        textDecoration="none"
                        _hover={{
                          bg: 'brand.meta',
                          color: 'brand.highlight',
                          textDecoration: 'none',
                        }}
                        _focus={{ outline: 'none', caretColor: 'transparent' }}
                      >
                        {subMenu.name}
                      </ChakraMenuItem>
                    ))}
                  </MenuList>
                </Menu>
              )
            }

            // Regular nav item without dropdown
            return (
              <Link
                key={nav.slug}
                href={nav.slug}
                textDecoration="none"
                _hover={{ textDecoration: 'none' }}
                _focus={{ outline: 'none' }}
              >
                <MenuItem
                  className="desktop-menu-item"
                  current_slug={pathname === nav.slug ? 'true' : undefined}
                >
                  {nav.name}
                </MenuItem>
              </Link>
            )
          })}
        </Flex>
        <Flex
          grow="1"
          flex="1"
          flexDir="row"
          width="100%"
          height="100%"
          sx={{
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <Socials />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default DesktopNav
