export const navList = [
  {
    id: 1,
    name: "Home",
    path: "/",
  },
  {
    id: 2,
    name: "Services",
    path: "/services",
    children: [
      {
        id: 21,
        name: "Refrigerator Repair",
        path: "/services/refrigerator-change",
      },
      {
        id: 22,
        name: "Washing Machine Repair",
        path: "/services/washingmachine-repair", 
      },
      {
        id: 23,
        name: "Ac Repair",
        path: "/services/ac-repair",
      },
      {
        id: 24,
        name: "Microwave Repair",
        path: "/services/microwave-repair",
      },
      {
        id: 25,
        name: "Water Purifier Repair",
        path: "/services/waterpurifier-repair",
      },
    ],
  },
  {
    id: 3,
    name: "Appearance",
    path: "/appearance",
    children: [
      {
        id: 31,
        name: "Car Wash",
        path: "/appearance/car-wash",
      },
      {
        id: 32,
        name: "Detailing",
        path: "/appearance/detailing",
      },
    ],
  },
  {
    id: 5,
    name: "About Us",
    path: "/about",
  },
  {
    id: 6,
    name: "Contact Us",
    path: "/contact",
  },
];