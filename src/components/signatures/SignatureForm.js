import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/named
import { createSignature } from '../../redux/signatures/signatureSlice';
// eslint-disable-next-line import/extensions
import Sidebar from '../../pages/Sidebar';

const SignatureForm = () => {
  const formRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);
    const signatureInfo = {
      signature: {
        name: data.name,
        // image: data.image,
        course: data.course,
        student: data.student,
        teacher: data.teacher,
        description: data.description,
      },
    };

    dispatch(createSignature(signatureInfo));
    navigate('/signature');
  };

  return (
    <>
      <Sidebar />
      <div className="main-container">
        <div className="pt-24">
          <div className="text-center">
            <h1 className="text-4xl font-medium text-lime-400">
              Create a signature
            </h1>
            <p className="pt-6">Add Signature information...</p>
          </div>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="md:w-1/2 px-10 md:px-0 mt-5 mx-auto"
          >
            <ul>
              <li>
                <input
                  type="text"
                  name="name"
                  placeholder="Class Title"
                  required
                  className="w-full my-3 focus:ring-lime-600 focus:outline-2 focus:border-transparent"
                />
              </li>
              <li>
                <input
                  type="number"
                  name="course"
                  placeholder="Number of course"
                  required
                  className="w-full my-3 focus:ring-lime-600 focus:border-transparent"
                />
              </li>
              <li>
                <input
                  type="number"
                  name="student"
                  placeholder="Student"
                  min="0.00"
                  step="0.01"
                  required
                  className="w-full my-3 focus:ring-lime-600 focus:border-transparent"
                />
              </li>
              <li>
                <input
                  type="text"
                  name="teacher"
                  placeholder="Teacher"
                  required
                  className="w-full my-3 focus:ring-lime-600 focus:border-transparent"
                />
              </li>
              <li>
                <textarea
                  name="description"
                  placeholder="Signature description..."
                  required
                  className="w-full my-3 focus:ring-lime-600 focus:border-transparent"
                />
              </li>
              <button
                type="submit"
                className="w-full bg-lime-500 text-white w-1/2 py-3 mx-auto mt-2 block hover:bg-lime-600"
              >
                Submit
              </button>
            </ul>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignatureForm;
