import { useState, useEffect } from "react";

function FormTransaccion() {
  

  const [formData, setFormData] = useState({
    id_cliente:"",
    id_agente:"",
    id_inmueble:"",
    precio_transaccion:"",
    tipo_transaccion:""
  });

  const [listaClientes, setListaClientes] = useState([])
  const [listaAgentes, setListaAgentes] = useState([])
  const [listaInmuebles, setListaInmuebles] = useState([])

  useEffect(()=>{
    clientes()
    agentes()
    inmuebles()
  }, []);

  const clientes = async () => {
    try {
      const clientes = await fetch('http://127.0.0.1:5000/clientes').then((response) =>
        response.json()
      );
      setListaClientes(clientes)
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  const agentes = async () => {
    try {
      const agentes = await fetch('http://127.0.0.1:5000/agentes').then((response) =>
        response.json()
      );
      setListaAgentes(agentes)
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  const inmuebles = async () => {
    try {
      const inmuebles = await fetch('http://127.0.0.1:5000/inmuebles').then((response) =>
        response.json()
      );
      setListaInmuebles(inmuebles)
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  const tiposTransaccion = [
    "Compra",
    "Venta",
    "Alquiler",
    "Remodelacion",
    "Construccion"
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
      const response = await fetch("http://127.0.0.1:5000/transacciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      });

      if (response.ok) {
        alert("Transaccion creado satisfactoriamente");
        setFormData({
          id_cliente:"",
          id_agente:"",
          id_inmueble:"",
          precio_transaccion:"",
          tipo_transaccion:""
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
          name="id_inmueble"
          value={formData.id_inmueble}
          onChange={handleChange}
          required
          className="mb-4 p-2 border rounded w-full"
        >
          <option value="">Seleccione el Inmueble</option>
          {listaInmuebles.map((inmueble, index) => (
            <option key={index} value={inmueble.id_inmueble}>
              {inmueble.id_inmueble} - {inmueble.tipo_inmueble} - {inmueble.direccion}
            </option>
          ))}
        </select>  
      <select
          name="id_cliente"
          value={formData.id_cliente}
          onChange={handleChange}
          required
          className="mb-4 p-2 border rounded w-full"
        >
          <option value="">Seleccione al Cliente</option>
          {listaClientes.map((cliente, index) => (
            <option key={index} value={cliente.id_cliente}>
              {cliente.nombre} {cliente.apellido}
            </option>
          ))}
        </select>
        <select
          name="id_agente"
          value={formData.id_agente}
          onChange={handleChange}
          required
          className="mb-4 p-2 border rounded w-full"
        >
          <option value="">Seleccione al Agente</option>
          {listaAgentes.map((agente, index) => (
            <option key={index} value={agente.id_agente}>
              {agente.nombre} {agente.apellido}
            </option>
          ))}
        </select>
        
        <select
          name="tipo_transaccion"
          value={formData.tipo_transaccion}
          onChange={handleChange}
          required
          className="mb-4 p-2 border rounded w-full"
        >
          <option value="">Seleccione el Tipo de Transaccion</option>
          {tiposTransaccion.map((tipo_transaccion, index) => (
            <option key={index} value={tipo_transaccion}>
              {tipo_transaccion}
            </option>
          ))}
        </select>

        
        <input
          type="number"
          name="precio_transaccion"
          placeholder="Monto de la transaccion"
          value={formData.precio_transaccion}
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

export default FormTransaccion;
