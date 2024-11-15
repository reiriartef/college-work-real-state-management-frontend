import { useState } from "react";

function FormReporteTransaccion() {
  

  const [formData, setFormData] = useState({
    fecha_transaccion:""
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await fetch(`http://127.0.0.1:5000/reporte_transacciones?fecha_transaccion=${formData.fecha_transaccion}`);

      if (response.ok) {
        alert("Reporte generado satisfactoriamente");
        setFormData({
          fecha_transaccion:""
        });
        const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reporte_transacciones.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
      } else {
        alert("Error al enviar los datos");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Error al enviar los datos");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">
        Generar Reporte de Transacciones
      </h2>
      <form onSubmit={handleSubmit}>
        

        
        <input
          type="date"
          name="fecha_transaccion"
          placeholder="Fecha de las transacciones"
          value={formData.fecha_transaccion}
          onChange={handleChange}
          required
          className="mb-4 p-2 border rounded w-full"
        />
        

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          Generar Reporte
        </button>
      </form>
    </div>
  );
}

export default FormReporteTransaccion;
