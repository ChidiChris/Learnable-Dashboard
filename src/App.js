// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import { useState } from "react";
import internsData from "./internsData";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedBy, setSortedBy] = useState(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortByGrade = () => {
    setSortedBy("grade");
  };

  const handleSortByName = () => {
    setSortedBy("name");
  };

  const filteredInterns = internsData.filter((intern) =>
    intern.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedInterns = sortedBy
    ? [...filteredInterns].sort((a, b) => {
        if (sortedBy === "grade") {
          return b.grade - a.grade;
        } else if (sortedBy === "name") {
          return a.name.localeCompare(b.name);
        }
        return 0;
      })
    : filteredInterns;

  return (
    <div className="intern-dashboard">
      <div className="header">
        <h2>Interns Overview</h2>
        <div className="actions">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button onClick={handleSortByGrade}>Sort by Grade</button>
          <button onClick={handleSortByName}>Sort by Name</button>
        </div>
      </div>
      {sortedInterns.map((intern) => (
        <div className="intern-card" key={intern.id}>
          <img src={intern.picture} alt={intern.name} />
          <div className="intern-info">
            <h3>{intern.name}</h3>
            <p>
              <strong>Program:</strong> {intern.program}
            </p>
            <p>
              <strong>Attandance:</strong> {intern.attandance}
            </p>
            <p>
              <strong>Overall Grade:</strong> {intern.grade}%
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;