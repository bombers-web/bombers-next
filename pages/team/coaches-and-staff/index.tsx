import React from 'react'
import Layout from '../../../src/common/Layout'
import PlayerList from '../../../src/components/Players/PlayerList'
import { fetchAPI } from '../../../src/lib/api'
import { startCase } from 'lodash'

const Coaches = ({ coaches }) => {
  return (
    <>
      <Layout
        header={'Bombers Coaches & Staff'}
        seo={{
          metaTitle: 'Bombers Coaches & Staff',
          metaDescription: 'Meet the Bombers coaches and staff',
        }}
      >
        <PlayerList list={coaches} type="coaches-and-staff" />
      </Layout>
    </>
  )
}

export async function getStaticProps({ params, ...ctx }) {
  // add picture to api (got error) "poppulate=picutre"
  const coaches = await fetchAPI('/coaches?populate=picture')
  return {
    props: { coaches },
  }
}

export default Coaches
