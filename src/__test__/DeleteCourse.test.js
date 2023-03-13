import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import store from '../redux/store';
import DeleteCourse from '../pages/DeleteCourse';

describe('Test Admin Delete Course', () => {
  it('should render the page', () => {
    const element = (
      <Provider store={store}>
        <DeleteCourse />
      </Provider>
    );
    const deleteCourse = renderer.create(element);
    expect(deleteCourse).toMatchSnapshot();
  });
});
