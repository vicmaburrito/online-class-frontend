import React from 'react';
import PropTypes from 'prop-types';
import {
  TiSocialFacebook,
  TiSocialInstagram,
  TiSocialTwitter,
} from 'react-icons/ti';

const CourseCard = (props) => {
  const {
    courseName, courseLocale, courseImage, courseDate,
  } = props;

  return (
    <div className="w-[90%] md:max-w-xs rounded overflow-hidden mx-auto shadow-lg
     shadow-gray-dark md:pb-3 md:h-full pb-10"
    >
      <img src={courseImage} alt="Course" className="w-100 h-[50%] pb-5 mx-auto " />
      <h2 className="text-center pb-5 text-black font-l font-bold">
        {courseName}
      </h2>
      <hr className="w-1/4 mx-auto" />
      <div className="flex flex-col flex-wrap text-center gap-3 pt-5">
        <p className="font-medium text-gray-dark">{`Location: ${courseLocale}`}</p>

        <p className="font-medium text-black">{courseDate}</p>
      </div>

      <ul className="flex flex-row justify-center gap-4 pt-5">
        <li className="border-solid border-2 rounded-full border-gray-dark hover:border-green">
          <TiSocialFacebook className="fill-gray-dark hover:fill-green" />
        </li>
        <li className="border-solid border-2 rounded-full border-gray-dark hover:border-green">
          <TiSocialTwitter className="fill-gray-dark hover:fill-green" />
        </li>
        <li className="border-solid border-2 rounded-full border-gray-dark hover:border-green">
          <TiSocialInstagram className="fill-gray-dark hover:fill-green" />
        </li>
      </ul>
    </div>
  );
};

export default CourseCard;

CourseCard.propTypes = {
  courseName: PropTypes.string.isRequired,
  courseLocale: PropTypes.string.isRequired,
  courseImage: PropTypes.string.isRequired,
  courseDate: PropTypes.string,
};

CourseCard.defaultProps = {
  courseDate: '',
};
