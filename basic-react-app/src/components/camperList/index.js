import React, {  Component } from 'react'
import { Header, Menu, Container, Button } from 'semantic-ui-react'
import { Image, Table } from 'semantic-ui-react'


class CamperList extends Component {
   state = { campers: []}
   async componentDidMount() {

    const promise = await fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent')

      const stuff = await promise.json()

      console.log(stuff)
      this.setState({campers: stuff })


  }
  render () {
    const {campers} = this.state
    return (<div>
        <Table basic='very' celled collapsing>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Users</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>

            { campers.sort( (camper1, camper2) => {
               //return camper1.alltime - camper2.alltime
              return new Date(camper1.lastUpdate) > new Date(camper2.lastUpdate) ? -1 : 1
            }).reverse().map((camper) => {
            return <Table.Row key={camper.id}>
              <Table.Cell>
                <Header as='h4' image>
                  <Image src={camper.img} shape='rounded' size='mini' />
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