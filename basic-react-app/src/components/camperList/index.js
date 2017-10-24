import React, {Component} from 'react'
import {Header, Menu, Container, Button} from 'semantic-ui-react'
import {Image, Table} from 'semantic-ui-react'


class CamperList extends Component {
    state = {campers: [], ascOrder: 1}

    async componentDidMount() {

        const promise = await fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent')

        const stuff = await promise.json()

        console.log(stuff)
        this.setState({campers: stuff})


    }

    handleHeaderClick = (sortBy) => {
        if (sortBy === this.state.sortBy) {
            this.setState({ascOrder: -1 * this.state.ascOrder})
        }
        else {
            this.setState({ascOrder: 1, sortBy})
        }
    }

    render() {
        const {campers, sortBy, ascOrder} = this.state
        return (<div>
                <Table basic='very' celled collapsing>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell
                                onClick={() => this.handleHeaderClick('username')}>Users</Table.HeaderCell>
                            <Table.HeaderCell onClick={() => this.handleHeaderClick('alltime')}>All
                                Time</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>

                        {campers.sort((camper1, camper2) => {
                            //return camper1.alltime - camper2.alltime
                            return ascOrder*(camper1[sortBy] > camper2[sortBy] ? -1 : 1)
                        }).map((camper) => {
                            return <Table.Row key={camper.username}>
                                <Table.Cell>
                                    <Header as='h4' image>
                                        <Image src={camper.img} shape='rounded' size='mini'/>
                                        <Header.Content>
                                            {camper.username}
                                            <Header.Subheader>{camper.alltime}</Header.Subheader>
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell>
                                    {camper.recent}
                                </Table.Cell>
                                <Table.Cell>
                                    {camper.lastUpdate}
                                </Table.Cell>
                            </Table.Row>
                        })}
                    </Table.Body>
                </Table>
            </div>
        )
    }
}

export default CamperList