import { Flex, Icon, IconButton, Link, Text, Tooltip } from '@chakra-ui/react'
import type { IconProps, TextProps } from '@chakra-ui/react'
import { FiCopy, FiMapPin } from 'react-icons/fi'

interface LocationWithCopyProps {
  name: string
  mapUrl?: string
  copyText?: string
  color?: string
  fontSize?: TextProps['fontSize']
  fontWeight?: string
  textTransform?: TextProps['textTransform']
  showPin?: boolean
  pinSize?: IconProps['boxSize']
  stopPropagation?: boolean
}

const LocationWithCopy = ({
  name,
  mapUrl,
  copyText,
  color = 'brand.highlight',
  fontSize = 'md',
  fontWeight = 'semibold',
  textTransform,
  showPin = true,
  pinSize = 3,
  stopPropagation = false,
}: LocationWithCopyProps) => {
  const textToCopy = copyText ?? name

  const stopProp = (e: React.MouseEvent) => {
    if (stopPropagation) e.stopPropagation()
  }

  return (
    <Flex align="center" gap={1}>
      {showPin && (
        <Icon as={FiMapPin} color={color} boxSize={pinSize} flexShrink={0} />
      )}
      {mapUrl ? (
        <Link
          href={mapUrl}
          isExternal
          color={color}
          fontSize={fontSize}
          fontWeight={fontWeight}
          textTransform={textTransform}
          _hover={{ color: 'yellow.200', textDecoration: 'none' }}
          onClick={stopProp}
        >
          {name}
        </Link>
      ) : (
        <Text
          as="span"
          color={color}
          fontSize={fontSize}
          fontWeight={fontWeight}
          textTransform={textTransform}
        >
          {name}
        </Text>
      )}
      <Tooltip label="Copy location" placement="top" hasArrow>
        <IconButton
          aria-label="Copy location"
          icon={<Icon as={FiCopy} boxSize={3} />}
          size="xs"
          variant="ghost"
          color={color}
          opacity={0.5}
          _hover={{ opacity: 1 }}
          onClick={(e) => {
            if (stopPropagation) e.stopPropagation()
            navigator.clipboard.writeText(textToCopy)
          }}
        />
      </Tooltip>
    </Flex>
  )
}

export default LocationWithCopy
