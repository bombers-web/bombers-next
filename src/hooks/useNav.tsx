import { fetchAPI } from "../lib/api";
import { useState, useEffect } from "react";

export type NavItem = {
  name: string;
  id: string;
  slug: string;
  subMenus?: Array<NavItem>;
  hide?: boolean;
};

type DefaultNavs = {
  navs: Array<NavItem>;
  subMenus?: Array<NavItem>;
  shortest: number;
};

function useNav(type?: undefined | String | Array<string>): DefaultNavs {
  const [dynamicPages, setDynamicPages] = useState([]);

  useEffect(() => {
    fetchAPI("/pages?populate[1]=Seo.shareImage")
      .then((val) => {
        if (val) {
          setDynamicPages(val);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const baseNavs = [
    {
      name: "Latest",
      id: "content",
      slug: "/content",
    },
    {
      name: "Schedule",
      id: "schedule",
      slug: "schedule",
    },
    {
      name: "Club",
      id: "club",
      slug: "club",
      subMenus: [
        {
          name: "History",
          id: "history",
          slug: "club/history",
          bg: "/static/legends_3.jpeg",
        },
        {
          name: "Board",
          id: "board",
          slug: "club/board",
          bg: "",
        },
        // {
        //   name: "bombers career center",
        //   id: "youth-rugby",
        //   slug: "/club/career-center",
        //   bg: "",
        // },
      ],
    },

    {
      name: "Team",
      id: "team",
      slug: "/team",
      subMenus: [
        {
          name: "Division I",
          id: "d1",
          slug: "team/d1",
          bg: "/static/d1_team.jpeg",
        },
        {
          name: "Division II",
          id: "d2",
          slug: "team/d2",
          bg: "/static/d3TeamPhoto.JPG",
        },
        {
          name: "Coaches and Staff",
          id: "coaches-and-staff",
          slug: "team/coaches-and-staff",
          bg: "/static/coach_pic1.jpeg",
        },
      ],
    },
    {
      name: "Contact",
      id: "contact",
      slug: "contact",
    },
    {
      name: "Donate",
      id: "donate",
      slug: "pay",
    },
  ];

  dynamicPages.forEach((page) => {
    baseNavs.forEach((nav) => {
      if (nav.id === page.parent && nav.subMenus) {
        nav.subMenus.push({
          name: page.title,
          id: page.slug,
          slug: `club/${page.slug}`,
          bg: page?.Seo?.shareImage?.url || undefined,
        });
      }
    });
  });

  return {
    // renders baseNavs if there are no dynamic pages
    navs: baseNavs,
    // shortest: 3,
    shortest: baseNavs
      .sort((a, b) => a.subMenus?.length - b.subMenus?.length)
      .map((item) => item.subMenus?.length || 0)
      .filter((i) => i)[0],
  };
}

export default useNav;
