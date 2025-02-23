import styles from './Details.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../Loader';
import { useGetPersonQuery } from '../../redux/api';

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: person, isLoading } = useGetPersonQuery(String(id));

  const handleCloseDetails = () => {
    navigate('/');
  };

  return (
    <div className={styles.wrapper}>
      <button onClick={handleCloseDetails}>Close</button>
      {isLoading ? (
        <Loader />
      ) : (
        person && (
          <div>
            <h4>{person?.name}</h4>
            <div>
              gender:
              <strong>{person?.gender}</strong>
            </div>
            <div>
              birth year:
              <strong>{person?.birth_year}</strong>
            </div>
            <div>
              height:
              <strong>{person?.height}</strong>
            </div>
            <div>
              weight:
              <strong>{person?.mass}</strong>
            </div>
            <div>
              eye color:
              <strong>{person?.eye_color}</strong>
            </div>
            <div>
              hair color:
              <strong>{person?.hair_color}</strong>
            </div>
            <div>
              skin color:
              <strong>{person?.skin_color}</strong>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Details;
