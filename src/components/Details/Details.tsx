import { useEffect, useState } from 'react';
import { PersonDetails } from '../../types/types';
import styles from './Details.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../Loader';

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState<PersonDetails | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    fetchDetails(String(id));
  }, [id]);

  const fetchDetails = async (id: string) => {
    setLoading(true);

    try {
      const response = await fetch(`https://swapi.dev/api/people/${id}`);
      const details = await response.json();
      setPerson(details);
    } catch (error) {
      console.error('Error fetching details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDetails = () => {
    navigate('/');
  };

  return (
    <div className={styles.wrapper}>
      <button onClick={handleCloseDetails}>Close</button>
      {isLoading ? (
        <Loader />
      ) : (
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
      )}
    </div>
  );
};

export default Details;
