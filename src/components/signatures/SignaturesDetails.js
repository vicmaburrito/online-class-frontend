import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  selectSignature,
  getSignatureStatus,
  getSingleSignature,
// eslint-disable-next-line import/extensions
} from '../../redux/Signature/SignatureDetailSlice';
import '../../styles/SignatureSdetails.css';
// eslint-disable-next-line import/extensions
import Sidebar from '../../pages/Sidebar';

const SignaturesDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const Signature = useSelector(selectSignature);
  const SignatureStatus = useSelector(getSignatureStatus);
  useEffect(() => {
    if (SignatureStatus === 'idle') {
      dispatch(getSingleSignature(id));
    }
  }, [id, SignatureStatus, dispatch]);

  return (
    <>
      <Sidebar />
      <div className="main-container">
        <div className="flex flex-col sm:flex-row px-8 sm:px-4 mt-8">
          <div className="w-full sm:w-[70%] rounded-xl">
            <img
            //   src={room.image}
              alt="Class"
              className="w-[100%] object-cover"
            />
          </div>
          <div className="w-full sm:w-[30%] sm:ml-2 flex flex-col">
            <h2 className="font-bold text-xl text-right text-gray-800 my-2">
              {Signature.name}
            </h2>
            <ul className="room-details-ul font-[300] text-zinc-700 my-2">
              <li className="flex justify-between px-8 sm:px-4">
                <span>course</span>
                <span>{Signature.course}</span>
              </li>
              <li className="flex justify-between px-8 sm:px-4">
                <span>Students</span>
                <span>{Signature.students}</span>
              </li>
              <li className="flex justify-between px-8 sm:px-4">
                <span>Teacher</span>
                <span>{Signature.city}</span>
              </li>
            </ul>
            <p className="text-sm text-zinc-500 pl-2">{Signature.description}</p>
            <button
              type="button"
              className="bg-prime py-2 px-4 item self-end text-white rounded-full mt-8"
              onClick={() => navigate(`/signature/${Signature.id}/reservation`)}
            >
              Join
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignaturesDetails;
