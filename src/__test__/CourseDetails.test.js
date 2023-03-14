/* eslint-disable import/extensions */
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import CourseDetails from '../pages/CourseDetails';

describe('Details snapshot test', () => {
  test('Render correctly', () => {
    const signin = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <CourseDetails />
          </BrowserRouter>
        </Provider>,
      )
      .toJSON();
    expect(signin).toMatchSnapshot();
  });
});
