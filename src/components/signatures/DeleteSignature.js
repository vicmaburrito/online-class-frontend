import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/named
import { removeSignatures, selectAllSignatures } from '../../redux/signatures/signatureSlice';
import '../../styles/signaturedetails.css';
// eslint-disable-next-line import/extensions
import Sidebar from '../../pages/Sidebar';

const DeleteSignature = () => {
  const dispatch = useDispatch();
  const signatures = useSelector(selectAllSignatures);
  const userId = useSelector((state) => state.user.data.id);
  const filteredSignatures = signatures.filter((signatures) => signatures.user_id === userId);

  const signatureslist = filteredSignatures.map((signatures) => (
    <li key={signatures.id} className="flex justify-between py-2 px-4">
      <span>{signatures.name}</span>
      <button
        type="button"
        className="bg-red-600 text-white rounded-md py-1 px-2"
        onClick={() => dispatch(removeSignatures(signatures.id))}
      >
        Delete
      </button>
    </li>
  ));

  return (
    <>
      <Sidebar />
      <div className="main-container">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-center text-2xl font-extrabold text-gray-800 tracking-widest mb-3">
            Delete signatures
          </h1>
          <p className="text-sm text-zinc-500">
            Please select a signatures from this list to delete it
          </p>
        </div>
        <ul className="room-details-ul shadow-lg mx-4 mt-4">{signatureslist}</ul>
      </div>
    </>

  );
};

export default DeleteSignature;
