const AdminLinks = [
  { id: 'Home', src: 'Home', path: '/' },
  { id: 'courses', src: 'Home', path: '/courses' },
  { id: 'Reservation', src: 'Reservations', path: '/reservations' },
  { id: 'new-course', src: ' New Course', path: '/course/new' },
  { id: 'delete', src: 'Delete Course', path: '/courses/delete' },
];

const UserLinks = [
  { id: 'Home', src: 'Home', path: '/' },
  { id: 'Courses', src: 'Courses', path: '/courses' },
  { id: 'Reservation', src: 'My Reservations', path: '/reservations' },
  { id: 'new-course', src: ' New Course', path: '/course/new' },
  { id: 'delete', src: 'Delete Course', path: '/courses/delete' },
];

const GuestLinks = [
  { id: 'Home', src: 'Home', path: '/' },
  { id: 'Courses', src: 'Home', path: '/courses' },
  { id: 'signup', src: 'Sign up', path: '/signup' },
  { id: 'signin', src: 'Sign In', path: '/auth/login' },
];

export { AdminLinks, UserLinks, GuestLinks };
