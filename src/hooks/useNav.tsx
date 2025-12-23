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
          name: 'Club Calender',
          id: 'calender',
          slug: 'schedule?tab=calender',
        },
      ],
    },
    {
      name: 'Club',
      id: 'club',
      slug: '/club',
      subMenus: [
        {
          name: 'Events',
          id: 'events',
          slug: 'club/events',
        },
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
    navs: baseNavs,
    shortest: 3,
  }
}

export default useNav
