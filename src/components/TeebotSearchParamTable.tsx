import { TeebotSearchParam } from "./TeebotTeeTimeSelector";
import './teebotsearchparamtable.css';

interface TeebotSearchParamTableProps {
    searchParams: TeebotSearchParam[];
    handleDelete: (index: number) => void;
}

export const TeebotSearchParamTable: React.FC<TeebotSearchParamTableProps> = ({ searchParams, handleDelete }) => {
    return (
      <div>
        <table className="styled-table">
          <thead>
            <tr>
              <th>Course</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {searchParams.map((row, index) => (
              <tr key={index}>
                <td>{row.teebotCourse}</td>
                <td>{row.teebotDate}</td>
                <td>{row.teebotStartTime}</td>
                <td>{row.teebotEndTime}</td>
                <td>
                  <button onClick={() => { handleDelete(index) }}>X</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
  
export default TeebotSearchParamTable;