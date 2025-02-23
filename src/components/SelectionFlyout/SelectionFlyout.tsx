import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { RootState } from '../../redux/store';
import { clearSelection } from '../../redux/slices/selectionSlice';
import styles from './SelectionFlyout.module.css';

const SelectionFlyout: FC = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selection.selectedItems
  );

  if (selectedItems.length === 0) return null;

  const handleUnselectAll = () => {
    dispatch(clearSelection());
  };

  const handleDownload = () => {
    const csv = Papa.unparse(selectedItems);
    const fileName = `${selectedItems.length}_people.csv`;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, fileName);
  };

  return (
    <div className={styles.flyout}>
      <p>
        {selectedItems.length}
        {selectedItems.length === 1 ? ' item is ' : ' items are '}
        selected
      </p>
      <button onClick={handleUnselectAll}>Unselect All</button>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default SelectionFlyout;
