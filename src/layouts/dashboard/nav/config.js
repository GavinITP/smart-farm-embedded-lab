// component
import SvgColor from "../../../components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "dashboard",
    path: "/dashboard/app",
    icon: icon("ic_analytics"),
  },
  // {
  //   title: "map",
  //   path: "/dashboard/map",
  //   icon: icon("ic_user"),
  // },
  {
    title: "analytics",
    path: "/dashboard/analytics",
    icon: icon("ic_blog"),
  },
  {
    title: "about",
    path: "/dashboard/about",
    icon: icon("ic_user"),
  },
  // {
  //   title: 'resources',
  //   path: '/dashboard/resources',
  //   icon: icon('ic_cart'),
  // },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
