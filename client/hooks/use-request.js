import axios from 'axios';
import { useState } from 'react';

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async (props = {}) => {
    try {
      setErrors(null);
      const response = await axios[method](url, { ...body, ...props });
      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      if (err && err.response.data.errors) {
        setErrors(
          <div className="alert alert-danger">
            <h4>Ooops....</h4>
            <ul className="my-0">
              {err.response.data.errors.map((err) => (
                <li key={err.message}>{err.message}</li>
              ))}
            </ul>
          </div>
        );
      } else {
        <div className="alert alert-danger">
          <h4>Ooops....</h4>
          <p>Something wrong..</p>
        </div>
      }

    }
  };

  return { doRequest, errors };
};

export default useRequest;
