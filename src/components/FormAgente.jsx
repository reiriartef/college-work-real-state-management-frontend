import { useState } from "react";

function FormAgente() {
  

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono:"",
    email:"",
    especializacion:""
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

    const dataToSubmit = {
      ...formData,
    };
    console.log(dataToSubmit)

    try {
      const response = await fetch("http://127.0.0.1:5000/agentes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      });

      if (response.ok) {
        alert("Agente creado satisfactoriamente");
        setFormData({
            nombre: "",
            apellido: "",
            telefono:"",
            email:"",
            especializacion:""
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
        Registro de Agente
      </h2>
      <form onSubmit={handleSubmit}>
        

        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          className="mb-4 p-2 border rounded w-full"
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
          className="mb-4 p-2 border rounded w-full"
        />
        <input
          type="text"
          name="telefono"
          placeholder="Telefono"
          value={formData.telefono}
          onChange={handleChange}
          required
          className="mb-4 p-2 border rounded w-full"
        />
        <input
          type="text"
          name="email"
          placeholder="Correo Electronico"
          value={formData.email}
          onChange={handleChange}
          required
          className="mb-4 p-2 border rounded w-full"
        />
        <input
          type="text"
          name="especializacion"
          placeholder="Especializacion"
          value={formData.especializacion}
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

export default FormAgente;
