import React, {
	Component
} from 'react'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'

import {AllImapUrl} from '../c/HgmUrl'
import MessagesTable from './MessagesTable'

class ListAllMesssagePage extends Component {

	constructor(props) {
		super(props)
		this.url = AllImapUrl()
		this.state = {
			data: [],
			error: false
		}
		this.reload = this.reload.bind(this)
	}

	reload() {
		axios.get(this.url)
			.then(res => {
				console.log(res)
				for (let i = 0 ; i < res.data.length ; ++i) {
					res.data[i].id = '' + i
				}
				this.setState({
					data: res.data
				})
			}, (error) => {
				this.setState({
					data: error,
					error: true
				})
			})
	}

	componentDidMount() {
		this.reload()
	}

	render() {

		if (this.state.error) {
			let eMessage = this.state.data.toString() + " " + this.state.url
			return <Alert variant="danger" dismissible>{eMessage}</Alert>
		}

		return (
			<Container>
			<h2>List All Messages</h2>
			<MessagesTable messages={this.state.data} reload={this.reload}/>
			</Container>
		)
	}
}

export default ListAllMesssagePage