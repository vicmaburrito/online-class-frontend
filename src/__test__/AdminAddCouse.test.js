/* eslint-disable import/extensions */
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import AdminAddCourse from '../pages/AdminAddCourse';
import store from '../redux/store';

describe('Test Admin Add Course', () => {
  it('should render the page', () => {
    const element = (
      <Provider store={store}>
        <BrowserRouter>
          <AdminAddCourse />
        </BrowserRouter>
      </Provider>
    );
    const adminAddCourse = renderer.create(element);
    expect(adminAddCourse).toMatchSnapshot();
  });
});
