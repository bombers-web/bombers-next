import { Button } from '@chakra-ui/react'
import NextLink from 'next/link'

interface HeaderLinkProps {
  href: string
  children: React.ReactNode
  fontSize?: string | number
}

const HeaderLink = ({ href, children, fontSize = 'md' }: HeaderLinkProps) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <Button
        as="a"
        variant="link"
        opacity="0.7"
        fontFamily="display"
        fontWeight={600}
        fontSize={fontSize}
        letterSpacing="0.15em"
        textTransform="uppercase"
        color="brand.highlight"
        height="auto"
        minW="auto"
        _hover={{
          textDecoration: 'none',
          opacity: 1,
          color: 'brand.highlight',
        }}
      >
        {children}
      </Button>
    </NextLink>
  )
}

export default HeaderLink
