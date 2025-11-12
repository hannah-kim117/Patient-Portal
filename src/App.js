
// imports
// import './App.css';
import { useEffect, useState} from "react";
import axios from "axios";

function App() {
  const [patients, setPatients] = useState([]);
  const [page, setPage] = useState(1);
  const patientsPerPage = 5;


  // fetch data on first render
  useEffect(() => {
    fetchPatients()
  }, []);

  // fetch data function
  const fetchPatients = async () => {
    try{
      const response = await axios.get("http://127.0.0.1:5000/patients");
      setPatients(response.data)
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching patients: ", error);
    }
  };

  // Pagination Logic
  const indexOfLastPatient = page * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = patients.slice(indexOfFirstPatient, indexOfLastPatient);

  // Handle Next / Prev buttons
  const nextPage = () => {
    if (page < Math.ceil(patients.length / patientsPerPage)) {
      setPage(page + 1);
    }
  };
  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="App" style={{textAlign: "center"}}>
      <header className="App-header">
        <h1>Patient List</h1>
      </header>

      <div style={{ marginTop: "50px"}}>
        <h3>Patients:</h3>
        
          <ul>
          {currentPatients.map((p, i) => (
            <li key={i}>{p.name} - {p.birthdate}</li>
          ))}
          </ul>
        

        <div style={{marginTop: "20px"}}>
          <button onClick={prevPage} disabled={page === 1} style={{marginRight: "10px"}}>
            Prev
          </button>
          <span style={{margin: "0 10px"}}>Page {page}</span>
          <button onClick={nextPage} disabled={page === Math.ceil(patients.length / patientsPerPage)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
