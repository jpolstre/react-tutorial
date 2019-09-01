import React, { Component } from 'react'
import Table from './Table'
import Form from './Form'

class App extends Component{
	/*propiedades*/

	state = {
		filterData:[],
		allData:[],
		search:'',
	}

	componentDidMount(){
		const url = 'https://randomuser.me/api/?results=500'
		fetch(url)
		.then(data=>data.json())
		.then(data=>{
			// this.setState({
			// 	filterData:data.results
			// })
			// console.log(data)
			let dataPersons = []
			for(let item of data.results){
				dataPersons.push({name:item.name.first, email:item.email, img:item.picture.thumbnail})
			}
			this.setState({
				allData:dataPersons,
				// filterData:dataPersons
			})
		})

	}

	/*filter*/
	getFilterData = ()=>{
		const termFilter = this.state.search.trim().toUpperCase()
		const allData = this.state.allData
		if(termFilter){
			return allData.filter(p=>{
				return Object.keys(p).some(key=>{
					return String(p[key]).toUpperCase().indexOf(termFilter) > -1
				})
				// return p.name.toUpperCase().indexOf(termFilter) !== -1
			})
		}

		return allData
	}

	removeItem = (item)=>{
		this.setState({
			allData:this.state.allData.filter(p=>{
				return p.email !== item.email
			})
		})
		/*cada vez que se modifica allData debe modificarse filterData*/
	}

	submit = (item)=>{
		this.setState({
			allData:[item].concat(this.state.allData),//para hacer this.state.filter "inmutable"(no debe cambiar, por lo menos directamente)
		})
		/*cada vez que se modifica allData debe modificarse filterData*/
	}

	handleChange = (event)=>{
		const { value } = event.target
		this.setState({
			search:value
		})
		/*cada vez que se modifica allData debe modificarse filterData*/
	}


	/*metodos*/

		// o si tamien como metodo.
	/*	removePersona(index){
			console.log(this.state)
			// no modificamos el original(se podria implementar volver en el tiempo history).
			const { filter } = this.state
			
			
			// filter.splice(index, 1) 	
		this.setState({
				filterData: filter.filter((character, i) => {
					return i !== index
				}),
			})

		}
			<Table filterData={this.state.filter} onDelete={(i)=>this.removePersona(i)} />*/

	render(){

		// esto es equivalente a computed en Vuejs. La ventaja es que no se necesita un array tempora en ReactJs
		const data =  this.getFilterData()

		return(//asi se pasa un metodo como propiedad de un componenete	
			<div className="container">
				<div className="flex-row">
					<div className="flex-small">
						<h3>Add New</h3>
						<Form submit={this.submit}/>
					</div>
					<div className="flex-large">
						<label>Filter</label>
						<input type="text" name="search" value={this.search} onChange={this.handleChange}/>	
						<Table data={data} onDelete={this.removeItem} />
					</div>
				</div>
			</div>		
		)
	}

}

export default App