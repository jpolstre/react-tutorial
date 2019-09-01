import React, {Component} from 'react'


const TableHeader = ()=>{

	// render
	return(
		<thead>
			<tr>
				<th>Avatar</th>
				<th>Name</th>
				<th>Email</th>
				<th>Options</th>
			</tr>
		</thead>
	)
}

const TableBody = (props)=>{

	// iteramos en personasData(props contiene todas las propiedades del componente).
	const rows = props.data.map((row, index)=>{
		return(// en onClick, onMauserOver, etc se ejecuta la funcion (propiedad). 
			<tr key={index}>
				<td><img height="48" src={row.img} alt={row.name} className="avatar"/></td>
				<td>{row.name}</td>
				<td>{row.email}</td>
				
				<td><button className="button button-primary" onClick={()=>props.onDelete(row)}>Delete</button></td>
			</tr>
		)
	})

	// render
	return <tbody>{rows}</tbody>
}


// el componente padre tiene render()

class Table extends Component{
	render(){
		// (props contiene todas las propiedades del componente).
		// asi se obtiene un atributo de un objeto  ES6(en una constante).
		const { data, onDelete } = this.props// this.props = {personasData:{..}, otraProp:val, ..}
		return(
			<table>
				<TableHeader/>
				<TableBody data={data} onDelete={onDelete} />
			</table>
		)
	}
}

export default Table