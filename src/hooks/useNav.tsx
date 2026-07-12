import { fetchAPI } from '../lib/api'
import { useState, useEffect } from 'react'

export type NavItem = {
  name: string
  id: string
  slug: string
  subMenus?: Array<NavItem>
  hide?: boolean
  isExternal?: boolean
}

type DefaultNavs = {
  navs: Array<NavItem>
  subMenus?: Array<NavItem>
  shortest: number
}

// Every component that calls useNav (desktop nav, mobile nav, footer…) used to
// fire its own /pages fetch on mount, spamming the console when Strapi is
// unreachable. Share a single in-flight request across all consumers and fail
// quietly (CMS-driven menu items just don't appear).
let cachedPages: Array<any> | null = null
let pagesRequest: Promise<Array<any>> | null = null

function loadDynamicPages(): Promise<Array<any>> {
  if (cachedPages) return Promise.resolve(cachedPages)
  if (!pagesRequest) {
    pagesRequest = fetchAPI('/pages?populate[1]=Seo.shareImage')
      .then((val) => {
        cachedPages = Array.isArray(val) ? val : []
        return cachedPages
      })
      .catch(() => {
        // Allow a later mount to retry; return empty so the base nav still renders.
        pagesRequest = null
        return []
      })
  }
  return pagesRequest
}

function useNav(type?: undefined | String | Array<string>): DefaultNavs {
  const [dynamicPages, setDynamicPages] = useState<Array<any>>(
    cachedPages || [],
  )

  useEffect(() => {
    let active = true
    loadDynamicPages().then((pages) => {
      if (active) setDynamicPages(pages)
    })
    return () => {
      active = false
    }
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
          name: 'Sevens',
          id: 'sevens',
          slug: 'schedule?tab=sevens',
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
    // {
    //   name: 'Gateway 7s',
    //   id: 'gateway-7s',
    //   slug: '/gateway-7s',
    // },
    {
      name: 'Bomber Open',
      id: 'golf',
      slug: 'https://app.eventcaddy.com/events/2026-bomber-open',
      isExternal: true,
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
