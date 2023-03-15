import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CgSpinner as CircleSpinner } from 'react-icons/cg';
import Button from '../components/Button';
import makeReservation from '../api/ReserveCourse';
import DropDown from '../components/DropDown';
import Message from '../components/Message';
import { changeStatus } from '../redux/reducers/reservation';
import Calendar from '../components/Calendar';
import host from '../api/host';

const ReserveForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseDetail } = useSelector((state) => state.course);
  const { status, message } = useSelector((state) => state.reservation);

  const [showMessage, setShowMessage] = useState({
    type: null,
    message: null,
    title: null,
  });

  const [coursePackage, setCoursePackage] = useState({
    course_id: `${courseDetail.id}`,
    city_id: '',
    sign_up_date: '',
  });

  const handleChange = (e, id) => {
    if (e instanceof Date) {
      setCoursePackage({
        ...coursePackage,
        sign_up_date: e,
      });
    } else {
      setCoursePackage({
        ...coursePackage,
        city_id: id,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(makeReservation(coursePackage));
  };

  useEffect(() => {
    const displayMessage = () => {
      if (status === 'Success' && message === 'Booked successfully.') {
        setTimeout(() => {
          navigate(-1);
        }, 1000);

        dispatch(changeStatus({ message: null, status: null }));
      } else if (status === 'Loading') {
        setShowMessage({
          type: null,
          message: null,
          title: null,
        });
      } else {
        setShowMessage({
          type: 'alert',
          message: 'Your reservation has failed!',
          title: 'Failed',
        });
      }
    };
    displayMessage();
  }, [status]);

  const [packageOptions, setPackageOptions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios(`${host}/cities`);
      const { data } = response;
      // eslint-disable-next-line camelcase
      const newData = data.map(({ id, city_name }) => ({ id, item: city_name }));
      setPackageOptions(newData);
    }
    fetchData();
  }, []);

  return (
    <div className="relative flex flex-col justify-center min-h-screen bg-green overflow-hidden bg-opacity-80">

      {(status === 'Success' || message === 'Failure') && (
        <Message
          message={showMessage.message}
          type={showMessage.type}
          color="black"
          duration={5000}
          title={showMessage.title || 'Information'}
        />
      )}

      <img
        className="w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10"
        src="https://elearningindustry.com/wp-content/uploads/2021/08/Online-Learning-Benefits-And-Challenges.png"
        alt="reserve-form-bg"
      />

      <div className="flex flex-col mx-auto justify-center align-middle">
        <h2 className="text-2xl mx-auto font-bold uppercase
        text-white mb-3 tracking-wide md:tracking-widest"
        >
          {
            `Book ${courseDetail.name}`
          }
        </h2>

        <hr className="border-gray w-1/2 mx-auto mb-3" />
        <p className="mx-auto text-white text-center w-full
        p-2 md:w-3/5 mb-10 text-sm font-semibold leading-6  max-h-[100px] overflow-hidden py-1"
        >
          {courseDetail.description}
        </p>

        <form
          className="flex flex-col my-auto mx-auto gap-3 justify-center"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-2">
            <DropDown
              dropDownId="package"
              options={packageOptions}
              handleChange={handleChange}
              dropDownName="Select City"
            />
          </div>
          <Calendar handleDateChange={handleChange} id="calendar" />
          <Button
            btnType="submit"
            btnName={(
              <div className="flex justify-center gap-2">
                {status === 'Loading'
                  ? (
                    <>
                      <CircleSpinner className="my-auto w-5 h-5 animate-spin" />
                      Reserving ...
                    </>
                  ) : 'Reserve Course'}
              </div>
            )}
            bgColor="bg-gray text-green w-2/3 mt-4 mx-auto"
          />
        </form>
      </div>
    </div>
  );
};

export default ReserveForm;
