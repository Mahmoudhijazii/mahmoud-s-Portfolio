import auctionsSvg from "../assets/auctions_for_all_bwr.svg";

export const projects = [
  {
    id: 1,
    title: "Auctions For All",
    summary:
      "Lebanon's first auction platform — real-time bidding, user auth, payment integration, and a complete admin panel. Built solo from the ground up.",
    description:
      "A production-grade auction platform featuring real-time bidding via WebSockets, user dashboards, item listing and management, automated auction timers, notifications, and a complete admin panel. Designed to handle concurrent bidders and deliver a smooth, trustworthy auction experience.",
    stack: ["Flutter", "Node.js", "MongoDB", "AWS"],
    role: "Main Developer",
    outcome:
      "First auction platform built for the Lebanese market with all core functionalities live and production-ready.",
    github: "#",
    live: "#",
    image: {
      src: auctionsSvg,
      gradient: "from-blue-500 via-indigo-500 to-violet-500",
      icon: "Gavel",
    },
  },
  {
    id: 2,
    title: "SecuFleet Dashboard",
    summary:
      "Enterprise fleet security dashboard with real-time GPS tracking, alert management, and data visualization for fleet operations.",
    description:
      "Contributed to and built key features for a fleet security management platform, including real-time GPS tracking interfaces, alert management systems, and data visualization dashboards used by enterprise fleet operations clients.",
    stack: ["React", "Tailwind CSS", "REST APIs", "Chart.js"],
    role: "Software Engineer",
    outcome:
      "Shipped production features actively used by enterprise fleet management clients.",
    github: null,
    live: null,
    image: {
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      icon: "Shield",
    },
  },
  {
    id: 3,
    title: "E-Commerce Platform",
    summary:
      "Full-stack store with product catalog, cart system, Stripe checkout, order tracking, and admin inventory dashboard.",
    description:
      "A complete e-commerce solution featuring product catalog with filtering and search, shopping cart with persistent state, secure checkout with Stripe payment processing, order management, and an admin dashboard for inventory control.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Stripe", "Tailwind CSS"],
    role: "Solo Developer",
    outcome: "Fully functional store with end-to-end purchasing flow.",
    github: "#",
    live: "#",
    image: {
      gradient: "from-amber-500 via-orange-500 to-red-500",
      icon: "ShoppingCart",
    },
  },
  {
    id: 4,
    title: "Task Management System",
    summary:
      "Kanban-style project management with drag-and-drop boards, team collaboration, deadline tracking, and progress analytics.",
    description:
      "A productivity application featuring Kanban boards with drag-and-drop functionality, task assignments, deadline tracking, progress analytics, and team collaboration features with real-time updates.",
    stack: ["React", "Node.js", "MongoDB", "DnD Kit", "Tailwind CSS"],
    role: "Solo Developer",
    outcome:
      "Intuitive project management interface with real-time collaborative updates.",
    github: "#",
    live: "#",
    image: {
      gradient: "from-purple-500 via-fuchsia-500 to-pink-500",
      icon: "LayoutDashboard",
    },
  },
];
