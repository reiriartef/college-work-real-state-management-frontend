import { useState, useEffect } from "react";

function FormPago() {
  

  const [formData, setFormData] = useState({
    monto:"",
    metodo_pago:"",
    id_transaccion:""
  });

const [transaccion, setTransaccion] = useState([])

  useEffect(()=>{
    transacciones()
  }, []);

const transacciones = async () =>{
  try {
    const transacciones = await fetch('http://127.0.0.1:5000/transacciones').then((response) =>
      response.json()
    );
    setTransaccion(transacciones)
  } catch (error) {
    console.log(error);
    return [];
  }
}

  const metodosDePago = [
    "Efectivo",
    "Pago Movil",
    "Transferencia Bancaria",
    "Binance",
    "Zelle"
  ]

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSubmit = {
      ...formData,
    };
    console.log(dataToSubmit)

    try {
      const response = await fetch("http://127.0.0.1:5000/pagos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      });

      if (response.ok) {
        alert("Transaccion creado satisfactoriamente");
        setFormData({
          monto:"",
          metodo_pago:"",
          id_transaccion:""
        });
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
        Generar Transaccion
      </h2>
      <form onSubmit={handleSubmit}>
        
        <select
          name="metodo_pago"
          value={formData.metodo_pago}
          onChange={handleChange}
          required
          className="mb-4 p-2 border rounded w-full"
        >
          <option value="">Seleccione el Metodo de Pago</option>
          {metodosDePago.map((metodo_pago, index) => (
            <option key={index} value={metodo_pago}>
              {metodo_pago}
            </option>
          ))}
        </select>

        <select
          name="id_transaccion"
          value={formData.id_transaccion}
          onChange={handleChange}
          required
          className="mb-4 p-2 border rounded w-full"
        >
          <option value="">Seleccione el ID de la Transaccion</option>
          {transaccion.map((transaccion, index) => (
            <option key={index} value={transaccion.id_transaccion}>
              {transaccion.id_transaccion}
            </option>
          ))}
        </select>

        
        <input
          type="number"
          name="monto"
          placeholder="Monto"
          value={formData.monto}
          onChange={handleChange}
          required
          className="mb-4 p-2 border rounded w-full"
        />
        

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          Registrar
        </button>
      </form>
    </div>
  );
}

export default FormPago;
