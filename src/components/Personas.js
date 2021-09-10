import React, {Fragment, useEffect, useState} from 'react'

const Personas = () => {

    const [person, dataPerson] = useState([])

    useEffect(() => {
		fetch("http://localhost:3001/personas")
		  .then(res => res.json())
		  .then(
			(result) => {
				dataPerson(result);
			},
			(error) => {
			  console.log(error);
			}
		  )
	  }, [])

      function formatDate(date){
        var dateF = new Date(date);
        return dateF.toLocaleString();
      }

    return (
        <Fragment>
            <h4 className="text-center">Datos Almacenados</h4>
            <h6 className={person.length == 0 ? "text-center" : "oculto"}>No se han encontrado registros...</h6>
            <table className={person.length == 0 ? "table oculto" : "table"}>
                <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">País</th>
                    <th scope="col">Fecha</th>
                </tr>
                </thead>
                <tbody>
                {person.map((data, key) => (
                    <tr key={key}>
                        <td>{key + 1}</td>
                        <td>{data.nombre}</td>
                        <td>{data.pais}</td>
                        <td>{formatDate(data.created)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Fragment>
    )
}

export default Personas