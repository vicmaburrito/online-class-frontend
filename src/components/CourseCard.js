import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import host from '../api/host';

const CourseCard = (props) => {
  const {
    courseName, courseDesc, courseImage, courseDate, cityID,
  } = props;

  const [packageOptions, setPackageOptions] = useState([]);

  if (cityID) {
    useEffect(() => {
      const fetchData = async () => {
        const response = await axios(`${host}/cities`);
        const { data } = response;
        // eslint-disable-next-line eqeqeq
        const newData = data.filter((item) => item.id == cityID);
        setPackageOptions(newData[0]);
      };
      fetchData();
    }, []);
  }

  return (
    <div
      className="w-[90%] md:max-w-xs rounded overflow-hidden mx-auto shadow-lg
     shadow-gray-dark md:pb-3 md:h-full pb-10"
      style={
        { border: '1px solid lightgray' }
      }
    >
      <img src={courseImage} alt="Course" className="w-100 h-[50%] pb-5 mx-auto " />
      <h2 className="text-center pb-5 text-black font-l font-bold">
        {courseName}
      </h2>
      <hr className="w-1/4 mx-auto" />
      <div className="flex flex-col flex-wrap text-center gap-3 pt-5">
        <p className="font-medium text-gray-dark">
          {courseDesc}
        </p>

        <p className="font-medium text-black">{courseDate}</p>
        -
        <p className="font-medium text-black">{packageOptions.city_name}</p>
      </div>
    </div>
  );
};

export default CourseCard;

CourseCard.propTypes = {
  courseName: PropTypes.string.isRequired,
  courseDesc: PropTypes.string.isRequired,
  courseImage: PropTypes.string,
  courseDate: PropTypes.string,
  cityID: PropTypes.string,
};

CourseCard.defaultProps = {
  courseDate: '',
  cityID: '',
  courseImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL1XAVkkTszQknK_r31aLcAT4ysbRQyK_zTaCvgExByvhw2YcoU1ukun_Qv1PHzonrlIg&usqp=CAU',
};
