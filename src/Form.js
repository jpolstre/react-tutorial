// simpre se importa React.
import React, {Component} from 'react'


// una clase siempre tiene this.props y this.state aunque no se definan explicitamente
//los que pueden ser invocados des de cualquier metodo de dicha clase.
class Form extends Component{
	/*se recibe el props del padre, esta parte del constructor es tambien equivalente al data(){} en Vuejs*/
	constructor(props){
		super(props)
		this.initialState = {
			// accesoa la carpeta public.
			img:process.env.PUBLIC_URL +'/logo192.png',
			name:'',
			email:''
		}
		this.state = this.initialState
	}

	handleChange = event => {
	  const { name, value } = event.target

	  this.setState({
	    [name]: value,//this.state[name]
	  })
	}

	handleSubmit = (e)=>{
		e.preventDefault()
		if(this.state.name!=='' && this.state.email !== ''){
			const item = {name:this.state.name, email:this.state.email, img:this.state.img}
			this.props.submit(item)
			this.setState(this.initialState)	
			document.getElementById('name').focus()
		}else{
			alert('All fields required')
		}
		
	}

	// esto basicamente es el "template en VueJS".
	render(){
		// ok pero es mas entendible usando this
		// const {submit} = this.props
		// const {name, job} = this.state

		// const {name, job} = this.state
		// se pasa el valor de los inputs como un obj a la funcion que se [asa como propiedad de Form, esta agrgara dicho obj a a la dataPersonas de App(comp padre)
		
		// console.log(item)

		// name="job" value={this.state.job} onChange={ this.handleChange } es igual a v-model="job" en vueJs
		return(
			<form onSubmit={ this.handleSubmit }>
				<label>Name</label>
				<input type="text" id="name" placeholder="Name" name="name" value={this.state.name} onChange={ this.handleChange }/>
				<label>Email</label>
				<input type="email" placeholder="email" name="email" value={this.state.email} onChange={ this.handleChange }/>
				<button type="submit" className="button button-primary">Submit</button>
			</form>
		)
	}
}

export default Form