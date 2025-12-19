import { id } from 'date-fns/locale'
import { fetchAPI } from '../lib/api'
import { useState, useEffect } from 'react'

export type NavItem = {
  name: string
  id: string
  slug: string
  subMenus?: Array<NavItem>
  hide?: boolean
}

type DefaultNavs = {
  navs: Array<NavItem>
  subMenus?: Array<NavItem>
  shortest: number
}

function useNav(type?: undefined | String | Array<string>): DefaultNavs {
  const [dynamicPages, setDynamicPages] = useState([])

  useEffect(() => {
    fetchAPI('/pages?populate[1]=Seo.shareImage')
      .then((val) => {
        if (val) {
          setDynamicPages(val)
        }
      })
      .catch((err) => console.error(err))
  }, [])

  const baseNavs = [
    {
      name: 'Latest',
      id: 'content',
      slug: '/content',
    },
    {
      name: 'Schedule',
      id: 'schedule',
      slug: '/schedule',
      subMenus: [
        {
          name: 'Division I',
          id: 'd1',
          slug: 'schedule?tab=d1',
        },
        {
          name: 'Division II',
          id: 'd2',
          slug: 'schedule?tab=d2',
        },
        {
          name: 'Club Events',
          id: 'events',
          slug: 'schedule?tab=events',
        },
      ],
    },
    {
      name: 'Club',
      id: 'club',
      slug: '/club',
      subMenus: [
        {
          name: 'History',
          id: 'history',
          slug: 'club/history',
        },
        {
          name: 'Board',
          id: 'board',
          slug: 'club/board',
        },
        {
          name: 'Youth Rugby',
          id: 'youth-rugby',
          slug: 'club/youth-rugby',
        },
      ],
    },
    {
      name: 'Team',
      id: 'team',
      slug: '/team',
      subMenus: [
        {
          name: '15s',
          id: 'rugby',
          slug: 'team/rugby',
        },
        {
          name: 'Sevens',
          id: 'sevens',
          slug: 'team/sevens',
        },
        {
          name: 'Practice',
          id: 'practice',
          slug: 'team/practice',
        },
        {
          name: 'Coaches and Staff',
          id: 'coaches-and-staff',
          slug: 'team/coaches-and-staff',
        },
      ],
    },
    {
      name: 'Contact',
      id: 'contact',
      slug: '/contact',
    },
    {
      name: 'Donate',
      id: 'donate',
      slug: '/pay',
    },
  ]

  dynamicPages.forEach((page) => {
    baseNavs.forEach((nav) => {
      if (nav.id === page.parent && nav.subMenus) {
        nav.subMenus.push({
          name: page.title,
          id: page.slug,
          slug: `club/${page.slug}`,
        })
      }
    })
  })

  return {
    // renders baseNavs if there are no dynamic pages
    navs: baseNavs,
    // TODO: shortest causes nave for team and club to interchange
    shortest: 3,
    // shortest: baseNavs
    //   .sort((a, b) => a.subMenus?.length - b.subMenus?.length)
    //   .map((item) => item.subMenus?.length || 0)
    //   .filter((i) => i)[0],
  }
}

export default useNav
