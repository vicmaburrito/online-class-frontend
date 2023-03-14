export const SET_COURSE_DETAIL = 'CourseHunter/course/SET_COURSE_DETAIL';
export const SET_COURSE_LOADING = 'CourseHunter/course/SET_COURSE_LOADING';

const defaultCourse = {
  loading: true,
  courseDetail: {
    id: 1,
    name: 'Course Title',
    image_url: 'https://images.unsplash.com/photo-1465778893808-9b3d1b443be4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1175&q=80',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean facilisis sapien pharetra molestie vulputate. Curabitur condimentum blandit dui, rhoncus semper sapien dictum vitae. Etiam in mi ultrices, commodo ligula quis, efficitur erat. Donec at est scelerisque mi pharetra placerat congue a orci. Morbi porttitor non augue elementum gravida. Vivamus tempor scelerisque dignissim. Vestibulum rutrum magna at pellentesque facilisis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam cursus venenatis odio in suscipit. Morbi vulputate sagittis consequat.
    
    Sed at blandit ex. Sed bibendum viverra erat vel venenatis. Maecenas euismod tempor sapien vitae pulvinar. Curabitur vitae porttitor ante, eu auctor dolor. Vestibulum at justo dui. Suspendisse quis velit venenatis, ornare odio et, maximus est. Nulla facilisi. Aenean viverra felis nec turpis consequat vestibulum.`,
  },
};

export default function courseReducer(state = defaultCourse, action) {
  switch (action.type) {
    case SET_COURSE_DETAIL: {
      return { ...state, courseDetail: action.courseDetail };
    }
    case SET_COURSE_LOADING: {
      return { ...state, loading: action.loading };
    }
    default:
      return state;
  }
}

export function setCourseDetail(courseDetail) {
  return { type: SET_COURSE_DETAIL, courseDetail };
}

export function setCourseLoading(loading) {
  return { type: SET_COURSE_LOADING, loading };
}
