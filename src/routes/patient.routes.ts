// const prefix = "/patient"
const prefix = "/dashboard"

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
          // title: "Payment History",
           title: "My Appointments",
        //   url: "/admin/approv-doctor",
        url: `${prefix}/my-appointments`,
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