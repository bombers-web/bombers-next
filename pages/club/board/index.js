import { Box, Flex, Heading, SimpleGrid } from '@chakra-ui/react'
import Layout from 'src/common/Layout'
import { fetchAPI } from 'src/lib/api'
import SectionHeader from '../../../src/common/SectionHeader'
import BoardCard from '../../../src/components/Board/BoardCard'

const Board = (props) => {
  const { members } = props

  return (
    <Layout
      header="Executive Board"
      seo={{ metaTitle: 'Executive Board' }}
      margin
    >
      <Box
        maxW="container.xl" // Prevents cards from stretching too far on huge screens
        mx="auto" // Centers the entire container
        px={{ base: 4, md: 8 }}
        py={12}
        id="players-list"
      >
        <SectionHeader title="Executive Board" />

        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4 }} // More responsive column scaling
          spacing={8}
          justifyItems="center" // Centers the actual cards within the grid cells
        >
          {members?.length ? (
            members?.map((member) => {
              const { photo, first_name, last_name, position, email } = member
              const background = photo?.url || '/static/default/defaultpic.png'
              const displayName = `${first_name} ${last_name}`

              return (
                <BoardCard
                  key={member.id}
                  size={photo?.size}
                  position={position}
                  email={email}
                  bg={background}
                  displayName={displayName}
                />
              )
            })
          ) : (
            <Flex gridColumn="1 / -1" justify="center">
              <Heading as="h5" color="gray.500">
                No members found
              </Heading>
            </Flex>
          )}
        </SimpleGrid>
      </Box>
    </Layout>
  )
}

export async function getStaticProps() {
  const members = (await fetchAPI('/board-members?populate=photo')) || []
  return {
    props: { members },
    revalidate: 86400, // Added revalidation since your other pages use it
  }
}

export default Board
