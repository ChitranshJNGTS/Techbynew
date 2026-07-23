export const ENDPOINTS = {
  // ==========================
  // User Authentication
  // ==========================
  AUTH: {
    REGISTER: "/user/signup",
    LOGIN: "/user/login",
    VERIFY: "/user/verify",
    PROFILE: "/user/profile",
    UPDATE_PROFILE: "/user/update-profile",
    LOGOUT: "/user/logout",
  },

  // ==========================
  // Jobs
  // ==========================
  JOBS: {
    CREATE: "/jobs/create",
    GET_ALL: "/jobs",
    GET_ONE: (id) => `/jobs/${id}`,
    UPDATE: (id) => `/jobs/${id}`,
    DELETE: (id) => `/jobs/${id}`,
    MY_JOBS: "/jobs/my-jobs",
    FEATURED: "/jobs/featured",
  },

  // ==========================
  // Job Applications
  // ==========================
  APPLICATIONS: {
    APPLY: "/applications/apply",
    MY_APPLICATIONS: "/applications/my-applications",
    GET_JOB_APPLICATIONS: (id) => `/applications/job/${id}`,
    GET_ONE: (id) => `/applications/${id}`,
    UPDATE_STATUS: (id) => `/applications/${id}`,
    DELETE: (id) => `/applications/${id}`,
  },

  // ==========================
  // Recruiter
  // ==========================
  RECRUITER: {
    REGISTER: "/recruiter/register",
    LOGIN: "/recruiter/login",
    PROFILE: "/recruiter/profile",
    UPDATE_PROFILE: "/recruiter/profile",
    DASHBOARD: "/recruiter/dashboard",
    MY_JOBS: "/recruiter/jobs",
  },

  // ==========================
  // Mock Interviews
  // ==========================
  INTERVIEWS: {
    CREATE_SLOT: "/interviews/create",
    GET_ALL: "/interviews",
    GET_ONE: (id) => `/interviews/${id}`,
    BOOK: (id) => `/interviews/book/${id}`,
    CANCEL: (id) => `/interviews/cancel/${id}`,
    MY_BOOKINGS: "/interviews/my-bookings",
  },

  // ==========================
  // Payments
  // ==========================
  PAYMENT: {
    CREATE_ORDER: "/payment/create-order",
    VERIFY: "/payment/verify",
    HISTORY: "/payment/history",
  },

  // ==========================
  // Admin
  // ==========================
  ADMIN: {
    LOGIN: "/admin/login",
    DASHBOARD: "/admin/dashboard",

    USERS: "/admin/users",
    RECRUITERS: "/admin/recruiters",
    JOBS: "/admin/jobs",
    APPLICATIONS: "/admin/applications",
    INTERVIEWS: "/admin/interviews",

    DELETE_USER: (id) => `/admin/users/${id}`,
    DELETE_JOB: (id) => `/admin/jobs/${id}`,
  },

  // ==========================
  // Contact
  // ==========================
  CONTACT: {
    SEND: "/contact",
  },

  // ==========================
  // Uploads
  // ==========================
  UPLOAD: {
    IMAGE: "/upload/image",
    RESUME: "/upload/resume",
  },

  // ==========================
  // Notifications
  // ==========================
  NOTIFICATION: {
    GET_ALL: "/notifications",
    READ: (id) => `/notifications/${id}`,
  },
};