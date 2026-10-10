const prefix = "/patient"

export const patientRoutes = [
    {
      title: "Bookings",
      url: "#",
      items: [
        {
          title: "Overview",
        //   url: "/admin",
        url: `${prefix}`,
        },
        {
          title: "Payment History",
        //   url: "/admin/approv-doctor",
        url: `${prefix}`,
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
  ];