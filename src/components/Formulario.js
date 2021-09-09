import React, {Fragment, useEffect, useState} from 'react'

const Formulario = () => {

	const ref = React.useRef();
	const [er, addEr] = useState(null);
	const [formulario, dataForm] = useState({
		nombre: '',
		country: ''
	})
	const [pais, dataPais] = useState([])

	const inputChanged = (e) => {
		ref.current.style.display = 'none'
		dataForm({
			...formulario,
			[e.target.name] : e.target.value
		})
	}
	useEffect(() => {
		fetch("http://localhost:3001/pais")
		  .then(res => res.json())
		  .then(
			(result) => {
				dataPais(result);
			},
			(error) => {
			  console.log(error);
			}
		  )
	  }, [])
	const guardarForm = async (e) => {
		e.preventDefault()
		if(!formulario.nombre.trim()){
			addEr("Ingresa tu nombre");
			ref.current.style.display = 'block'
			return;
		}
		if(!formulario.country.trim()){
			addEr("Selecciona un país");
			ref.current.style.display = 'block'
			return;
		}
		console.log('enviando datos...' + JSON.stringify(formulario))
		const save = await fetch(
			"http://localhost:3001/save",
			{
			  method: "POST",
			  body: JSON.stringify(formulario),
	
			  headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			  },
			}
		);
		const result = await save.json();
      	console.log(result);
		  window.location.reload(false);
	}

	return (
			<Fragment>
				<form className="row" onSubmit={guardarForm}>
					
						<div ref={node => ref.current = node} name="error" className="alert alert-danger oculto">
							{er}
						</div>
					
					<div className="col-md-4">
						<label htmlFor="input-name">Nombre Completo</label>
						<input name="nombre" type="text" id="input-name" placeholder="Escribi tu nombre aquí..." onChange={inputChanged}/>
					</div>
					<div className="col-md-4">
						<label htmlFor="select-country">Selecciona un país</label>
						<select name="country" id="select-country" onChange={inputChanged}>
							<option defaultValue>Selecciona un país...</option>
							{
								pais.map((data, key) => (
									<option value={data.idpais} key={key+1}>{data.nombre}</option>
								))
							}
						</select>
					</div>
					<div className="col-md-4">
						<button type="submit">Guardar</button>
					</div>
				</form>
			</Fragment>
		);
}

export default Formulario;