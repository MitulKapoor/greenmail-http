import React, {Component} from 'react'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import Table from 'react-bootstrap/Table'

import {ListUsersUrl} from '../c/GmhUrl'
import ListUserRow from './ListUserRow'
import PageHeader from '../m/PageHeader'

class ListUserPage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			data: [],
			error: false
		}
		this.reload = this.reload.bind(this)
	}

	reload() {
		let url = ListUsersUrl()
		axios.get(url)
			.then(res => {
				for (let i = 0 ; i < res.data.length ; ++i) {
					res.data[i].id = '' + i
				}
				this.setState({
					data: res.data
				})
			}, (error) => {
				this.setState({
					data: error,
					url: url,
					error: true
				})
			})
	}

	componentDidMount() {
		this.reload()
	}

	render() {

		if (this.state.error) {
			let eMessage = this.state.data.toString() + " " +this.state.url
			return <Alert variant="danger" dismissible>{eMessage}</Alert>
		}

		return (
		<div>
		<PageHeader title="List Users"/>

		<div className="intro">Passwords are hidden by default, click the stars to reveal them.</div>

		<Table className="table">
			<tbody>
			<tr>
				<th>Actions</th>
				<th>Email</th>
				<th>Login</th>
				<th>Password</th>
				<th>Mailbox</th>
			</tr>
			{
				this.state.data.map(user => <ListUserRow key={user.id} user={user} reload={this.reload} />)
			}
			</tbody>
		</Table>
		</div>
		)
	}
}

export default ListUserPage
