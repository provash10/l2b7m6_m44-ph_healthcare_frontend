const prefix = "/admin"

export const adminRoutes = [
    {
      title: "Management",
      url: "#",
      items: [
        {
          title: "Overview",
        //   url: "/admin",
        url: `${prefix}`,
        },
        {
          title: "Doctor Approval",
        //   url: "/admin/approv-doctor",
        url: `${prefix}/approv-doctor`,
        },
      ],
    },
    {
      title: "App Settings",
      url: "#",
      items: [
        {
          title: "Routing",
          url: "#",
        },
        {
          title: "Data Fetching",
          url: "#",
          isActive: true,
        },
       
      ],
    },
    
  ],