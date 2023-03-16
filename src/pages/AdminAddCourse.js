import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Message from '../components/Message';
import { addCourse, setState } from '../redux/reducers/courses';

const AdminAddCourse = () => {
  const token = useSelector((state) => state.token.userData.token);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    picture: '',
    description: '',
    max_num_students: 0,
  });

  const status = useSelector((state) => state.courses.status);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.date.length > 0) {
      dispatch(addCourse({ token, formData }));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (status === 'Added') {
      dispatch(setState(''));
      navigate('../');
    }
  }, [status]);

  return (
    <div className="relative flex flex-col justify-center min-h-screen bg-green overflow-hidden bg-opacity-80">
      {status === 'Course not created' && (
        <Message message="Course not created" type="alert" color="red" />
      )}
      <div
        className="hasBg w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10 bg-no-repeat bg-cover"
        style={{
          backgroundImage: 'URL(https://elearningindustry.com/wp-content/uploads/2021/08/Online-Learning-Benefits-And-Challenges.png)',
        }}
      />
      <div className="flex flex-col mx-auto justify-center align-middle">
        <h2 className="text-2xl mx-auto font-bold uppercase text-white mb-3">
          Add New Course
        </h2>
        <hr className="border-gray w-1/2 mx-auto mb-3" />
        <form
          className="flex flex-col my-auto gap-3 justify-center"
          onSubmit={handleSubmit}
        >
          <fieldset className="flex flex-col gap-4 mt-4">
            <input
              onChange={handleChange}
              type="text"
              name="name"
              placeholder="Course Name"
              className="py-2 px-5 rounded-full font-semibold bg-transparent text-white border-white border placeholder:text-white"
              required
            />
            <input
              onChange={handleChange}
              type="text"
              name="picture"
              placeholder="Picture Url"
              className="py-2 px-5 rounded-full font-semibold bg-transparent text-white border-white border placeholder:text-white"
              required
            />
            <input
              onChange={handleChange}
              type="number"
              name="max_num_students"
              placeholder="Number of students"
              className="py-2 px-5 rounded-full font-semibold bg-transparent text-white border-white border placeholder:text-white"
              required
            />
            <textarea
              onChange={handleChange}
              name="description"
              placeholder="Description"
              rows="4"
              className="py-2 px-5 rounded-xl font-semibold bg-transparent text-white border-white border placeholder:text-white"
              required
            />
          </fieldset>
          <Button
            btnType="submit"
            btnName="Add Course"
            bgColor="bg-white text-green"
          />
        </form>
      </div>
    </div>
  );
};

export default AdminAddCourse;
