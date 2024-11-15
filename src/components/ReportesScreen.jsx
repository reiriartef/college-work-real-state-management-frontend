import { useState } from "react";
import FormReporteTransaccion from "./FormReporteTransaccion";

const ReportesScreen = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionClick = async (option) => {
    setSelectedOption(option);
  };



  return (
    <div className="p-6">
      <nav className="bg-gray-200 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-center space-x-4">
          {["Reportes de Transacciones por mes"].map((option) => (
            <button
              key={option}
              onClick={() => handleOptionClick(option)}
              className={`px-4 py-2 rounded-lg ${
                selectedOption === option
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-300"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </nav>

      <div>
        {selectedOption === "Reportes de Transacciones por mes" ? (
          <div className="bg-white p-4 shadow rounded-lg">
            <FormReporteTransaccion/>
          </div>
        ) : <div className="bg-white p-4 shadow rounded-lg">
          <h1>Seleccione una opcion de reporte</h1>
      </div>}
        
      </div>
    </div>
  );
};

export default ReportesScreen;
